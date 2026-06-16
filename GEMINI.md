# InvoiceCraft

A professional invoice generation web application.

## Project Overview

InvoiceCraft is a frontend-only solution for creating, previewing, and exporting professional invoices. It is designed for speed and simplicity, requiring no backend or account creation.

### Main Technologies
- **HTML5/CSS3**: Core structure and responsive styling.
- **JavaScript (ES6+)**: Application logic and dynamic UI updates.
- **jsPDF**: Client-side PDF generation.
- **html2canvas**: Converting HTML elements to canvas for PDF export.
- **Local Storage**: Browser-based persistence for saved invoices.
- **Google Fonts (Inter)**: Typography.

### Architecture
The project follows a modular frontend architecture:
- `index.html`: The main entry point containing the application markup.
- `style.css`: Contains all application styles and layout rules.
- `constants.js`: Configuration data, templates, and language strings.
- `script.js`: Core application logic and event handlers.

## Building and Running

### Running Locally
To run the application, simply open `index.html` in any web browser.

```bash
# On macOS
open index.html

# On Windows
start index.html
```

### Build Process
This project currently does not require a build step as it uses vanilla technologies and CDN-hosted libraries.

## Development Conventions

### Coding Style
- **Modular JavaScript**: Logic is separated into `constants.js` and `script.js`.
- **Vanilla JS**: No frameworks are used. DOM manipulation is handled directly.
- **External Dependencies**: Managed via CDN in `index.html`.

### Key Features to Maintain
- **Live Preview**: Real-time updates as the user fills out the form.
- **Templates**: Support for multiple visual styles (defined in `constants.js`).
- **Internationalization**: Multi-language support (defined in `constants.js`).
- **Local Persistence**: Saving/Loading invoices via browser LocalStorage.

### Guidelines for Changes
- Keep configuration and static data in `constants.js`.
- Place functional logic and UI updates in `script.js`.
- Ensure CSS changes are added to `style.css`.
- Maintain the responsive layout.
