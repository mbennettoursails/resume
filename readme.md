# Matt Bennett - Product Leader Resume Website

A modern, responsive resume website designed to showcase professional experience, skills, and qualifications.

## Features

- Responsive design that works across all device sizes
- QR code generation for easy sharing of contact information
- vCard download functionality for adding contact to address book
- Timeline-based experience layout for visual impact
- Print-friendly styling for physical copies
- Accessible design following WCAG guidelines

## File Structure

```
matt-bennett-resume/
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and layout
├── script.js           # JavaScript functionality
└── avatar.jpg          # Profile image (add your own)
```

## Setup Instructions

1. Clone or download this repository
2. Replace `avatar.jpg` with your own profile image
3. Update personal information in the following files:
   - `index.html`: Update resume content
   - `script.js`: Update vCard information in the `createVCard()` function
4. Host on any web server or static site hosting service

## Customization Options

### Changing Colors

The primary color scheme can be modified in the `:root` section of `styles.css`:

```css
:root {
    --primary-color: #1e40af;
    --primary-light: #3b82f6;
    --primary-dark: #1e3a8a;
    /* additional colors... */
}
```

### Adding Sections

To add new sections, follow the HTML structure pattern in `index.html`. Each section follows this general format:

```html
<section class="py-10 [optional-background-class]">
    <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-blue-900 mb-6">Section Title</h2>
        <!-- Section content here -->
    </div>
</section>
```

## Mobile Business Card Usage

The QR code in the header contains your contact information in vCard format. When someone scans this code with their phone:

1. They can instantly save your contact information
2. The information includes your name, title, email, and LinkedIn URL
3. This works as a digital business card alternative

The "Share as vCard" button in the footer also allows direct downloading of your contact information.

## Browser Compatibility

This website is compatible with:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS/Android)

## Development Notes

This project uses:
- Semantic HTML5
- Tailwind CSS (via CDN)
- Vanilla JavaScript
- QRCode.js library for QR code generation

## Accessibility Features

- Semantic HTML structure
- Appropriate color contrast
- Keyboard navigation support
- Screen reader friendly content
- Focus states for interactive elements

## Performance Optimization

- Minimal dependencies
- Optimized asset loading
- CSS with low specificity for faster rendering
- JavaScript that doesn't block page loading

## License

Free to use and modify for personal use.

---

Created by Matt Bennett © 2025