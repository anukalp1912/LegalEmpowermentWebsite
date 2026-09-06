# Worker Legal Empowerment Website

A modern, fully functional website providing free legal guidance and support for workers' rights across India.

## Features

✨ **Core Features:**
- 🎤 Multi-language voice input support (Hindi, English, Tamil, Bengali, Telugu, Marathi)
- ⚖️ AI-powered legal guidance system
- 🔒 100% confidential and completely free
- 📱 Fully responsive design
- 🌙 Modern dark theme with gradient accents
- ♿ Accessibility-friendly UI

## Project Structure

```
LegalEmpowermentWebsite/
├── index.html          # Main HTML file
├── styles.css          # Complete styling
├── script.js           # JavaScript functionality
├── README.md           # This file
└── assets/             # Optional: For images/icons
```

## File Descriptions

### index.html
The main HTML file containing:
- Semantic structure with proper sections
- Header with badge and status indicators
- Hero section with bilingual support
- Interactive card with voice input and issue selection
- Response display section
- Features showcase
- FAQ section with accordion functionality
- Footer with navigation and contact info

### styles.css
Complete styling including:
- Glassmorphism design with backdrop filters
- Animated blur circles background
- Responsive grid layouts
- Audio visualizer animations
- Smooth transitions and hover effects
- Mobile-first responsive design
- Accessibility color contrasts

### script.js
Interactive functionality:
- Legal guidance database with 6 common worker issues
- Voice recognition (Web Speech API)
- Issue tag auto-fill
- FAQ accordion toggle
- Response display and management
- Form validation
- Keyboard shortcuts (Ctrl+Enter to submit)

## Quick Start

### Option 1: Local File System
1. Download all files
2. Open `index.html` in your web browser
3. No server setup required!

### Option 2: VS Code
1. Open the folder in VS Code
2. Install "Live Server" extension (by Ritwick Dey)
3. Right-click `index.html` → "Open with Live Server"
4. Browser will automatically open at `http://localhost:5500`

### Option 3: Simple Python Server
```bash
# Python 3.x
python -m http.server 8000

# Python 2.x
python -m SimpleHTTPServer 8000
```
Then visit: `http://localhost:8000`

## Browser Support

- ✅ Chrome/Edge 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Mobile browsers (iOS Safari, Chrome Android)

**For voice features:** Chrome, Edge, or Safari recommended

## Features Explained

### Voice Input
- Click the microphone button to start voice recognition
- Supports 6 languages
- Transcript automatically fills the text area

### Issue Selection
Click any issue tag to auto-populate common problems:
- Salary Withheld
- Fired Without Notice
- Excessive Hours
- No Written Contract
- Workplace Injury
- Sexual Harassment

### Legal Guidance
- Enter your situation or question
- AI-powered system analyzes your input
- Provides category-specific legal guidance
- Includes actionable next steps
- References Indian labor laws

### FAQ Accordion
- Click questions to expand/collapse
- Covers common worker concerns
- Bilingual content

## Legal Information

This website provides **general legal information**, not professional legal advice. For specific legal consultation, contact:

- **District Labor Officer** - Local authority in your district
- **Worker Helpline:** 1800-WORKER-1 (toll-free)
- **Women Helpline:** 181 (for harassment cases)
- **Legal Aid Organizations** - Government-sponsored free legal aid

## Customization

### Change Colors
Edit `styles.css`:
- Primary orange: `#FB923C` (search and replace)
- Accent green: `#34D399` (search and replace)
- Background: `#0B0F17` (search and replace)

### Add More Issues
In `script.js`, add entries to `legalGuidanceDatabase`:
```javascript
'New Issue': [
    'First point of guidance',
    'Second point of guidance',
    // ... more points
]
```

### Update Contact Info
Edit in `index.html` footer section:
```html
<p>Email: your-email@domain.com</p>
<p>Phone: Your Phone Number</p>
```

## Keyboard Shortcuts

- **Ctrl + Enter** - Submit form
- **Tab** - Navigate between elements
- **Enter** - Expand/collapse FAQ items

## Performance

- Lightweight (~35 KB total)
- No external dependencies
- Fast load time
- Optimized animations
- Mobile-friendly

## Accessibility

- Semantic HTML5
- ARIA labels where needed
- Color contrast compliant (WCAG AA)
- Keyboard navigation support
- Screen reader friendly
- Readable fonts (12px minimum)

## License

This website is provided as-is for educational and worker empowerment purposes.

## Support

For issues, suggestions, or contributions:
- Test on multiple browsers
- Check console for errors (F12)
- Verify all files are in same directory
- Clear browser cache if styling doesn't load

## Future Enhancements

Potential features to add:
- Backend API integration for dynamic content
- User accounts and case history
- Multi-language auto-detection
- SMS notification support
- PDF report generation
- Integration with legal aid databases
- Video tutorials
- Live chat support
- Offline mode support

## Contact & Feedback

Email: support@workerlegal.in
Helpline: 1800-WORKER-1

---

**Remember:** This is general guidance. Every legal situation is unique. Please consult with qualified legal professionals for your specific case.
