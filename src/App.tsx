/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, 
  Files, 
  UploadCloud, 
  ClipboardCheck, 
  Archive, 
  Settings, 
  Bell, 
  Search, 
  ChevronRight, 
  ChevronDown, 
  MoreVertical, 
  FileText, 
  FileSpreadsheet, 
  FilePieChart, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  X, 
  Filter, 
  Grid, 
  List, 
  Plus, 
  ArrowRight, 
  Check, 
  HelpCircle,
  User,
  LogOut,
  Download,
  Share2,
  Eye,
  Edit3,
  Trash2,
  RotateCcw,
  History,
  TrendingUp,
  Calendar,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell, 
  AreaChart, 
  Area,
  PieChart,
  Pie
} from 'recharts';

// --- THEME & STYLES ---
const COLORS = {
  bgBase: '#F0F2F5',
  bgSurface: '#1C1C1E', // Dark sidebar
  bgCard: '#FFFFFF',
  accentPrimary: '#FF6B6B', 
  accentSecondary: '#8B5CF6', 
  accentSuccess: '#10B981', 
  accentDanger: '#EF4444', 
  textPrimary: '#1A1A1A', 
  textMuted: '#6B7280', 
  border: '#E5E7EB',
  accentGradient: 'linear-gradient(135deg, #FF8C42 0%, #FF2E63 100%)',
};

const DOC_TYPES = ['Policy', 'Procedure', 'Work Instruction', 'Form', 'Template', 'Report'];
const SUB_DOC_TYPES = ['Safety', 'HR', 'Finance', 'Technical', 'Compliance'];
const DEPARTMENTS = ['HR', 'Finance', 'Operations', 'IT', 'Quality', 'Compliance'];
const SUB_DEPARTMENTS = ['Recruitment', 'Payroll', 'Audit', 'Security', 'QA', 'Legal'];
const CATEGORIES = ['Internal', 'External', 'Confidential', 'Public'];
const LANGUAGES = ['English', 'French', 'Spanish', 'Chinese', 'Arabic'];
const STAKEHOLDERS = ['John Doe', 'Jane Smith', 'Marcus Thorne', 'Sarah Chen', 'Alex Rivera'];

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@600;700;800&display=swap');
    
    :root {
      --bg-base: ${COLORS.bgBase};
      --bg-surface: ${COLORS.bgSurface};
      --bg-card: ${COLORS.bgCard};
      --accent-primary: ${COLORS.accentPrimary};
      --accent-secondary: ${COLORS.accentSecondary};
      --accent-success: ${COLORS.accentSuccess};
      --accent-danger: ${COLORS.accentDanger};
      --text-primary: ${COLORS.textPrimary};
      --text-muted: ${COLORS.textMuted};
      --border: ${COLORS.border};
      --accent-gradient: ${COLORS.accentGradient};
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background-color: var(--bg-base);
      color: var(--text-primary);
      font-family: 'Inter', sans-serif;
      overflow-x: hidden;
      letter-spacing: -0.01em;
    }

    h1, h2, h3, h4 {
      font-family: 'Outfit', sans-serif;
      letter-spacing: -0.02em;
    }

    /* Custom Scrollbar */
    ::-webkit-scrollbar {
      width: 4px;
    }
    ::-webkit-scrollbar-track {
      background: var(--bg-base);
    }
    ::-webkit-scrollbar-thumb {
      background: var(--border);
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: var(--accent-primary);
    }

    .glass {
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(20px);
      border: 1px solid var(--border);
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
    }

    .card-hover {
      transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    }

    .card-hover:hover {
      transform: translateY(-4px);
      border-color: var(--accent-primary);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02);
      background: #FFFFFF;
    }

    .btn-ripple {
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease;
    }

    .btn-ripple:active {
      transform: scale(0.96);
    }

    .glow-primary { box-shadow: 0 0 20px rgba(139, 92, 246, 0.4); }
    .glow-secondary { box-shadow: 0 0 20px rgba(6, 182, 212, 0.4); }
    .glow-success { box-shadow: 0 0 20px rgba(16, 185, 129, 0.4); }

    .table-row {
      transition: all 0.2s ease;
    }

    .table-row:hover {
      background: rgba(139, 92, 246, 0.05);
      border-left: 4px solid var(--accent-primary);
    }

    input, select, textarea {
      background: #FFFFFF;
      border: 1px solid var(--border);
      color: var(--text-primary);
      padding: 12px 16px;
      border-radius: 20px;
      outline: none;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      font-size: 14px;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.02);
    }

    input:focus {
      border-color: var(--accent-primary);
      background: #FFFFFF;
      box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
    }

    .shimmer {
      background: linear-gradient(90deg, transparent, rgba(0,0,0,0.03), transparent);
      background-size: 200% 100%;
      animation: shimmer 2s infinite;
    }

    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }

    .gradient-text {
      background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  `}</style>
);

// --- TYPES & MOCK DATA ---
type Role = 'Owner' | 'Controller' | 'SME';
type DocStatus = 'Draft' | 'Under Review' | 'Published' | 'Archived' | 'Retracted';
type Priority = 'High' | 'Medium' | 'Low';

interface Document {
  id: string;
  title: string;
  docNumber: string;
  version: string;
  type: 'Policy' | 'Procedure' | 'Work Instruction' | 'Form' | 'Template' | 'Report';
  department: 'HR' | 'Finance' | 'Operations' | 'IT' | 'Quality' | 'Compliance';
  category: string;
  status: DocStatus;
  priority: Priority;
  owner: string;
  submittedBy: string;
  submittedDate: string;
  approvedBy?: string;
  approvalDate?: string;
  retractedBy?: string;
  retractionDate?: string;
  retractionReason?: string;
  modifiedDate: string;
  size: string;
  description: string;
  // New fields
  typeOfDocument: string;
  typeOfSubDocument: string;
  documentTypeCode: string;
  departmentName: string;
  subDepartment: string;
  departmentId: string;
  documentCategory: string;
  internalStakeholderSME: string[];
  nextReviewBy: string;
  language: string;
}

const MOCK_USERS = [
  { id: 'u1', name: 'Alex Rivera', role: 'Owner', avatar: 'https://i.pravatar.cc/150?u=u1' },
  { id: 'u2', name: 'Sarah Chen', role: 'Controller', avatar: 'https://i.pravatar.cc/150?u=u2' },
  { id: 'u3', name: 'Marcus Thorne', role: 'SME', avatar: 'https://i.pravatar.cc/150?u=u3' },
];

const INITIAL_DOCS: Document[] = [
  {
    id: '1',
    title: 'Employee Onboarding Policy',
    docNumber: 'DOC-2024-001',
    version: '2.1',
    type: 'Policy',
    department: 'HR',
    category: 'Recruitment',
    status: 'Published',
    priority: 'Medium',
    owner: 'Alex Rivera',
    submittedBy: 'Alex Rivera',
    submittedDate: '2024-01-15',
    approvedBy: 'Sarah Chen',
    approvalDate: '2024-01-20',
    modifiedDate: '2024-01-20',
    size: '1.2 MB',
    description: 'Standard procedures for new employee integration.',
    typeOfDocument: 'Policy',
    typeOfSubDocument: 'HR',
    documentTypeCode: 'POL-HR-001',
    departmentName: 'HR',
    subDepartment: 'Recruitment',
    departmentId: 'DEPT-HR',
    documentCategory: 'Internal',
    internalStakeholderSME: ['Sarah Chen', 'Jane Smith'],
    nextReviewBy: '2025-01-15',
    language: 'English'
  },
  {
    id: '2',
    title: 'Quarterly Financial Audit',
    docNumber: 'DOC-2024-002',
    version: '1.0',
    type: 'Report',
    department: 'Finance',
    category: 'Audit',
    status: 'Under Review',
    priority: 'High',
    owner: 'Alex Rivera',
    submittedBy: 'Alex Rivera',
    submittedDate: '2024-03-10',
    modifiedDate: '2024-03-10',
    size: '4.5 MB',
    description: 'Detailed financial analysis for Q1 2024.',
    typeOfDocument: 'Report',
    typeOfSubDocument: 'Finance',
    documentTypeCode: 'REP-FIN-002',
    departmentName: 'Finance',
    subDepartment: 'Audit',
    departmentId: 'DEPT-FIN',
    documentCategory: 'Confidential',
    internalStakeholderSME: ['Sarah Chen'],
    nextReviewBy: '2024-09-10',
    language: 'English'
  },
  {
    id: '3',
    title: 'IT Security Protocol',
    docNumber: 'DOC-2024-003',
    version: '3.0',
    type: 'Procedure',
    department: 'IT',
    category: 'Security',
    status: 'Published',
    priority: 'High',
    owner: 'Marcus Thorne',
    submittedBy: 'Marcus Thorne',
    submittedDate: '2023-11-05',
    approvedBy: 'Sarah Chen',
    approvalDate: '2023-11-10',
    modifiedDate: '2023-11-10',
    size: '2.8 MB',
    description: 'Guidelines for maintaining network integrity.',
    typeOfDocument: 'Procedure',
    typeOfSubDocument: 'Technical',
    documentTypeCode: 'PRO-IT-003',
    departmentName: 'IT',
    subDepartment: 'Security',
    departmentId: 'DEPT-IT',
    documentCategory: 'Internal',
    internalStakeholderSME: ['Marcus Thorne', 'John Doe'],
    nextReviewBy: '2024-11-05',
    language: 'English'
  },
  {
    id: '4',
    title: 'Quality Control Form',
    docNumber: 'DOC-2024-004',
    version: '1.2',
    type: 'Form',
    department: 'Quality',
    category: 'Inspection',
    status: 'Draft',
    priority: 'Low',
    owner: 'Alex Rivera',
    submittedBy: 'Alex Rivera',
    submittedDate: '2024-02-28',
    modifiedDate: '2024-02-28',
    size: '0.5 MB',
    description: 'Daily inspection checklist for production line.',
    typeOfDocument: 'Form',
    typeOfSubDocument: 'Quality',
    documentTypeCode: 'FRM-QUA-004',
    departmentName: 'Quality',
    subDepartment: 'QA',
    departmentId: 'DEPT-QUA',
    documentCategory: 'Internal',
    internalStakeholderSME: ['Alex Rivera'],
    nextReviewBy: '2025-02-28',
    language: 'English'
  },
  {
    id: '5',
    title: 'Safety Training Manual',
    docNumber: 'DOC-2024-005',
    version: '1.1',
    type: 'Work Instruction',
    department: 'Operations',
    category: 'Safety',
    status: 'Retracted',
    priority: 'High',
    owner: 'Marcus Thorne',
    submittedBy: 'Marcus Thorne',
    submittedDate: '2024-02-10',
    retractedBy: 'Sarah Chen',
    retractionDate: '2024-02-15',
    retractionReason: 'Missing updated OSHA compliance sections.',
    modifiedDate: '2024-02-15',
    size: '3.1 MB',
    description: 'Comprehensive safety guide for field operators.',
    typeOfDocument: 'Work Instruction',
    typeOfSubDocument: 'Safety',
    documentTypeCode: 'WIN-OPS-005',
    departmentName: 'Operations',
    subDepartment: 'Safety',
    departmentId: 'DEPT-OPS',
    documentCategory: 'Public',
    internalStakeholderSME: ['Alex Rivera', 'John Doe'],
    nextReviewBy: '2024-12-10',
    language: 'English'
  },
  {
    id: '6',
    title: 'Compliance Checklist',
    docNumber: 'DOC-2024-006',
    version: '2.0',
    type: 'Form',
    department: 'Compliance',
    category: 'Regulatory',
    status: 'Published',
    priority: 'Medium',
    owner: 'Sarah Chen',
    submittedBy: 'Sarah Chen',
    submittedDate: '2023-12-01',
    approvedBy: 'Marcus Thorne',
    approvalDate: '2023-12-05',
    modifiedDate: '2023-12-05',
    size: '0.8 MB',
    description: 'Annual regulatory compliance verification.',
    typeOfDocument: 'Form',
    typeOfSubDocument: 'Compliance',
    documentTypeCode: 'FRM-COM-006',
    departmentName: 'Compliance',
    subDepartment: 'Legal',
    departmentId: 'DEPT-COM',
    documentCategory: 'Internal',
    internalStakeholderSME: ['Sarah Chen'],
    nextReviewBy: '2024-09-20',
    language: 'English'
  },
  {
    id: '7',
    title: 'Disaster Recovery Plan',
    docNumber: 'DOC-2024-007',
    version: '1.5',
    type: 'Procedure',
    department: 'IT',
    category: 'Infrastructure',
    status: 'Under Review',
    priority: 'High',
    owner: 'Alex Rivera',
    submittedBy: 'Alex Rivera',
    submittedDate: '2024-03-20',
    modifiedDate: '2024-03-20',
    size: '5.2 MB',
    description: 'Step-by-step recovery process for critical systems.',
    typeOfDocument: 'Procedure',
    typeOfSubDocument: 'Technical',
    documentTypeCode: 'PRO-IT-007',
    departmentName: 'IT',
    subDepartment: 'Security',
    departmentId: 'DEPT-IT',
    documentCategory: 'Confidential',
    internalStakeholderSME: ['Alex Rivera', 'Marcus Thorne'],
    nextReviewBy: '2024-09-20',
    language: 'English'
  },
  {
    id: '8',
    title: 'Expense Reimbursement Template',
    docNumber: 'DOC-2024-008',
    version: '1.0',
    type: 'Template',
    department: 'Finance',
    category: 'Expenses',
    status: 'Archived',
    priority: 'Low',
    owner: 'Sarah Chen',
    submittedBy: 'Sarah Chen',
    submittedDate: '2022-05-10',
    approvedBy: 'Marcus Thorne',
    approvalDate: '2022-05-15',
    modifiedDate: '2023-01-10',
    size: '0.3 MB',
    description: 'Legacy template for employee expenses.',
    typeOfDocument: 'Template',
    typeOfSubDocument: 'Finance',
    documentTypeCode: 'TMP-FIN-008',
    departmentName: 'Finance',
    subDepartment: 'Payroll',
    departmentId: 'DEPT-FIN',
    documentCategory: 'Internal',
    internalStakeholderSME: ['Sarah Chen'],
    nextReviewBy: '2025-01-01',
    language: 'English'
  }
];

// --- COMPONENTS ---

const StatusBadge = ({ status }: { status: DocStatus }) => {
  const config = {
    Draft: { color: COLORS.textMuted, glow: '' },
    'Under Review': { color: COLORS.accentPrimary, glow: 'glow-primary' },
    Published: { color: COLORS.accentSuccess, glow: 'glow-success' },
    Archived: { color: COLORS.accentSecondary, glow: '' },
    Retracted: { color: COLORS.accentDanger, glow: 'glow-secondary' },
  };
  const { color, glow } = config[status];
  return (
    <span style={{ 
      padding: '4px 10px', 
      borderRadius: '20px', 
      fontSize: '11px', 
      fontWeight: 600, 
      backgroundColor: `${color}20`, 
      color: color,
      border: `1px solid ${color}40`
    }} className={glow}>
      {status}
    </span>
  );
};

const PriorityBadge = ({ priority }: { priority: Priority }) => {
  const colors = { High: COLORS.accentDanger, Medium: COLORS.accentPrimary, Low: COLORS.accentSecondary };
  return (
    <span style={{ 
      display: 'inline-flex', 
      alignItems: 'center', 
      gap: '4px',
      fontSize: '11px',
      color: colors[priority]
    }}>
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: colors[priority] }} />
      {priority}
    </span>
  );
};

const IconButton = ({ icon: Icon, onClick, color = COLORS.textMuted, size = 18 }: any) => (
  <button 
    onClick={onClick}
    style={{ 
      background: 'none', 
      border: 'none', 
      color: color, 
      cursor: 'pointer', 
      padding: '6px',
      borderRadius: '6px',
      transition: 'all 0.2s'
    }}
    className="btn-ripple"
    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)')}
    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
  >
    <Icon size={size} />
  </button>
);


// --- MAIN APP ---

export default function App() {
  const [currentRole, setCurrentRole] = useState<Role>('Owner');
  const [activePage, setActivePage] = useState('Dashboard');
  const [documents, setDocuments] = useState<Document[]>(INITIAL_DOCS);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Document, direction: 'asc' | 'desc' } | null>(null);
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'review', message: 'New document submitted for your review: IT Security Protocol', time: '2 mins ago', read: false },
    { id: 2, type: 'approval', message: 'Your document "Employee Onboarding" has been approved.', time: '1 hour ago', read: true },
    { id: 3, type: 'deadline', message: 'Reminder: Quality Control Form review deadline is tomorrow.', time: '5 hours ago', read: false },
  ]);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Dashboard Stats
  const stats = useMemo(() => ({
    pending: documents.filter(d => d.status === 'Under Review').length,
    approved: documents.filter(d => d.status === 'Published').length,
    retracted: documents.filter(d => d.status === 'Retracted').length,
  }), [documents]);

  const currentUser = MOCK_USERS.find(u => u.role === currentRole) || MOCK_USERS[0];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: COLORS.bgBase }}>
      <GlobalStyles />
      
      {/* Sidebar */}
      <aside style={{ 
        width: '240px', 
        backgroundColor: COLORS.bgSurface, 
        borderRight: 'none',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        height: '100vh',
        zIndex: 100,
        color: '#FFFFFF'
      }}>
        <div style={{ padding: '48px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '20px', fontWeight: 900, letterSpacing: '1px', color: '#FFFFFF', textTransform: 'uppercase' }}>Kamoa Copper SA</h1>
            <div style={{ width: '40px', height: '2px', background: COLORS.accentGradient, margin: '16px auto' }} />
            <p style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.6)', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 700 }}>Document Control System</p>
          </div>
        </div>

        <nav style={{ flex: 1, padding: '20px 12px' }}>
          {[
            { name: 'Dashboard', icon: LayoutDashboard },
            { name: 'My Documents', icon: Files },
            { name: 'Upload', icon: UploadCloud },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => setActivePage(item.name)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '12px',
                border: 'none',
                background: activePage === item.name ? COLORS.accentGradient : 'transparent',
                color: activePage === item.name ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)',
                cursor: 'pointer',
                marginBottom: '4px',
                transition: 'all 0.2s',
                position: 'relative'
              }}
            >
              <item.icon size={20} />
              <span style={{ fontWeight: 500, fontSize: '14px' }}>{item.name}</span>
            </button>
          ))}
        </nav>

        <div style={{ padding: '24px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', textAlign: 'center' }}>
          <p style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.3)', letterSpacing: '1px' }}>© 2026 Kamoa Copper SA</p>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, marginLeft: '240px', padding: '0 40px 40px' }}>
        {/* Header */}
        <header style={{ 
          height: '80px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          backgroundColor: `${COLORS.bgBase}cc`,
          backdropFilter: 'blur(8px)',
          zIndex: 90,
          marginBottom: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: COLORS.textMuted, fontSize: '14px' }}>
            <span style={{ color: COLORS.textPrimary, fontWeight: 500 }}>{activePage}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ position: 'relative' }}>
              <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: COLORS.textMuted }} size={16} />
              <input 
                type="text" 
                placeholder="Search documents..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '36px', width: '300px', backgroundColor: '#FFFFFF', border: 'none', borderRadius: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}
              />
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '6px 16px', backgroundColor: '#FFFFFF', borderRadius: '100px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', border: `1px solid ${COLORS.border}` }}>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '13px', fontWeight: 700, color: COLORS.textPrimary, lineHeight: 1 }}>{currentUser.name}</p>
                <p style={{ fontSize: '11px', color: COLORS.textMuted, marginTop: '2px' }}>{currentRole}</p>
              </div>
              <img src={currentUser.avatar} alt={currentUser.name} style={{ width: '32px', height: '32px', borderRadius: '50%', border: `2px solid ${COLORS.accentPrimary}20` }} />
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activePage === 'Dashboard' && (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Dashboard 
                stats={stats} 
                documents={documents} 
                user={currentUser} 
                onNewDocClick={() => setActivePage('Upload')} 
              />
            </motion.div>
          )}
          {activePage === 'My Documents' && (
            <motion.div 
              key="my-docs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <MyDocuments documents={documents} onNewDocClick={() => setActivePage('Upload')} />
            </motion.div>
          )}
          {activePage === 'Upload' && (
            <motion.div 
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <UploadWizard onComplete={(newDoc) => {
                setDocuments([newDoc, ...documents]);
                setActivePage('Dashboard');
              }} />
            </motion.div>
          )}
          {activePage === 'Review Queue' && (
            <motion.div 
              key="review-queue"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="glass" style={{ borderRadius: '16px', padding: '32px' }}>
                <h2 style={{ fontSize: '24px', marginBottom: '24px' }}>Review Queue</h2>
                <DataTable data={documents.filter(d => d.status === 'Under Review')} type="Pending" />
              </div>
            </motion.div>
          )}
          {activePage === 'Archive' && (
            <motion.div 
              key="archive"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="glass" style={{ borderRadius: '16px', padding: '32px' }}>
                <h2 style={{ fontSize: '24px', marginBottom: '24px' }}>Document Archive</h2>
                <DataTable data={documents.filter(d => d.status === 'Archived')} type="Approved" />
              </div>
            </motion.div>
          )}
          {activePage === 'Settings' && (
            <motion.div 
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="glass" style={{ borderRadius: '16px', padding: '40px', maxWidth: '600px' }}>
                <h2 style={{ fontSize: '24px', marginBottom: '32px' }}>Settings</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontWeight: 600 }}>Email Notifications</p>
                      <p style={{ fontSize: '13px', color: COLORS.textMuted }}>Receive updates via email</p>
                    </div>
                    <input type="checkbox" defaultChecked style={{ width: '40px', height: '20px' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontWeight: 600 }}>Auto-Archive</p>
                      <p style={{ fontSize: '13px', color: COLORS.textMuted }}>Archive documents after 1 year</p>
                    </div>
                    <input type="checkbox" style={{ width: '40px', height: '20px' }} />
                  </div>
                  <button style={{ backgroundColor: COLORS.accentPrimary, color: COLORS.bgBase, border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>Save Changes</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Notification Drawer */}
      <NotificationDrawer 
        isOpen={isNotifOpen} 
        onClose={() => setIsNotifOpen(false)} 
        notifications={notifications}
        setNotifications={setNotifications}
      />

      {/* Help Button */}
      <HelpButton role={currentRole} />
    </div>
  );
}

// --- SUB-PAGES ---

function Dashboard({ stats, documents, user, onNewDocClick }: { stats: any, documents: Document[], user: any, onNewDocClick: () => void }) {
  const [activeTab, setActiveTab] = useState('Pending');

  const filteredDocs = useMemo(() => {
    if (activeTab === 'Pending') return documents.filter(d => d.status === 'Under Review');
    if (activeTab === 'Approved') return documents.filter(d => d.status === 'Published');
    return documents.filter(d => d.status === 'Retracted');
  }, [activeTab, documents]);

  const totalDocs = stats.pending + stats.approved + stats.retracted;
  const approvalRate = totalDocs > 0 ? Math.round((stats.approved / totalDocs) * 100) : 0;

  const pieData = [
    { name: 'Pending Approval', value: stats.pending, color: '#7F77DD' },
    { name: 'Approved', value: stats.approved, color: '#1D9E75' },
    { name: 'Retracted', value: stats.retracted, color: '#EF9F27' },
  ];

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '32px',
      position: 'relative'
    }}>
      {/* Subtle Background Pattern */}
      <div style={{ 
        position: 'absolute', 
        top: '-100px', 
        right: '-100px', 
        width: '600px', 
        height: '600px', 
        background: `radial-gradient(circle, ${COLORS.accentPrimary}05 0%, transparent 70%)`, 
        pointerEvents: 'none',
        zIndex: -1
      }} />
      <div style={{ 
        position: 'absolute', 
        bottom: '-100px', 
        left: '-100px', 
        width: '500px', 
        height: '500px', 
        background: `radial-gradient(circle, ${COLORS.accentSecondary}05 0%, transparent 70%)`, 
        pointerEvents: 'none',
        zIndex: -1
      }} />

      {/* Welcome Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: COLORS.textPrimary, marginBottom: '4px' }}>Welcome back, {user.name}</h2>
          <p style={{ color: COLORS.textMuted, fontSize: '15px' }}>Here's what's happening with your documents today.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            padding: '10px 20px', 
            backgroundColor: '#FFFFFF', 
            border: `1px solid ${COLORS.border}`, 
            borderRadius: '12px', 
            fontSize: '14px', 
            fontWeight: 600, 
            color: COLORS.textPrimary,
            cursor: 'pointer'
          }}>
            <Calendar size={18} />
            Mar 25, 2026
          </button>
          <button 
            onClick={onNewDocClick}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              padding: '10px 20px', 
              backgroundColor: COLORS.accentPrimary, 
              border: 'none', 
              borderRadius: '12px', 
              fontSize: '14px', 
              fontWeight: 600, 
              color: '#FFFFFF',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(255, 107, 107, 0.2)'
            }}
          >
            <Plus size={18} />
            New Document
          </button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
        {/* Pie Chart Section */}
        <div className="glass" style={{ gridColumn: 'span 12', padding: '24px', borderRadius: '24px', backgroundColor: '#FFFFFF', border: `1px solid ${COLORS.border}`, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: COLORS.textPrimary }}>Document Status Overview</h3>
              <p style={{ fontSize: '13px', color: COLORS.textMuted }}>Real-time distribution of processing states</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: '40px', flexWrap: 'wrap' }}>
            {/* Chart Column */}
            <div style={{ flex: '1', minWidth: '300px', display: 'flex', justifyContent: 'center' }}>
              <div style={{ height: '300px', width: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <defs>
                      <radialGradient id="gradPending" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="30%" stopColor="#7F77DD" stopOpacity={1} />
                        <stop offset="100%" stopColor="#D4537E" stopOpacity={1} />
                      </radialGradient>
                      <radialGradient id="gradApproved" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="30%" stopColor="#1D9E75" stopOpacity={1} />
                        <stop offset="100%" stopColor="#378ADD" stopOpacity={1} />
                      </radialGradient>
                      <radialGradient id="gradRetracted" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="30%" stopColor="#EF9F27" stopOpacity={1} />
                        <stop offset="100%" stopColor="#D85A30" stopOpacity={1} />
                      </radialGradient>
                    </defs>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={0}
                      outerRadius={120}
                      paddingAngle={2}
                      dataKey="value"
                      stroke="#FFFFFF"
                      strokeWidth={2}
                    >
                      <Cell fill="url(#gradPending)" />
                      <Cell fill="url(#gradApproved)" />
                      <Cell fill="url(#gradRetracted)" />
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        borderRadius: '12px', 
                        border: 'none', 
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                        fontSize: '13px'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Stats Column */}
            <div style={{ flex: '1', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', minWidth: '300px' }}>
              {/* Summary Cards */}
              <div style={{ gridColumn: 'span 2', display: 'flex', gap: '16px', marginBottom: '8px' }}>
                <div style={{ flex: 1, padding: '16px', backgroundColor: `${COLORS.accentSecondary}08`, borderRadius: '16px', border: `1px solid ${COLORS.accentSecondary}20` }}>
                  <p style={{ fontSize: '11px', color: COLORS.accentSecondary, fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Total Documents</p>
                  <p style={{ fontSize: '24px', fontWeight: 800, color: COLORS.textPrimary }}>{totalDocs}</p>
                </div>
              </div>

              {/* Status Breakdown */}
              {pieData.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', backgroundColor: COLORS.bgBase, borderRadius: '12px', border: `1px solid ${COLORS.border}` }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: item.color }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '11px', color: COLORS.textMuted, fontWeight: 500 }}>{item.name}</p>
                    <p style={{ fontSize: '16px', fontWeight: 700, color: COLORS.textPrimary }}>{item.value}</p>
                  </div>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: COLORS.textMuted }}>
                    {totalDocs > 0 ? Math.round((item.value / totalDocs) * 100) : 0}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Document Table Section */}
        <div className="glass" style={{ gridColumn: 'span 12', borderRadius: '24px', overflow: 'hidden', backgroundColor: '#FFFFFF', border: `1px solid ${COLORS.border}` }}>
          <div style={{ padding: '20px 24px', borderBottom: `1px solid ${COLORS.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '32px' }}>
              {['Pending', 'Approved', 'Retracted'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: activeTab === tab ? COLORS.accentSecondary : COLORS.textMuted,
                    fontWeight: 600,
                    fontSize: '14px',
                    cursor: 'pointer',
                    padding: '8px 0',
                    position: 'relative'
                  }}
                >
                  {tab} Items
                  {activeTab === tab && (
                    <motion.div layoutId="tabUnderline" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: COLORS.accentGradient, borderRadius: '3px 3px 0 0' }} />
                  )}
                </button>
              ))}
            </div>
            <button style={{ color: COLORS.accentSecondary, fontSize: '13px', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
              View All <ChevronRight size={16} />
            </button>
          </div>
          
          <div style={{ padding: '24px' }}>
            <DataTable 
              data={filteredDocs} 
              type={activeTab as any}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function MyDocuments({ documents, onNewDocClick }: { documents: Document[], onNewDocClick: () => void }) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeFilter, setActiveFilter] = useState('Published');
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  const filteredDocs = documents.filter(d => {
    if (activeFilter === 'Editable') return d.status === 'Draft';
    if (activeFilter === 'Published') return d.status === 'Published';
    return d.status === 'Archived';
  });

  return (
    <div style={{ display: 'flex', gap: '32px' }}>
      <div style={{ width: '240px', flexShrink: 0 }}>
        <FolderTree onSelect={setSelectedFolder} />
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', backgroundColor: COLORS.bgBase, padding: '4px', borderRadius: '8px', border: `1px solid ${COLORS.border}` }}>
            {['Editable', 'Published', 'Archive'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                style={{
                  padding: '6px 16px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: activeFilter === tab ? COLORS.bgCard : 'transparent',
                  color: activeFilter === tab ? COLORS.accentSecondary : COLORS.textMuted,
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ display: 'flex', backgroundColor: COLORS.bgBase, borderRadius: '8px', overflow: 'hidden', border: `1px solid ${COLORS.border}` }}>
              <button 
                onClick={() => setViewMode('grid')}
                style={{ padding: '8px', background: viewMode === 'grid' ? COLORS.bgCard : 'transparent', border: 'none', color: viewMode === 'grid' ? COLORS.accentSecondary : COLORS.textMuted, cursor: 'pointer' }}
              >
                <Grid size={18} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                style={{ padding: '8px', background: viewMode === 'list' ? COLORS.bgCard : 'transparent', border: 'none', color: viewMode === 'list' ? COLORS.accentSecondary : COLORS.textMuted, cursor: 'pointer' }}
              >
                <List size={18} />
              </button>
            </div>
            <button 
              onClick={onNewDocClick}
              style={{ 
                backgroundColor: COLORS.accentSecondary, 
                color: COLORS.bgBase, 
                border: 'none', 
                borderRadius: '8px', 
                padding: '0 16px', 
                fontWeight: 600, 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                cursor: 'pointer'
              }}
            >
              <Plus size={18} /> New Doc
            </button>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {filteredDocs.map(doc => <DocumentCard key={doc.id} doc={doc} />)}
          </div>
        ) : (
          <div className="glass" style={{ borderRadius: '12px', padding: '12px' }}>
            <DataTable data={filteredDocs} type="List" />
          </div>
        )}
      </div>
    </div>
  );
}

// --- UI COMPONENTS ---

function StatCard({ label, value, color, icon: Icon, isPrimary }: any) {
  return (
    <div className="card-hover" style={{ 
      padding: '24px', 
      borderRadius: '24px', 
      backgroundColor: '#FFFFFF',
      border: `1px solid ${COLORS.border}`,
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '140px',
      cursor: 'default',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
      }}>
        <div style={{ 
          width: '44px', 
          height: '44px', 
          borderRadius: '12px', 
          background: isPrimary ? COLORS.accentGradient : `${color}10`, 
          display: 'grid', 
          placeItems: 'center',
          color: isPrimary ? '#FFFFFF' : color,
        }}>
          <Icon size={22} />
        </div>
        <div style={{ 
          padding: '4px 8px', 
          borderRadius: '20px', 
          backgroundColor: isPrimary ? 'rgba(255, 107, 107, 0.1)' : `${color}10`,
          color: isPrimary ? COLORS.accentPrimary : color,
          fontSize: '10px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          Active
        </div>
      </div>
      
      <div>
        <h3 style={{ fontSize: '28px', fontWeight: 800, fontFamily: 'Outfit', color: COLORS.textPrimary, letterSpacing: '-1px', marginBottom: '2px' }}>{value}</h3>
        <p style={{ fontSize: '13px', color: COLORS.textMuted, fontWeight: 600 }}>{label}</p>
      </div>

      <div style={{ 
        position: 'absolute', 
        bottom: '-15px', 
        right: '-15px', 
        opacity: 0.04,
        transform: 'rotate(-15deg)'
      }}>
        <Icon size={90} color={color} />
      </div>
    </div>
  );
}

function DataTable({ data, type }: { data: Document[], type: 'Pending' | 'Approved' | 'Retracted' | 'List' }) {
  const [sortKey, setSortKey] = useState<keyof Document>('title');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      const valA = a[sortKey] || '';
      const valB = b[sortKey] || '';
      if (valA < valB) return sortDir === 'asc' ? -1 : 1;
      if (valA > valB) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortKey, sortDir]);

  const paginatedData = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleSort = (key: keyof Document) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${COLORS.border}` }}>
              {[
                { label: 'Title', key: 'title' },
                { label: 'Version', key: 'version' },
                { label: 'Category', key: 'category' },
                ...(type === 'Pending' ? [{ label: 'Submitted By', key: 'submittedBy' }] : []),
                { label: 'Date', key: 'submittedDate' },
                ...(type === 'Pending' ? [{ label: 'Priority', key: 'priority' }] : []),
                { label: 'Action', key: null }
              ].map((col, i) => (
                <th 
                  key={i} 
                  onClick={() => col.key && handleSort(col.key as keyof Document)}
                  style={{ 
                    padding: '12px 16px', 
                    color: COLORS.textMuted, 
                    fontSize: '12px', 
                    fontWeight: 600, 
                    textTransform: 'uppercase',
                    cursor: col.key ? 'pointer' : 'default',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {col.label}
                    {col.key === sortKey && (sortDir === 'asc' ? <ChevronDown size={12} /> : <ChevronDown size={12} style={{ transform: 'rotate(180deg)' }} />)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((doc, i) => (
              <tr key={doc.id} className="table-row" style={{ 
                borderBottom: `1px solid ${COLORS.border}`,
                backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)'
              }}>
                <td style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <FileIcon type={doc.type} />
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: 600 }}>{doc.title}</p>
                      <p style={{ fontSize: '12px', color: COLORS.textMuted }}>{doc.docNumber}</p>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '16px' }}>
                  <span style={{ fontSize: '12px', backgroundColor: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '4px' }}>v{doc.version}</span>
                </td>
                <td style={{ padding: '16px', fontSize: '14px' }}>{doc.category}</td>
                {(type === 'Pending') && (
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: COLORS.bgCard, display: 'grid', placeItems: 'center', fontSize: '10px' }}>
                        {doc.submittedBy?.charAt(0)}
                      </div>
                      <span style={{ fontSize: '13px' }}>{doc.submittedBy}</span>
                    </div>
                  </td>
                )}
                <td style={{ padding: '16px', fontSize: '13px', color: COLORS.textMuted }}>
                  {type === 'Pending' ? doc.submittedDate : (type === 'Approved' ? doc.approvalDate : doc.retractionDate)}
                </td>
                {type === 'Pending' && (
                  <td style={{ padding: '16px' }}>
                    <PriorityBadge priority={doc.priority} />
                  </td>
                )}
                <td style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {type === 'Pending' ? (
                      <>
                        <button style={{ background: 'none', border: `1px solid ${COLORS.accentSecondary}`, color: COLORS.accentSecondary, padding: '4px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}>Review</button>
                        <button style={{ background: 'none', border: `1px solid ${COLORS.accentDanger}`, color: COLORS.accentDanger, padding: '4px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer' }}>Retract</button>
                      </>
                    ) : (
                      <>
                        <IconButton icon={Eye} size={16} />
                        <IconButton icon={Download} size={16} />
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                border: 'none',
                backgroundColor: currentPage === i + 1 ? COLORS.accentSecondary : COLORS.bgSurface,
                color: currentPage === i + 1 ? COLORS.bgBase : COLORS.textMuted,
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const DocumentCard: React.FC<{ doc: Document }> = ({ doc }) => {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass card-hover" 
      style={{ padding: '20px', borderRadius: '16px', position: 'relative' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <FileIcon type={doc.type} size={32} />
        <StatusBadge status={doc.status} />
      </div>
      <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{doc.title}</h4>
      <p style={{ fontSize: '12px', color: COLORS.textMuted, marginBottom: '16px' }}>{doc.docNumber} • v{doc.version}</p>
      
      {doc.status !== 'Published' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
          <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: COLORS.bgSurface, display: 'grid', placeItems: 'center', fontSize: '10px' }}>
            {doc.owner.charAt(0)}
          </div>
          <span style={{ fontSize: '12px', color: COLORS.textMuted }}>{doc.owner}</span>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${COLORS.border}`, paddingTop: '16px' }}>
        <span style={{ fontSize: '11px', color: COLORS.textMuted }}>{doc.modifiedDate}</span>
        <div style={{ display: 'flex', gap: '4px' }}>
          {doc.status !== 'Published' && <IconButton icon={Edit3} size={14} />}
          <IconButton icon={Download} size={14} />
          <IconButton icon={Share2} size={14} />
        </div>
      </div>
    </motion.div>
  );
}

function FileIcon({ type, size = 24 }: { type: string, size?: number }) {
  const config: any = {
    Policy: { icon: FileText, color: COLORS.accentDanger },
    Procedure: { icon: FileText, color: COLORS.accentSecondary },
    'Work Instruction': { icon: FileText, color: COLORS.accentPrimary },
    Form: { icon: FileSpreadsheet, color: COLORS.accentSuccess },
    Template: { icon: FilePieChart, color: COLORS.accentSecondary },
    Report: { icon: FilePieChart, color: COLORS.accentPrimary },
  };
  const { icon: Icon, color } = config[type] || { icon: FileText, color: COLORS.textMuted };
  return <Icon size={size} style={{ color }} />;
}

function FolderTree({ onSelect }: { onSelect: (id: string) => void }) {
  const folders = [
    { id: 'hr', name: 'HR', children: [{ id: 'hr-rec', name: 'Recruitment' }, { id: 'hr-pol', name: 'Policies' }] },
    { id: 'fin', name: 'Finance', children: [{ id: 'fin-aud', name: 'Audit' }, { id: 'fin-exp', name: 'Expenses' }] },
    { id: 'it', name: 'IT', children: [{ id: 'it-sec', name: 'Security' }, { id: 'it-inf', name: 'Infrastructure' }] },
    { id: 'ops', name: 'Operations', children: [] },
  ];

  const [expanded, setExpanded] = useState<string[]>(['hr', 'fin', 'it']);

  const toggle = (id: string) => {
    setExpanded(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      <p style={{ fontSize: '11px', fontWeight: 700, color: COLORS.textMuted, textTransform: 'uppercase', marginBottom: '8px', paddingLeft: '8px' }}>Folders</p>
      {folders.map(folder => (
        <div key={folder.id}>
          <button 
            onClick={() => toggle(folder.id)}
            style={{ 
              width: '100%', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              padding: '8px', 
              background: 'none', 
              border: 'none', 
              color: COLORS.textPrimary, 
              cursor: 'pointer',
              fontSize: '14px',
              borderRadius: '6px'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            {folder.children.length > 0 ? (
              expanded.includes(folder.id) ? <ChevronDown size={14} /> : <ChevronRight size={14} />
            ) : <div style={{ width: '14px' }} />}
            <span style={{ fontWeight: 500 }}>{folder.name}</span>
          </button>
          
          <AnimatePresence>
            {expanded.includes(folder.id) && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                style={{ overflow: 'hidden', paddingLeft: '24px' }}
              >
                {folder.children.map(child => (
                  <button 
                    key={child.id}
                    onClick={() => onSelect(child.id)}
                    style={{ 
                      width: '100%', 
                      textAlign: 'left', 
                      padding: '6px 8px', 
                      background: 'none', 
                      border: 'none', 
                      color: COLORS.textMuted, 
                      cursor: 'pointer',
                      fontSize: '13px',
                      borderRadius: '4px'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.accentSecondary)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.textMuted)}
                  >
                    {child.name}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

function UploadWizard({ onComplete }: { onComplete: (doc: Document) => void }) {
  const [step, setStep] = useState(1);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState<Partial<Document>>({
    title: '',
    type: DOC_TYPES[0],
    department: DEPARTMENTS[0],
    priority: 'Medium',
    description: '',
    version: '1.0',
    typeOfDocument: DOC_TYPES[0],
    typeOfSubDocument: SUB_DOC_TYPES[0],
    departmentName: DEPARTMENTS[0],
    subDepartment: SUB_DEPARTMENTS[0],
    documentCategory: CATEGORIES[0],
    internalStakeholderSME: [],
    language: LANGUAGES[0],
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, title: file.name.split('.')[0] }));
      setStep(2);
    }
  };

  const handleBrowseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, title: file.name.split('.')[0] }));
      setStep(2);
    }
  };

  // Pre-populated fields
  const documentTypeCode = useMemo(() => {
    const typePrefix = (formData.typeOfDocument || 'POL').substring(0, 3).toUpperCase();
    const deptPrefix = (formData.departmentName || 'HR').substring(0, 3).toUpperCase();
    return `${typePrefix}-${deptPrefix}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
  }, [formData.typeOfDocument, formData.departmentName]);

  const departmentId = useMemo(() => {
    return `DEPT-${(formData.departmentName || 'HR').toUpperCase()}`;
  }, [formData.departmentName]);

  const nextReviewBy = useMemo(() => {
    return '14 days';
  }, []);

  const [isConfirmed, setIsConfirmed] = useState(false);

  const steps = [
    { id: 1, label: 'Source', icon: UploadCloud },
    { id: 2, label: 'Metadata', icon: FileText },
    { id: 3, label: 'Finalize', icon: CheckCircle2 },
  ];

  const handleSubmit = () => {
    const newDoc: Document = {
      id: Math.random().toString(36).substr(2, 9),
      title: formData.title || 'Untitled Document',
      docNumber: `DOC-2024-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      version: formData.version || '1.0',
      type: formData.typeOfDocument as any,
      department: formData.departmentName as any,
      category: formData.documentCategory || 'General',
      status: 'Under Review',
      priority: formData.priority as any,
      owner: 'Alex Rivera',
      submittedBy: 'Alex Rivera',
      submittedDate: new Date().toISOString().split('T')[0],
      modifiedDate: new Date().toISOString().split('T')[0],
      size: '2.4 MB',
      description: formData.description || '',
      typeOfDocument: formData.typeOfDocument || DOC_TYPES[0],
      typeOfSubDocument: formData.typeOfSubDocument || SUB_DOC_TYPES[0],
      documentTypeCode: documentTypeCode,
      departmentName: formData.departmentName || DEPARTMENTS[0],
      subDepartment: formData.subDepartment || SUB_DEPARTMENTS[0],
      departmentId: departmentId,
      documentCategory: formData.documentCategory || CATEGORIES[0],
      internalStakeholderSME: formData.internalStakeholderSME || [],
      nextReviewBy: nextReviewBy,
      language: formData.language || LANGUAGES[0]
    };
    onComplete(newDoc);
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 0' }}>
      {/* Impressive Step Indicator */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '40px', marginBottom: '60px' }}>
        {steps.map((s, idx) => (
          <React.Fragment key={s.id}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', position: 'relative' }}>
              <motion.div 
                animate={{ 
                  backgroundColor: step >= s.id ? 'var(--accent-primary)' : 'rgba(255,255,255,0.05)',
                  scale: step === s.id ? 1.2 : 1,
                  boxShadow: step === s.id ? '0 0 30px rgba(139, 92, 246, 0.5)' : 'none'
                }}
                style={{ 
                  width: '56px', 
                  height: '56px', 
                  borderRadius: '18px', 
                  display: 'grid', 
                  placeItems: 'center',
                  color: step >= s.id ? 'white' : 'var(--text-muted)',
                  border: step === s.id ? '2px solid var(--accent-primary)' : '1px solid var(--border)',
                  zIndex: 2
                }}
              >
                <s.icon size={24} />
              </motion.div>
              <span style={{ 
                fontSize: '12px', 
                fontWeight: '700', 
                color: step >= s.id ? 'var(--text-primary)' : 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}>{s.label}</span>
            </div>
            {idx < steps.length - 1 && (
              <div style={{ width: '80px', height: '2px', background: step > s.id ? 'var(--accent-primary)' : 'var(--border)', marginTop: '-24px' }} />
            )}
          </React.Fragment>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass"
            style={{ padding: '80px 40px', borderRadius: '32px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}
          >
            <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
            
            <motion.div 
              onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              animate={{ 
                borderColor: dragActive ? 'var(--accent-primary)' : 'var(--border)',
                backgroundColor: dragActive ? 'rgba(139, 92, 246, 0.05)' : 'transparent',
                scale: dragActive ? 1.02 : 1
              }}
              style={{ 
                border: '2px dashed var(--border)', 
                borderRadius: '24px', 
                padding: '80px 40px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onClick={() => fileInputRef.current?.click()}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                style={{ display: 'none' }} 
                onChange={handleFileChange}
                accept=".pdf,.docx,.xlsx,image/*"
              />
              <div style={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '24px', 
                background: 'rgba(139, 92, 246, 0.1)', 
                color: 'var(--accent-primary)',
                display: 'grid',
                placeItems: 'center',
                margin: '0 auto 24px'
              }}>
                <UploadCloud size={40} />
              </div>
              <h2 style={{ fontSize: '28px', marginBottom: '12px', fontWeight: 800 }}>Drop your documents here</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '40px', maxWidth: '400px', margin: '0 auto 40px', fontSize: '16px' }}>
                Support for PDF, DOCX, XLSX and high-resolution images. Max file size 50MB.
              </p>
              <button 
                onClick={handleBrowseClick}
                className="btn-ripple glow-primary" 
                style={{ 
                  background: 'var(--accent-primary)', 
                  color: 'white', 
                  border: 'none', 
                  padding: '16px 48px', 
                  borderRadius: '16px', 
                  fontWeight: '700',
                  fontSize: '16px'
                }}
              >
                Browse Files
              </button>
            </motion.div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            className="glass"
            style={{ padding: '48px', borderRadius: '32px' }}
          >
            <h2 style={{ fontSize: '28px', marginBottom: '40px', fontWeight: 800, textAlign: 'center' }}>Document Metadata</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
              {/* Row 2 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-muted)' }}>Type of Document*</label>
                <select value={formData.typeOfDocument} onChange={e => setFormData({...formData, typeOfDocument: e.target.value})}>
                  {DOC_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-muted)' }}>Type of Sub Document*</label>
                <select value={formData.typeOfSubDocument} onChange={e => setFormData({...formData, typeOfSubDocument: e.target.value})}>
                  {SUB_DOC_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              {/* Row 3 - Pre-populated */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-muted)' }}>Document Type Code (Auto)</label>
                <input type="text" readOnly value={documentTypeCode} style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-muted)' }}>Department Name*</label>
                <select value={formData.departmentName} onChange={e => setFormData({...formData, departmentName: e.target.value})}>
                  {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              {/* Row 4 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-muted)' }}>Sub Department*</label>
                <select value={formData.subDepartment} onChange={e => setFormData({...formData, subDepartment: e.target.value})}>
                  {SUB_DEPARTMENTS.map(sd => <option key={sd} value={sd}>{sd}</option>)}
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-muted)' }}>Department ID (Auto)</label>
                <input type="text" readOnly value={departmentId} style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)' }} />
              </div>

              {/* Row 5 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-muted)' }}>Document Category*</label>
                <select value={formData.documentCategory} onChange={e => setFormData({...formData, documentCategory: e.target.value})}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-muted)' }}>Language*</label>
                <select value={formData.language} onChange={e => setFormData({...formData, language: e.target.value})}>
                  {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>

              {/* Row 6 - Multiple Choice */}
              <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-muted)' }}>Partners*</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {STAKEHOLDERS.map(s => (
                    <button
                      key={s}
                      onClick={() => {
                        const current = formData.internalStakeholderSME || [];
                        const next = current.includes(s)
                          ? current.filter(x => x !== s)
                          : [...current, s];
                        setFormData({...formData, internalStakeholderSME: next});
                      }}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        border: `1px solid ${(formData.internalStakeholderSME || []).includes(s) ? 'var(--accent-primary)' : 'var(--border)'}`,
                        backgroundColor: (formData.internalStakeholderSME || []).includes(s) ? 'rgba(139, 92, 246, 0.1)' : 'transparent',
                        color: (formData.internalStakeholderSME || []).includes(s) ? 'var(--accent-primary)' : 'var(--text-muted)',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 7 - Pre-populated */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-muted)' }}>Retention (Expire)</label>
                <input type="text" readOnly value={nextReviewBy} style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-muted)' }}>Priority*</label>
                <select value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value as any})}>
                  {['High', 'Medium', 'Low'].map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>

              {/* Row 8 - Description */}
              <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-muted)' }}>Description (Single line of text)</label>
                <input type="text" placeholder="Briefly describe the document's purpose..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '48px' }}>
              <button onClick={() => setStep(1)} style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-primary)', padding: '14px 32px', borderRadius: '14px', fontWeight: '600' }}>Back</button>
              <button onClick={() => setStep(3)} className="glow-primary" style={{ background: 'var(--accent-primary)', border: 'none', color: 'white', padding: '14px 48px', borderRadius: '14px', fontWeight: '700' }}>Continue</button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div 
            key="step3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass"
            style={{ padding: '80px 40px', borderRadius: '32px', textAlign: 'center' }}
          >
            <div style={{ 
              width: '120px', 
              height: '120px', 
              borderRadius: '50%', 
              background: 'rgba(16, 185, 129, 0.1)', 
              color: 'var(--accent-success)',
              display: 'grid',
              placeItems: 'center',
              margin: '0 auto 40px',
              border: '2px solid rgba(16, 185, 129, 0.2)'
            }}>
              <CheckCircle2 size={72} />
            </div>
            <h2 style={{ fontSize: '32px', marginBottom: '16px', fontWeight: 800 }}>Ready to Submit?</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '48px', maxWidth: '500px', margin: '0 auto 48px', fontSize: '18px' }}>
              Your document "{formData.title || 'Untitled'}" has been processed. Submitting will initiate the approval workflow.
            </p>
            
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '32px', borderRadius: '24px', border: '1px solid var(--border)', marginBottom: '48px', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <input type="checkbox" id="confirm" checked={isConfirmed} onChange={e => setIsConfirmed(e.target.checked)} style={{ width: '24px', height: '24px', cursor: 'pointer' }} />
                <label htmlFor="confirm" style={{ fontSize: '15px', color: 'var(--text-muted)', cursor: 'pointer', lineHeight: 1.5 }}>
                  I confirm that this document complies with all enterprise security policies and is ready for official review.
                </label>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
              <button onClick={() => setStep(2)} style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-primary)', padding: '16px 40px', borderRadius: '16px', fontWeight: '600' }}>Review Again</button>
              <button 
                onClick={handleSubmit} 
                disabled={!isConfirmed}
                className={isConfirmed ? 'glow-success' : ''}
                style={{ 
                  background: isConfirmed ? 'var(--accent-success)' : 'var(--bg-card)', 
                  border: 'none', 
                  color: isConfirmed ? 'white' : 'var(--text-muted)', 
                  padding: '16px 64px', 
                  borderRadius: '16px', 
                  fontWeight: '800',
                  fontSize: '16px',
                  cursor: isConfirmed ? 'pointer' : 'not-allowed',
                  transition: 'all 0.3s ease'
                }}
              >
                Submit for Approval
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function RoleSwitcher({ currentRole, setRole }: { currentRole: Role, setRole: (r: Role) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const roles: Role[] = ['Owner', 'Controller', 'SME'];

  return (
    <div style={{ position: 'relative' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          width: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          padding: '10px 12px', 
          backgroundColor: COLORS.bgCard, 
          border: `1px solid ${COLORS.border}`, 
          borderRadius: '8px', 
          color: COLORS.textPrimary, 
          cursor: 'pointer' 
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <User size={16} />
          <span style={{ fontSize: '13px', fontWeight: 600 }}>Switch Role</span>
        </div>
        <ChevronDown size={14} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            style={{ 
              position: 'absolute', 
              bottom: '100%', 
              left: 0, 
              right: 0, 
              marginBottom: '8px', 
              backgroundColor: COLORS.bgCard, 
              border: `1px solid ${COLORS.border}`, 
              borderRadius: '8px', 
              overflow: 'hidden',
              boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
              zIndex: 110
            }}
          >
            {roles.map(role => (
              <button
                key={role}
                onClick={() => {
                  setRole(role);
                  setIsOpen(false);
                }}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  textAlign: 'left',
                  background: currentRole === role ? 'rgba(139, 92, 246, 0.1)' : 'none',
                  border: 'none',
                  color: currentRole === role ? COLORS.accentPrimary : COLORS.textPrimary,
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer'
                }}
              >
                {role}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NotificationDrawer({ isOpen, onClose, notifications, setNotifications }: any) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.2)', zIndex: 200, backdropFilter: 'blur(4px)' }}
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{ 
              position: 'fixed', 
              top: 0, 
              right: 0, 
              bottom: 0, 
              width: '360px', 
              backgroundColor: COLORS.bgSurface, 
              borderLeft: `1px solid ${COLORS.border}`, 
              zIndex: 201,
              padding: '32px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '20px' }}>Notifications</h2>
              <IconButton icon={X} onClick={onClose} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {notifications.map((n: any) => (
                <div key={n.id} style={{ 
                  padding: '16px', 
                  borderRadius: '12px', 
                  backgroundColor: n.read ? 'transparent' : 'rgba(79, 70, 229, 0.04)',
                  border: `1px solid ${n.read ? COLORS.border : `${COLORS.accentPrimary}20`}`,
                  position: 'relative'
                }}>
                  {!n.read && <div style={{ position: 'absolute', top: '16px', right: '16px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: COLORS.accentPrimary }} />}
                  <p style={{ fontSize: '14px', marginBottom: '8px', paddingRight: '12px' }}>{n.message}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: COLORS.textMuted }}>{n.time}</span>
                    {!n.read && (
                      <button 
                        onClick={() => setNotifications(notifications.map((notif: any) => notif.id === n.id ? { ...notif, read: true } : notif))}
                        style={{ background: 'none', border: 'none', color: COLORS.accentSecondary, fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
                      >
                        Mark as read
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function HelpButton({ role }: { role: Role }) {
  const [showTooltip, setShowTooltip] = useState(false);
  
  const tooltips = {
    Owner: "As an Owner, you can upload new documents and track their approval progress.",
    Controller: "As a Controller, you review submitted documents and can Approve or Retract them.",
    SME: "As an SME, you provide expert feedback and comments on documents in review."
  };

  return (
    <div style={{ position: 'fixed', bottom: '32px', right: '32px', zIndex: 150 }}>
      <AnimatePresence>
        {showTooltip && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            style={{ 
              position: 'absolute', 
              bottom: '60px', 
              right: 0, 
              width: '240px', 
              padding: '16px', 
              backgroundColor: COLORS.bgSurface, 
              border: `1px solid ${COLORS.border}`, 
              borderRadius: '12px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
              fontSize: '13px',
              lineHeight: 1.5
            }}
          >
            <p style={{ fontWeight: 700, color: COLORS.accentPrimary, marginBottom: '4px' }}>{role} Role</p>
            {tooltips[role]}
          </motion.div>
        )}
      </AnimatePresence>
      <button 
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        style={{ 
          width: '48px', 
          height: '48px', 
          borderRadius: '50%', 
          backgroundColor: COLORS.bgSurface, 
          border: `1px solid ${COLORS.border}`, 
          color: COLORS.accentPrimary, 
          display: 'grid', 
          placeItems: 'center', 
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)'
        }}
      >
        <HelpCircle size={24} />
      </button>
    </div>
  );
}
