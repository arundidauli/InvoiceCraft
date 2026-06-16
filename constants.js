const CURR={INR:{s:'₹'},USD:{s:'$'},EUR:{s:'€'},GBP:{s:'£'}};
const TPLS={
  minimal:{a:'#4F46E5',ab:'rgba(79,70,229,0.07)',at:'#3730A3',g1:'#4F46E5',g2:'#818CF8',pb:'#ffffff',tc:'#111827',sub:'#6B7280',bd:'#F3F4F6',rb:'#F9FAFB',fb:'#F9FAFB',dk:false},
  apple:{a:'#111827',ab:'#F5F5F7',at:'#111827',g1:'#111827',g2:'#555',pb:'#ffffff',tc:'#111827',sub:'#6B7280',bd:'#E5E7EB',rb:'#F9FAFB',fb:'#F5F5F7',dk:false},
  business:{a:'#1E40AF',ab:'#EFF6FF',at:'#1E3A8A',g1:'#1D4ED8',g2:'#3B82F6',pb:'#ffffff',tc:'#1E3A8A',sub:'#6B7280',bd:'#DBEAFE',rb:'#F0F7FF',fb:'#EFF6FF',dk:false},
  dark:{a:'#818CF8',ab:'rgba(99,102,241,0.12)',at:'#A5B4FC',g1:'#4F46E5',g2:'#818CF8',pb:'#141929',tc:'#E8EAFF',sub:'#6B7499',bd:'rgba(255,255,255,0.06)',rb:'rgba(255,255,255,0.03)',fb:'#0C0F1A',dk:true}
};
const QFD={
  macbook:{seller:'Apple Authorized Reseller',cat:'Laptop / MacBook',item:{name:'MacBook Pro 14-inch M3 Pro — Space Black',serial:'',qty:1,price:189900},notes:'Manufacturer warranty: 1 year. AppleCare eligible.\nBox contents: MacBook Pro, USB-C to MagSafe 3 cable, 96W USB-C adapter.'},
  iphone:{seller:'Apple Store',cat:'Mobile / iPhone',item:{name:'iPhone 15 Pro — Natural Titanium, 256GB',serial:'',qty:1,price:134900},notes:'1 year Apple warranty included. IMEI registered at time of sale.\nBox contents: iPhone, USB-C cable, documentation.'},
  airpods:{seller:'Apple Authorized Reseller',cat:'Accessories',item:{name:'AirPods Pro (2nd generation) with MagSafe Charging Case',serial:'',qty:1,price:24900},notes:'6 months manufacturer warranty.\nBox contents: AirPods Pro, MagSafe Charging Case, ear tips (S/M/L), USB-C cable.'},
  ps5:{seller:'Sony Authorized Store',cat:'Gaming Console',item:{name:'PlayStation 5 Console — Disc Edition',serial:'',qty:1,price:54990},notes:'1 year Sony warranty.\nBox contents: PS5 console, DualSense controller, HDMI 2.1 cable, power cable, USB cable.'},
  repair:{seller:'QuickFix Service Center',cat:'Repair Service',item:{name:'Screen Replacement & Repair Service',serial:'',qty:1,price:3500},notes:'90-day warranty on all repair work. Genuine parts used.\nSame-day turnaround. Carry-in service only.'},
  freelance:{seller:'',cat:'Freelance Work',item:{name:'UI/UX Design & Development — Project',serial:'',qty:1,price:50000},notes:'Payment due within 30 days of invoice date.\nIncludes 2 rounds of revisions. Final deliverables: Figma source files + developer handoff.'}
};
const L={
  en:{addItem:'Add item',save:'Save',dl:'Download PDF',noSaved:'No saved invoices yet.',from:'From',to:'To',desc:'Description',qty:'Qty',unit:'Unit Price',amt:'Amount',subtotal:'Subtotal',tax:'Tax',disc:'Discount',grand:'Total Amount',notes:'Notes & Terms',payLabel:'via',signature:'Authorized Signature',shareTitle:'Check out InvoiceCraft!',shareText:'Professional invoice generation made simple.'},
  hi:{addItem:'Naya item jodo',save:'Save Karo',dl:'PDF Download Karo',noSaved:'Koi saved invoice nahi mili.',from:'Bhejna',to:'Lena',desc:'Cheez / Kaam',qty:'Qty',unit:'Daam (ek ka)',amt:'Kul',subtotal:'Subtotal',tax:'Tax',disc:'Chhoot',grand:'Kul Raqam',notes:'Notes aur Terms',payLabel:'via',signature:'Authorized Signature',shareTitle:'InvoiceCraft dekhein!',shareText:'Professional invoice banayein aasani se.'}
};
