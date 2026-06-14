# ChargeVision - Enterprise EV Charger Monitoring Platform

A modern, enterprise-grade EV Charger Monitoring & Management Dashboard built with Next.js 15, React, TypeScript, and Tailwind CSS.

![ChargeVision](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38b2ac?style=flat-square&logo=tailwind-css)

## 🎯 Features

### Dashboard
- **Executive Overview** - Real-time metrics for chargers, sessions, and revenue
- **Interactive Charts** - Energy usage, revenue trends, and charger status distribution
- **Alert Management** - Critical, warning, and info level alerts
- **Active Sessions** - Live charging session monitoring

### Charger Management
- **Comprehensive Table** - Sortable, filterable charger inventory
- **Status Tracking** - Real-time online/offline/charging/faulted status
- **Detailed Information** - Model, serial number, firmware, OCPP version

### Network Visualization
- **Interactive Map** - Visual representation of all charger locations
- **Status Indicators** - Color-coded markers for charger status
- **Location Grouping** - Organize chargers by location

### Analytics & Reporting
- **Energy Analytics** - kWh delivered, peak usage metrics
- **Revenue Reports** - Daily, weekly, and monthly revenue tracking
- **Utilization Metrics** - Charger and connector percentages

### User Management
- **Role-Based Access** - Super Admin, Operator, Viewer roles
- **User Directory** - Manage team members

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/          # Pages and routing
├── components/   # React components
├── types/        # TypeScript definitions
├── data/         # Mock data
├── utils/        # Utility functions
└── hooks/        # Custom hooks
```

## 🎨 Design System

- **Colors**: Electric Blue (#007AFF) primary accent
- **Dark Mode**: Enabled by default
- **Responsive**: Mobile-first approach
- **Components**: Pre-built UI library

## 📊 Built With

- Next.js 15 - React framework
- TypeScript - Type safety
- Tailwind CSS - Styling
- Recharts - Data visualization
- Lucide React - Icons
- next-themes - Theme management

## 📝 License

MIT License