let tpl='minimal',items=[{name:'',serial:'',qty:1,price:0}],dark=false,lang='en';

function T(k){return L[lang][k]||L.en[k]}
function C(){return CURR[document.getElementById('currSel').value]||CURR.INR}
function fm(n){return C().s+Number(n).toLocaleString('en-IN',{minimumFractionDigits:0,maximumFractionDigits:2})}
function fd(d){if(!d)return'—';return new Date(d+'T00:00:00').toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}

function applyLang(){
  lang=document.getElementById('langSel').value;
  document.querySelectorAll('[data-en]').forEach(el=>{
    const txt=el.getAttribute('data-'+lang)||el.getAttribute('data-en');
    if(!['INPUT','SELECT','TEXTAREA'].includes(el.tagName))el.textContent=txt;
  });
  document.getElementById('addBtn').textContent=T('addItem');
  document.getElementById('btnSave').textContent=T('save');
  document.getElementById('btnDL').textContent=T('dl');
  renderItems();updatePreview();
}

function toggleTheme(){
  dark=!dark;
  document.body.className=dark?'dark':'light';
  document.getElementById('themeBtn').textContent=dark?'Light':'Dark';
  renderItems();
}

function setTpl(name,btn){
  tpl=name;
  document.querySelectorAll('.tpl-btn').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');
  updatePreview();
}

function showTab(tab,el){
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('on'));
  document.querySelectorAll('.pane').forEach(p=>p.classList.remove('on'));
  el.classList.add('on');
  document.getElementById('pane-'+tab).classList.add('on');
  if(tab==='saved')renderSaved();
}

function addItem(){items.push({name:'',serial:'',qty:1,price:0});renderItems();}
function removeItem(i){if(items.length>1){items.splice(i,1);renderItems();}}

function renderItems(){
  const tb=document.getElementById('iBody');
  tb.innerHTML='';
  const bg=dark?'#0F1220':'#F8F9FE';
  const bd=dark?'#1A1F35':'#E2E5F0';
  const col=dark?'#D4D8F0':'#1C1E2E';
  const s=`width:100%;padding:6px 8px;border-radius:7px;font-family:Inter,sans-serif;font-size:12px;outline:none;background:${bg};border:1px solid ${bd};color:${col}`;
  items.forEach((it,i)=>{
    const tr=document.createElement('tr');
    tr.innerHTML=`<td><input value="${it.name}" placeholder="${T('desc')}" oninput="items[${i}].name=this.value;updatePreview()" style="${s}"/></td><td><input value="${it.serial||''}" placeholder="IMEI / SN" oninput="items[${i}].serial=this.value;updatePreview()" style="${s}"/></td><td><input type="number" value="${it.qty}" min="1" oninput="items[${i}].qty=+this.value;updatePreview()" style="${s}"/></td><td><input type="number" value="${it.price}" min="0" placeholder="0" oninput="items[${i}].price=+this.value;updatePreview()" style="${s}"/></td><td><button class="rm-btn" onclick="removeItem(${i})">✕</button></td>`;
    tb.appendChild(tr);
  });
  updatePreview();
}

function calcW(){
  const d=document.getElementById('invDate').value;
  const m=parseInt(document.getElementById('warM').value)||0;
  const pill=document.getElementById('wPill');
  if(d&&m>0){
    const e=new Date(d+'T00:00:00');e.setMonth(e.getMonth()+m);
    document.getElementById('wExp').textContent=e.toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'});
    pill.style.display='block';
  } else pill.style.display='none';
  updatePreview();
}

function getForm(){
  return{
    invNo:document.getElementById('invNo').value||'INV-001',
    invDate:document.getElementById('invDate').value,
    dueDate:document.getElementById('dueDate').value,
    pay:document.getElementById('payM').value,
    cat:document.getElementById('cat').value,
    sellerName:document.getElementById('sellerName').value||'Your Business',
    sellerContact:document.getElementById('sellerContact').value,
    sellerGST:document.getElementById('sellerGST').value,
    custName:document.getElementById('custName').value||'Customer',
    custContact:document.getElementById('custContact').value,
    custAddr:document.getElementById('custAddr').value,
    taxP:parseFloat(document.getElementById('taxP').value)||0,
    discP:parseFloat(document.getElementById('discP').value)||0,
    notes:document.getElementById('notes').value,
    signature:document.getElementById('signature').value,
    warM:parseInt(document.getElementById('warM').value)||0,
    wExp:document.getElementById('wExp').textContent||''
  };
}

function totals(tp,dp){
  const sub=items.reduce((s,it)=>s+(it.qty*it.price),0);
  const disc=sub*(dp/100);
  const tax=(sub-disc)*(tp/100);
  return{sub,disc,tax,grand:sub-disc+tax};
}

function updatePreview(){
  const d=getForm();
  const tp=TPLS[tpl];
  const t=totals(d.taxP,d.discP);
  const curr=document.getElementById('currSel').value;

  document.getElementById('sS').textContent=t.sub>0?fm(t.sub):'—';
  document.getElementById('sT').textContent=t.tax>0?fm(t.tax):'—';
  document.getElementById('sG').textContent=t.grand>0?fm(t.grand):'—';

  const payC={UPI:'#7C3AED',Card:'#1D4ED8',Cash:'#065F46','Bank Transfer':'#92400E',Cheque:'#B91C1C'}[d.pay]||'#7C3AED';
  const wNote=d.warM>0&&d.wExp?`\nWarranty valid until: ${d.wExp}`:'';
  const fullNotes=(d.notes||'')+wNote;

  const rows=items.filter(it=>it.name||it.price>0).map(it=>`
    <div style="display:grid;grid-template-columns:3fr 0.6fr 1fr 1fr;gap:6px;padding:9px 0;border-bottom:1px solid ${tp.rb};font-size:12px;align-items:start">
      <div>
        <div style="font-weight:700;color:${tp.tc}">${it.name||'—'}</div>
        ${it.serial?`<div style="font-size:10px;color:${tp.sub};margin-top:1px">${it.serial}</div>`:''}
      </div>
      <div style="color:${tp.sub}">${it.qty}</div>
      <div style="color:${tp.sub}">${fm(it.price)}</div>
      <div style="font-weight:700;color:${tp.tc}">${fm(it.qty*it.price)}</div>
    </div>`).join('');

  document.getElementById('inv').innerHTML=`
  <div style="background:${tp.pb};font-family:Inter,sans-serif">
    <div style="padding:26px 26px 18px">
      <div style="font-size:18px;font-weight:900;color:${tp.tc};letter-spacing:-0.3px;margin-bottom:2px">${d.sellerName}</div>
      <div style="font-size:11px;color:${tp.sub};margin-bottom:16px">${d.cat}${d.sellerContact?' · '+d.sellerContact:''}${d.sellerGST?' · GST: '+d.sellerGST:''}</div>
      <div style="display:flex;justify-content:space-between;align-items:flex-start">
        <div style="font-size:26px;font-weight:900;color:${tp.a};letter-spacing:-1px">${d.invNo}</div>
        <div style="text-align:right;font-size:11px;color:${tp.sub};line-height:1.9">
          <div>Date: <strong style="color:${tp.tc}">${fd(d.invDate)}</strong></div>
          <div>Due: <strong style="color:${tp.tc}">${fd(d.dueDate)}</strong></div>
          <div style="margin-top:3px"><span style="display:inline-block;font-size:9px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:3px 8px;border-radius:4px;background:${payC}15;color:${payC}">${d.pay}</span></div>
        </div>
      </div>
    </div>
    <div style="height:3px;background:linear-gradient(to right,${tp.g1},${tp.g2})"></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:18px 26px;border-bottom:1px solid ${tp.bd}">
      <div>
        <div style="font-size:9px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${tp.sub};margin-bottom:4px">${T('from')}</div>
        <div style="font-size:13px;font-weight:700;color:${tp.tc}">${d.sellerName}</div>
        ${d.sellerContact?`<div style="font-size:11px;color:${tp.sub};margin-top:2px">${d.sellerContact}</div>`:''}
      </div>
      <div>
        <div style="font-size:9px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${tp.sub};margin-bottom:4px">${T('to')}</div>
        <div style="font-size:13px;font-weight:700;color:${tp.tc}">${d.custName}</div>
        ${d.custContact?`<div style="font-size:11px;color:${tp.sub};margin-top:2px">${d.custContact}</div>`:''}
        ${d.custAddr?`<div style="font-size:11px;color:${tp.sub};margin-top:1px">${d.custAddr}</div>`:''}
      </div>
    </div>
    <div style="padding:18px 26px">
      <div style="display:grid;grid-template-columns:3fr 0.6fr 1fr 1fr;gap:6px;font-size:9px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:${tp.sub};padding-bottom:8px;border-bottom:1px solid ${tp.bd}">
        <div>${T('desc')}</div><div>${T('qty')}</div><div>${T('unit')}</div><div>${T('amt')}</div>
      </div>
      ${rows||`<div style="color:${tp.sub};padding:14px 0;font-size:12px">${lang==='hi'?'Koi item nahi hai abhi':'No items added yet'}</div>`}
    </div>
    <div style="padding:4px 26px 26px">
      <div style="display:flex;justify-content:space-between;font-size:12px;color:${tp.sub};margin-bottom:5px"><span>${T('subtotal')}</span><span>${fm(t.sub)}</span></div>
      ${d.discP>0?`<div style="display:flex;justify-content:space-between;font-size:12px;color:#E24B4A;margin-bottom:5px"><span>${T('disc')} (${d.discP}%)</span><span>-${fm(t.disc)}</span></div>`:''}
      ${d.taxP>0?`<div style="display:flex;justify-content:space-between;font-size:12px;color:${tp.sub};margin-bottom:5px"><span>${T('tax')} (${d.taxP}%)</span><span>+${fm(t.tax)}</span></div>`:''}
      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px;padding:14px 16px;border-radius:10px;background:${tp.ab}">
        <div>
          <div style="font-size:13px;font-weight:700;color:${tp.tc}">${T('grand')}</div>
          <div style="font-size:10px;color:${tp.sub};margin-top:2px">${curr}</div>
        </div>
        <div style="font-size:22px;font-weight:900;letter-spacing:-0.5px;color:${tp.a}">${fm(t.grand)}</div>
      </div>
    </div>
    ${fullNotes||d.signature?`
    <div style="padding:18px 26px;border-top:1px solid ${tp.bd};display:flex;justify-content:space-between;align-items:flex-end;gap:20px">
      <div style="flex:1">
        ${fullNotes?`<div style="font-size:9px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:${tp.sub};margin-bottom:5px">${T('notes')}</div><div style="font-size:11px;color:${tp.sub};line-height:1.75">${fullNotes.replace(/\n/g,'<br>')}</div>`:''}
      </div>
      ${d.signature?`
      <div style="text-align:right;min-width:140px">
        <div style="height:40px;border-bottom:1px solid ${tp.bd};margin-bottom:8px"></div>
        <div style="font-size:10px;font-weight:700;color:${tp.tc}">${d.signature}</div>
        <div style="font-size:9px;color:${tp.sub};margin-top:2px">${T('signature')}</div>
      </div>`:''}
    </div>`:''}
    <div style="padding:11px 26px;background:${tp.fb};font-size:10px;text-align:center;letter-spacing:0.5px;color:${tp.sub}"></div>
  </div>`;
}

function qf(type){
  const today=new Date().toISOString().split('T')[0];
  const due=new Date();due.setDate(due.getDate()+30);
  const f=QFD[type];
  document.getElementById('invDate').value=today;
  document.getElementById('dueDate').value=due.toISOString().split('T')[0];
  document.getElementById('sellerName').value=f.seller;
  document.getElementById('cat').value=f.cat;
  document.getElementById('notes').value=f.notes;
  items=[{...f.item}];
  renderItems();calcW();updatePreview();
  toast(lang==='hi'?'Auto-fill ho gaya':'Quick fill applied');
}

function getSaved(){try{return JSON.parse(localStorage.getItem('ic3_saved'))||[];}catch{return[];}}

function saveInv(){
  const d=getForm();const t=totals(d.taxP,d.discP);
  const all=getSaved();
  all.unshift({id:'inv_'+Date.now(),data:d,items:[...items],grand:t.grand,curr:document.getElementById('currSel').value,tpl,savedAt:new Date().toISOString()});
  if(all.length>25)all.pop();
  localStorage.setItem('ic3_saved',JSON.stringify(all));
  toast(lang==='hi'?'Invoice save ho gayi':'Invoice saved');
}

function renderSaved(){
  const all=getSaved();
  const el=document.getElementById('savedList');
  if(!all.length){
    el.innerHTML=`<div style="color:${dark?'#2E3555':'#B0B6D0'};font-size:13px;text-align:center;padding:40px 20px;font-weight:500">${T('noSaved')}</div>`;
    return;
  }
  el.innerHTML=all.map((inv,i)=>`
    <div class="saved-card" onclick="loadInv(${i})">
      <div>
        <div class="sc-name">${inv.data.invNo} · ${inv.data.sellerName}</div>
        <div class="sc-meta">${inv.data.custName} · ${new Date(inv.savedAt).toLocaleDateString('en-IN')} · <span style="color:${dark?'#818CF8':'#4F46E5'};font-weight:700">${CURR[inv.curr]?.s||'₹'}${Number(inv.grand).toLocaleString()}</span></div>
      </div>
      <div style="display:flex;gap:5px" onclick="event.stopPropagation()">
        <button class="icon-action" onclick="loadInv(${i})">Load</button>
        <button class="icon-action" onclick="delSaved(${i})">Delete</button>
      </div>
    </div>`).join('');
}

function loadInv(i){
  const inv=getSaved()[i];if(!inv)return;
  const d=inv.data;
  ['invNo','invDate','dueDate','sellerName','sellerContact','sellerGST','custName','custContact','custAddr','notes','signature'].forEach(k=>{const el=document.getElementById(k);if(el)el.value=d[k]||'';});
  document.getElementById('payM').value=d.pay;
  document.getElementById('cat').value=d.cat||d.category||'Laptop / MacBook';
  document.getElementById('taxP').value=d.taxP;
  document.getElementById('discP').value=d.discP;
  document.getElementById('warM').value=d.warM||12;
  document.getElementById('currSel').value=inv.curr||'INR';
  items=inv.items?[...inv.items]:[{name:'',serial:'',qty:1,price:0}];
  tpl=inv.tpl||'minimal';
  document.querySelectorAll('.tpl-btn').forEach((b,idx)=>{b.classList.remove('on');if(['minimal','apple','business','dark'][idx]===tpl)b.classList.add('on');});
  renderItems();calcW();updatePreview();
  showTab('form',document.querySelectorAll('.tab')[0]);
  toast(lang==='hi'?'Invoice load ho gayi':'Invoice loaded');
}

function delSaved(i){const all=getSaved();all.splice(i,1);localStorage.setItem('ic3_saved',JSON.stringify(all));renderSaved();}

function dupeInv(){
  const cur=document.getElementById('invNo').value;
  document.getElementById('invNo').value=cur.replace(/\d+$/,n=>String(parseInt(n)+1).padStart(n.length,'0'));
  updatePreview();
  toast(lang==='hi'?'Invoice duplicate ho gayi — number update hua':'Duplicated — invoice number updated');
}

function clearForm(){
  ['sellerName','sellerContact','sellerGST','custName','custContact','custAddr','notes','signature'].forEach(k=>document.getElementById(k).value='');
  document.getElementById('invNo').value='INV-2024-001';
  document.getElementById('taxP').value=18;
  document.getElementById('discP').value=0;
  document.getElementById('warM').value=12;
  items=[{name:'',serial:'',qty:1,price:0}];
  renderItems();updatePreview();
  toast(lang==='hi'?'Form saaf ho gaya':'Form cleared');
}

function printInv(){
  const content = document.getElementById('inv').innerHTML;
  const win = window.open('', '_blank');
  win.document.write(`
    <html>
      <head>
        <title>Print Invoice - ${document.getElementById('invNo').value}</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
        <style>
          @page { size: A4; margin: 0; }
          body { 
            margin: 0; 
            padding: 0; 
            font-family: 'Inter', sans-serif; 
            -webkit-print-color-adjust: exact; 
            print-color-adjust: exact;
          }
          .print-wrap {
            width: 210mm;
            min-height: 297mm;
            margin: 0 auto;
            background: white;
          }
          /* Ensure all nested elements render correctly */
          * { box-sizing: border-box; }
        </style>
      </head>
      <body>
        <div class="print-wrap">${content}</div>
        <script>
          window.onload = () => {
            window.print();
            window.onafterprint = () => window.close();
          };
        </script>
      </body>
    </html>
  `);
  win.document.close();
}

async function shareApp(){
  const shareData = {
    title: T('shareTitle'),
    text: T('shareText'),
    url: window.location.href
  };
  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast(lang==='hi'?'Link copy ho gaya!':'Link copied to clipboard!');
    }
  } catch (err) {
    console.error('Error sharing:', err);
  }
}

async function dlPDF(){
  const btn=document.getElementById('btnDL');
  const orig=btn.textContent;
  btn.textContent=lang==='hi'?'Bana raha hoon...':'Generating...';
  btn.disabled=true;
  try{
    const el=document.getElementById('inv');
    // Using scale 3 for ultra-high quality PDF
    const canvas=await html2canvas(el,{scale:3,backgroundColor:null,useCORS:true,logging:false});
    const{jsPDF}=window.jspdf;
    const pdf=new jsPDF({orientation:'portrait',unit:'mm',format:'a4'});
    const pw=pdf.internal.pageSize.getWidth();
    pdf.addImage(canvas.toDataURL('image/png'),'PNG',0,0,pw,(canvas.height*pw)/canvas.width);
    const d=getForm();
    pdf.save(`${d.invNo}-${d.sellerName}.pdf`);
    toast(lang==='hi'?'PDF download ho gayi':'PDF downloaded');
  }catch(e){toast('PDF generation failed. Please try again.');}
  btn.textContent=orig;btn.disabled=false;
}

function toast(msg){
  const el=document.getElementById('toast');
  el.textContent=msg;
  el.style.background=dark?'#1A1F35':'#fff';
  el.style.color=dark?'#D4D8F0':'#1C1E2E';
  el.style.border=dark?'1px solid #252D4A':'1px solid #E2E5F0';
  el.style.opacity='1';
  clearTimeout(el._t);el._t=setTimeout(()=>el.style.opacity='0',2400);
}

function init(){
  document.body.className='light';
  document.getElementById('themeBtn').textContent='Dark';
  const today=new Date().toISOString().split('T')[0];
  const due=new Date();due.setDate(due.getDate()+30);
  document.getElementById('invDate').value=today;
  document.getElementById('dueDate').value=due.toISOString().split('T')[0];
  renderItems();updatePreview();
}
init();
