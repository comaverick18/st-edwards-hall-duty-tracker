# 🏠 St. Edward's Hall Duty Schedule Tracker

An advanced duty tracking system designed specifically for St. Edward's Hall staff scheduling from August 2025 through January 2026.

## 📋 Overview

The St. Edward's Hall Duty Schedule Tracker is a comprehensive web application that enables efficient management of duty schedules for Resident Assistants (RAs) and Assistant Rectors (ARs). Built with modern web technologies, it provides an intuitive interface for tracking duties across multiple weeks with real-time statistics and cumulative reporting.

## ✨ Features

### 🗓️ **Schedule Management**
- **Date Range**: August 25, 2025 - January 4, 2026
- **Week Structure**: Monday-Sunday format with weekend highlighting
- **Navigation**: Easy week-by-week navigation with Previous/Next controls
- **Overview**: Complete all-weeks view for comprehensive planning

### 👥 **Staff Management**
- **Resident Assistants**: Harry Shaia, Kevin Rybinski, Kyle Hill, PJ Carroll, Thomas Rybinski
- **Assistant Rectors**: Father Ralph, Eoghan Fay, Charlie Mathes
- **Fixed Staff**: No add/remove functionality (as per requirements)

### 📊 **Statistics & Reporting**
- **This Week**: Real-time count of current week duties
- **To Date**: Cumulative duty count from start date
- **Visual Indicators**: Color-coded duty status and weekend highlighting
- **Interactive Toggle**: Click any cell to toggle duty ON/OFF
- **Data Persistence**: Automatic saving to browser storage
- **Data Management**: Export, import, and clear data functionality

### 🎨 **Design & UX**
- **St. Edward's Theme**: Professional green color scheme (#2c5530)
- **Weekend Highlighting**: Light blue background for Saturday/Sunday
- **Responsive Design**: Mobile-friendly with touch/swipe support
- **Accessibility**: Keyboard navigation and focus indicators
- **Print Support**: Optimized for printing schedules

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional software or dependencies required

### Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/st-edwards-hall-duty-tracker.git
   cd st-edwards-hall-duty-tracker
   ```

2. **Open the application**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Python 3
     python -m http.server 8000
     
     # Python 2
     python -m SimpleHTTPServer 8000
     
     # Node.js (if you have http-server installed)
     npx http-server
     ```

3. **Access the application**
   - Direct file: Open `index.html` in your browser
   - Local server: Visit `http://localhost:8000`

## 📖 Usage Guide

### Basic Navigation
- **Previous Week**: Click "← Previous Week" or press left arrow key
- **Next Week**: Click "Next Week →" or press right arrow key
- **Current Week**: View displays current week date range
- **All Weeks**: Click "View All Weeks" for complete overview

### Managing Duties
1. **Toggle Duty**: Click any duty cell to toggle ON/OFF status
2. **Visual Feedback**: Green cells indicate active duties
3. **Weekend Cells**: Light blue background for Saturday/Sunday
4. **Statistics**: Real-time updates in summary cards and table columns
5. **Auto-Save**: Data automatically saves to your browser
6. **Data Management**: Use Clear, Export, and Import buttons for data control

### Mobile Usage
- **Touch Navigation**: Swipe left/right to navigate weeks
- **Responsive Layout**: Optimized for mobile devices
- **Touch-Friendly**: Large touch targets for easy interaction

### Data Management
1. **Automatic Saving**: All changes are automatically saved to your browser
2. **Clear All Data**: Reset all duty assignments to start fresh
3. **Export Data**: Download your data as a JSON file for backup
4. **Import Data**: Upload previously exported data to restore assignments
5. **Data Persistence**: Your data survives browser restarts and computer reboots

## 🛠️ Technical Details

### Architecture
- **Frontend**: Pure HTML5, CSS3, JavaScript (ES6+)
- **No Dependencies**: Zero external libraries or frameworks
- **Data Storage**: localStorage for persistence across sessions
- **Browser Support**: Modern browsers with ES6 support

### File Structure
```
st-edwards-hall-duty-tracker/
├── index.html          # Main application file
├── styles.css          # Complete styling and responsive design
├── script.js           # Application logic and functionality
├── README.md           # Project documentation
├── LICENSE             # MIT License
├── CONTRIBUTING.md     # Contribution guidelines
├── CHANGELOG.md        # Version history
└── .gitignore          # Git ignore rules
```

### Key Components
- **DutyScheduleTracker Class**: Main application controller
- **Date Management**: Week generation and navigation
- **Data Structure**: Staff and duty tracking system
- **UI Components**: Interactive table and navigation
- **Statistics Engine**: Real-time calculation and display
- **Data Persistence**: localStorage integration for session continuity
- **Data Management**: Export, import, and clear functionality

## 🎯 Use Cases

### For Hall Staff
- **Daily Planning**: Quick view of current week duties
- **Schedule Review**: Historical duty tracking and patterns
- **Fair Distribution**: Monitor duty distribution across staff
- **Mobile Access**: Check schedules on mobile devices

### For Hall Management
- **Oversight**: Complete visibility of all staff duties
- **Reporting**: Cumulative statistics for planning
- **Compliance**: Ensure proper duty coverage
- **Documentation**: Print-friendly schedules for records

## 🔧 Customization

### Color Scheme
The application uses St. Edward's Hall branding colors:
- **Primary Green**: #2c5530 (headers, accents)
- **Secondary Green**: #3d6b42 (gradients)
- **Weekend Blue**: #87CEEB (Saturday/Sunday)
- **Success Green**: #28a745 (active duties)

### Staff Members
Staff lists are defined in `script.js`:
```javascript
this.staff = {
    ra: ['Harry Shaia', 'Kevin Rybinski', 'Kyle Hill', 'PJ Carroll', 'Thomas Rybinski'],
    ar: ['Father Ralph', 'Eoghan Fay', 'Charlie Mathes']
};
```

### Date Range
Modify the date range in `script.js`:
```javascript
this.startDate = new Date('2025-08-25');
this.endDate = new Date('2026-01-04');
```

## 📱 Browser Compatibility

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 60+ | ✅ Full |
| Firefox | 55+ | ✅ Full |
| Safari | 12+ | ✅ Full |
| Edge | 79+ | ✅ Full |
| IE | 11 | ⚠️ Limited |

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For questions, issues, or feature requests:
- **Issues**: Use GitHub Issues
- **Discussions**: Use GitHub Discussions
- **Email**: Contact the development team

## 🏆 Acknowledgments

- **St. Edward's Hall** for the opportunity to create this system
- **Hall Staff** for providing requirements and feedback
- **Open Source Community** for inspiration and best practices

## 📈 Roadmap

### Version 1.1 (Planned)
- [ ] Export functionality (PDF, Excel)
- [ ] Advanced filtering options
- [ ] Duty conflict detection
- [ ] Email notifications

### Version 1.2 (Future)
- [ ] Multi-hall support
- [ ] Advanced reporting
- [ ] Integration with calendar systems
- [ ] Mobile app version

---

**Built with ❤️ for St. Edward's Hall**

*Last updated: December 2024*
