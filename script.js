// St. Edward's Hall Duty Schedule Tracker
// Advanced Duty Tracking System

class DutyScheduleTracker {
    constructor() {
        // Staff members (fixed as per requirements)
        this.staff = {
            ra: [
                'Harry Shaia',
                'Kevin Rybinski', 
                'Kyle Hill',
                'PJ Carroll',
                'Thomas Rybinski'
            ],
            ar: [
                'Father Ralph',
                'Eoghan Fay',
                'Charlie Mathes'
            ]
        };

        // Date range configuration
        this.startDate = new Date('2025-08-25'); // Monday, August 25, 2025
        this.endDate = new Date('2026-01-04');   // Sunday, January 4, 2026
        
        // Current week tracking
        this.currentWeekIndex = 0;
        this.weeks = this.generateWeeks();
        
        // Duty data storage (in-memory only)
        this.dutyData = this.initializeDutyData();
        
        // UI elements
        this.elements = {
            prevWeekBtn: document.getElementById('prevWeek'),
            nextWeekBtn: document.getElementById('nextWeek'),
            viewAllWeeksBtn: document.getElementById('viewAllWeeks'),
            currentWeekDisplay: document.getElementById('currentWeekDisplay'),
            scheduleTable: document.getElementById('scheduleTable'),
            scheduleBody: document.getElementById('scheduleBody'),
            allWeeksView: document.getElementById('allWeeksView'),
            allWeeksContent: document.getElementById('allWeeksContent'),
            raThisWeek: document.getElementById('raThisWeek'),
            arThisWeek: document.getElementById('arThisWeek'),
            raToDate: document.getElementById('raToDate'),
            arToDate: document.getElementById('arToDate')
        };

        this.initializeApp();
    }

    // Generate all weeks in the date range
    generateWeeks() {
        const weeks = [];
        const currentDate = new Date(this.startDate);
        
        while (currentDate <= this.endDate) {
            const weekStart = new Date(currentDate);
            const weekEnd = new Date(currentDate);
            weekEnd.setDate(weekEnd.getDate() + 6);
            
            weeks.push({
                start: new Date(weekStart),
                end: new Date(weekEnd),
                days: this.generateWeekDays(weekStart)
            });
            
            currentDate.setDate(currentDate.getDate() + 7);
        }
        
        return weeks;
    }

    // Generate days for a specific week
    generateWeekDays(weekStart) {
        const days = [];
        for (let i = 0; i < 7; i++) {
            const day = new Date(weekStart);
            day.setDate(day.getDate() + i);
            days.push(new Date(day));
        }
        return days;
    }

    // Initialize duty data structure
    initializeDutyData() {
        const data = {};
        
        // Initialize RA data
        this.staff.ra.forEach(ra => {
            data[ra] = { type: 'ra', duties: {} };
            this.weeks.forEach((week, weekIndex) => {
                week.days.forEach(day => {
                    const dayKey = this.getDayKey(day);
                    data[ra].duties[dayKey] = false;
                });
            });
        });
        
        // Initialize AR data
        this.staff.ar.forEach(ar => {
            data[ar] = { type: 'ar', duties: {} };
            this.weeks.forEach((week, weekIndex) => {
                week.days.forEach(day => {
                    const dayKey = this.getDayKey(day);
                    data[ar].duties[dayKey] = false;
                });
            });
        });
        
        return data;
    }

    // Get unique key for a day
    getDayKey(date) {
        return date.toISOString().split('T')[0];
    }

    // Format date for display
    formatDate(date) {
        return date.toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
        });
    }

    // Format week display
    formatWeekDisplay(week) {
        return `Week of ${this.formatDate(week.start)}`;
    }

    // Check if a day is weekend
    isWeekend(date) {
        const day = date.getDay();
        return day === 0 || day === 6; // Sunday or Saturday
    }

    // Initialize the application
    initializeApp() {
        this.bindEvents();
        this.renderCurrentWeek();
        this.updateStatistics();
    }

    // Bind event listeners
    bindEvents() {
        this.elements.prevWeekBtn.addEventListener('click', () => this.previousWeek());
        this.elements.nextWeekBtn.addEventListener('click', () => this.nextWeek());
        this.elements.viewAllWeeksBtn.addEventListener('click', () => this.toggleAllWeeksView());
        
        // Bind duty cell clicks
        this.elements.scheduleBody.addEventListener('click', (e) => {
            if (e.target.classList.contains('duty-cell')) {
                this.toggleDuty(e.target);
            }
        });
    }

    // Navigate to previous week
    previousWeek() {
        if (this.currentWeekIndex > 0) {
            this.currentWeekIndex--;
            this.renderCurrentWeek();
            this.updateStatistics();
        }
    }

    // Navigate to next week
    nextWeek() {
        if (this.currentWeekIndex < this.weeks.length - 1) {
            this.currentWeekIndex++;
            this.renderCurrentWeek();
            this.updateStatistics();
        }
    }

    // Toggle all weeks view
    toggleAllWeeksView() {
        const isVisible = this.elements.allWeeksView.style.display !== 'none';
        
        if (isVisible) {
            this.elements.allWeeksView.style.display = 'none';
            this.elements.viewAllWeeksBtn.textContent = 'View All Weeks';
        } else {
            this.renderAllWeeks();
            this.elements.allWeeksView.style.display = 'block';
            this.elements.viewAllWeeksBtn.textContent = 'Hide All Weeks';
        }
    }

    // Render current week
    renderCurrentWeek() {
        const currentWeek = this.weeks[this.currentWeekIndex];
        this.elements.currentWeekDisplay.textContent = this.formatWeekDisplay(currentWeek);
        
        // Clear existing content
        this.elements.scheduleBody.innerHTML = '';
        
        // Add RA section header
        this.addSectionHeader('ra');
        
        // Add RA rows
        this.staff.ra.forEach(ra => {
            this.addStaffRow(ra, currentWeek);
        });
        
        // Add AR section header
        this.addSectionHeader('ar');
        
        // Add AR rows
        this.staff.ar.forEach(ar => {
            this.addStaffRow(ar, currentWeek);
        });
        
        // Update navigation button states
        this.updateNavigationButtons();
    }

    // Add section header
    addSectionHeader(type) {
        const row = document.createElement('tr');
        row.className = 'section-header';
        
        const cell = document.createElement('td');
        cell.colSpan = 10;
        cell.className = type === 'ra' ? 'ra-section-header' : 'ar-section-header';
        cell.textContent = type === 'ra' ? 'Resident Assistants' : 'Assistant Rectors';
        
        row.appendChild(cell);
        this.elements.scheduleBody.appendChild(row);
    }

    // Add staff row
    addStaffRow(staffName, week) {
        const row = document.createElement('tr');
        
        // Staff name cell
        const nameCell = document.createElement('td');
        nameCell.className = 'staff-name';
        nameCell.textContent = staffName;
        row.appendChild(nameCell);
        
        // Day cells
        week.days.forEach(day => {
            const dayCell = document.createElement('td');
            dayCell.className = 'duty-cell';
            
            if (this.isWeekend(day)) {
                dayCell.classList.add('weekend');
            }
            
            const dayKey = this.getDayKey(day);
            if (this.dutyData[staffName].duties[dayKey]) {
                dayCell.classList.add('on');
            }
            
            dayCell.dataset.staff = staffName;
            dayCell.dataset.day = dayKey;
            dayCell.textContent = this.dutyData[staffName].duties[dayKey] ? 'ON' : '';
            
            row.appendChild(dayCell);
        });
        
        // Statistics cells
        const thisWeekCell = document.createElement('td');
        thisWeekCell.className = 'stats-cell';
        thisWeekCell.textContent = this.calculateWeekDuties(staffName, week);
        row.appendChild(thisWeekCell);
        
        const toDateCell = document.createElement('td');
        toDateCell.className = 'stats-cell';
        toDateCell.textContent = this.calculateTotalDuties(staffName);
        row.appendChild(toDateCell);
        
        this.elements.scheduleBody.appendChild(row);
    }

    // Toggle duty status
    toggleDuty(cell) {
        const staffName = cell.dataset.staff;
        const dayKey = cell.dataset.day;
        
        if (!staffName || !dayKey) return;
        
        // Toggle the duty status
        this.dutyData[staffName].duties[dayKey] = !this.dutyData[staffName].duties[dayKey];
        
        // Update the cell appearance
        if (this.dutyData[staffName].duties[dayKey]) {
            cell.classList.add('on');
            cell.textContent = 'ON';
        } else {
            cell.classList.remove('on');
            cell.textContent = '';
        }
        
        // Update statistics
        this.updateStatistics();
    }

    // Calculate duties for a specific week
    calculateWeekDuties(staffName, week) {
        let count = 0;
        week.days.forEach(day => {
            const dayKey = this.getDayKey(day);
            if (this.dutyData[staffName].duties[dayKey]) {
                count++;
            }
        });
        return count;
    }

    // Calculate total duties from start date
    calculateTotalDuties(staffName) {
        let count = 0;
        const currentWeek = this.weeks[this.currentWeekIndex];
        
        this.weeks.forEach(week => {
            if (week.start <= currentWeek.start) {
                week.days.forEach(day => {
                    const dayKey = this.getDayKey(day);
                    if (this.dutyData[staffName].duties[dayKey]) {
                        count++;
                    }
                });
            }
        });
        
        return count;
    }

    // Update statistics display
    updateStatistics() {
        const currentWeek = this.weeks[this.currentWeekIndex];
        
        // Calculate RA statistics
        let raThisWeek = 0;
        let arThisWeek = 0;
        let raToDate = 0;
        let arToDate = 0;
        
        // This week statistics
        this.staff.ra.forEach(ra => {
            raThisWeek += this.calculateWeekDuties(ra, currentWeek);
        });
        
        this.staff.ar.forEach(ar => {
            arThisWeek += this.calculateWeekDuties(ar, currentWeek);
        });
        
        // To date statistics
        this.staff.ra.forEach(ra => {
            raToDate += this.calculateTotalDuties(ra);
        });
        
        this.staff.ar.forEach(ar => {
            arToDate += this.calculateTotalDuties(ar);
        });
        
        // Update display
        this.elements.raThisWeek.textContent = raThisWeek;
        this.elements.arThisWeek.textContent = arThisWeek;
        this.elements.raToDate.textContent = raToDate;
        this.elements.arToDate.textContent = arToDate;
    }

    // Update navigation button states
    updateNavigationButtons() {
        this.elements.prevWeekBtn.disabled = this.currentWeekIndex === 0;
        this.elements.nextWeekBtn.disabled = this.currentWeekIndex === this.weeks.length - 1;
        
        if (this.currentWeekIndex === 0) {
            this.elements.prevWeekBtn.style.opacity = '0.5';
            this.elements.prevWeekBtn.style.cursor = 'not-allowed';
        } else {
            this.elements.prevWeekBtn.style.opacity = '1';
            this.elements.prevWeekBtn.style.cursor = 'pointer';
        }
        
        if (this.currentWeekIndex === this.weeks.length - 1) {
            this.elements.nextWeekBtn.style.opacity = '0.5';
            this.elements.nextWeekBtn.style.cursor = 'not-allowed';
        } else {
            this.elements.nextWeekBtn.style.opacity = '1';
            this.elements.nextWeekBtn.style.cursor = 'pointer';
        }
    }

    // Render all weeks view
    renderAllWeeks() {
        this.elements.allWeeksContent.innerHTML = '';
        
        this.weeks.forEach((week, weekIndex) => {
            const weekCard = document.createElement('div');
            weekCard.className = 'week-card';
            
            const weekTitle = document.createElement('h3');
            weekTitle.textContent = this.formatWeekDisplay(week);
            weekCard.appendChild(weekTitle);
            
            const weekTable = document.createElement('table');
            weekTable.className = 'week-table';
            
            // Create table header
            const headerRow = document.createElement('tr');
            const headers = ['Staff', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Total'];
            headers.forEach(headerText => {
                const th = document.createElement('th');
                th.textContent = headerText;
                headerRow.appendChild(th);
            });
            weekTable.appendChild(headerRow);
            
            // Add RA rows
            this.staff.ra.forEach(ra => {
                const row = this.createAllWeeksRow(ra, week, 'ra');
                weekTable.appendChild(row);
            });
            
            // Add AR rows
            this.staff.ar.forEach(ar => {
                const row = this.createAllWeeksRow(ar, week, 'ar');
                weekTable.appendChild(row);
            });
            
            weekCard.appendChild(weekTable);
            this.elements.allWeeksContent.appendChild(weekCard);
        });
    }

    // Create row for all weeks view
    createAllWeeksRow(staffName, week, type) {
        const row = document.createElement('tr');
        
        // Staff name
        const nameCell = document.createElement('td');
        nameCell.className = 'staff-name';
        nameCell.textContent = staffName;
        row.appendChild(nameCell);
        
        // Day cells
        let weekTotal = 0;
        week.days.forEach(day => {
            const dayCell = document.createElement('td');
            dayCell.className = 'duty-cell';
            
            if (this.isWeekend(day)) {
                dayCell.classList.add('weekend');
            }
            
            const dayKey = this.getDayKey(day);
            const isOnDuty = this.dutyData[staffName].duties[dayKey];
            
            if (isOnDuty) {
                dayCell.classList.add('on');
                dayCell.textContent = 'ON';
                weekTotal++;
            } else {
                dayCell.textContent = '';
            }
            
            dayCell.dataset.staff = staffName;
            dayCell.dataset.day = dayKey;
            
            row.appendChild(dayCell);
        });
        
        // Total cell
        const totalCell = document.createElement('td');
        totalCell.className = 'stats-cell';
        totalCell.textContent = weekTotal;
        row.appendChild(totalCell);
        
        return row;
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DutyScheduleTracker();
});

// Add some utility functions for better user experience
document.addEventListener('keydown', (e) => {
    // Add keyboard navigation
    if (e.key === 'ArrowLeft') {
        const prevBtn = document.getElementById('prevWeek');
        if (!prevBtn.disabled) {
            prevBtn.click();
        }
    } else if (e.key === 'ArrowRight') {
        const nextBtn = document.getElementById('nextWeek');
        if (!nextBtn.disabled) {
            nextBtn.click();
        }
    }
});

// Add touch/swipe support for mobile devices
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next week
            const nextBtn = document.getElementById('nextWeek');
            if (!nextBtn.disabled) {
                nextBtn.click();
            }
        } else {
            // Swipe right - previous week
            const prevBtn = document.getElementById('prevWeek');
            if (!prevBtn.disabled) {
                prevBtn.click();
            }
        }
    }
}
