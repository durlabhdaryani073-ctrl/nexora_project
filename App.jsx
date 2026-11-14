import React, { useState, useEffect, useMemo, useRef, createContext, useContext } from 'react';
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
  useParams,
  Link
} from 'react-router-dom';
import {
  LayoutDashboard,
  Compass,
  Building2,
  Briefcase,
  ShieldCheck,
  Users,
  Layers,
  MapPin,
  MessageSquare,
  Bell,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  Search,
  Plus,
  Filter,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Check,
  X,
  AlertCircle,
  CheckCircle2,
  Clock,
  Star,
  Bookmark,
  Eye,
  Edit3,
  Trash2,
  Send,
  Upload,
  Download,
  Phone,
  Mail,
  Globe,
  Menu,
  SlidersHorizontal,
  ArrowUpRight,
  Activity,
  Lock,
  Smartphone,
  UserCheck,
  UserX,
  RefreshCw,
  FolderKanban,
  Navigation,
  ExternalLink,
  Copy,
  KeyRound,
  MoreHorizontal
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

/* ============================================================================
   1. EMBEDDED ENTERPRISE DESIGN SYSTEM STYLES
   ============================================================================ */

const NEXORA_STYLES = `
  :root {
    --nx-bg: #f8fafc;
    --nx-surface: #ffffff;
    --nx-surface-subtle: #f1f5f9;
    --nx-border: #e2e8f0;
    --nx-border-strong: #cbd5e1;
    --nx-text: #0f172a;
    --nx-text-secondary: #334155;
    --nx-text-muted: #64748b;
    --nx-accent: #4338ca;
    --nx-accent-hover: #3730a3;
    --nx-accent-soft: #eef2ff;
    --nx-accent-border: #c7d2fe;
    --nx-success: #15803d;
    --nx-success-bg: #f0fdf4;
    --nx-warning: #b45309;
    --nx-warning-bg: #fffbeb;
    --nx-danger: #b91c1c;
    --nx-danger-bg: #fef2f2;
    --nx-shadow-sm: 0 1px 2px rgba(15, 23, 42, 0.04);
    --nx-shadow-md: 0 4px 16px rgba(15, 23, 42, 0.06);
    --nx-radius-sm: 6px;
    --nx-radius-md: 10px;
    --nx-radius-lg: 14px;
    --nx-font-display: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    --nx-font-body: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    --nx-font-mono: 'JetBrains Mono', monospace;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    background: var(--nx-bg);
    color: var(--nx-text);
    font-family: var(--nx-font-body);
    font-size: 14px;
    line-height: 1.55;
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--nx-font-display);
    color: var(--nx-text);
    margin: 0;
    letter-spacing: -0.015em;
    text-wrap: balance;
  }

  button, input, select, textarea {
    font-family: inherit;
  }

  .nx-mono {
    font-family: var(--nx-font-mono);
    font-variant-numeric: tabular-nums;
  }

  .nx-tabular {
    font-variant-numeric: tabular-nums;
  }

  /* Focus accessibility */
  button:focus-visible, a:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible {
    outline: 2px solid var(--nx-accent);
    outline-offset: 2px;
  }

  /* Shell Layout */
  .nx-shell {
    display: flex;
    min-height: 100vh;
    background: var(--nx-bg);
  }

  .nx-sidebar {
    width: 264px;
    flex-shrink: 0;
    background: var(--nx-surface);
    border-right: 1px solid var(--nx-border);
    display: flex;
    flex-direction: column;
    position: sticky;
    top: 0;
    height: 100vh;
    z-index: 30;
  }

  .nx-sidebar-brand {
    padding: 20px 20px 16px;
    border-bottom: 1px solid var(--nx-border);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .nx-wordmark {
    font-family: var(--nx-font-display);
    font-weight: 800;
    font-size: 19px;
    letter-spacing: -0.03em;
    color: var(--nx-text);
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    white-space: nowrap;
  }

  .nx-brand-mark {
    width: 30px;
    height: 30px;
    border-radius: 8px;
    background: linear-gradient(135deg, #312e81 0%, #4f46e5 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: 800;
    font-size: 14px;
    flex-shrink: 0;
  }

  .nx-nav-scroll {
    flex: 1;
    overflow-y: auto;
    padding: 14px 12px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .nx-nav-group-label {
    font-size: 11px;
    font-weight: 600;
    color: var(--nx-text-muted);
    padding: 0 10px 6px;
    letter-spacing: 0.02em;
  }

  .nx-nav-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 9px 10px;
    border-radius: 8px;
    color: var(--nx-text-secondary);
    text-decoration: none;
    font-size: 13.5px;
    font-weight: 500;
    cursor: pointer;
    border: none;
    background: transparent;
    width: 100%;
    text-align: left;
    transition: background-color 140ms ease, color 140ms ease;
    white-space: nowrap;
  }

  .nx-nav-item:hover {
    background: var(--nx-surface-subtle);
    color: var(--nx-text);
  }

  .nx-nav-item.active {
    background: var(--nx-accent-soft);
    color: var(--nx-accent);
    font-weight: 600;
  }

  .nx-nav-item-left {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
  }

  .nx-nav-count {
    font-family: var(--nx-font-mono);
    font-size: 11px;
    color: var(--nx-text-muted);
    font-variant-numeric: tabular-nums;
  }

  .nx-main-wrap {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
  }

  .nx-topbar {
    height: 64px;
    background: var(--nx-surface);
    border-bottom: 1px solid var(--nx-border);
    padding: 0 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    position: sticky;
    top: 0;
    z-index: 20;
  }

  .nx-content {
    flex: 1;
    padding: 24px 28px 40px;
    max-width: 1440px;
    width: 100%;
    margin: 0 auto;
  }

  /* Cards & Surfaces (Single elevation, hairline border) */
  .nx-card {
    background: var(--nx-surface);
    border: 1px solid var(--nx-border);
    border-radius: var(--nx-radius-md);
    box-shadow: var(--nx-shadow-sm);
  }

  .nx-card-pad {
    padding: 20px;
  }

  .nx-section-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 16px;
    flex-wrap: wrap;
  }

  .nx-page-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 24px;
    flex-wrap: wrap;
  }

  .nx-page-title {
    font-size: 22px;
    font-weight: 700;
    color: var(--nx-text);
    line-height: 1.25;
  }

  .nx-page-subtitle {
    font-size: 13.5px;
    color: var(--nx-text-muted);
    margin-top: 4px;
  }

  /* Grids */
  .nx-grid-4 {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 16px;
  }

  .nx-grid-3 {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
  }

  .nx-grid-2 {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
  }

  .nx-grid-split {
    display: grid;
    grid-template-columns: 1.45fr 1fr;
    gap: 20px;
    align-items: start;
  }

  /* Buttons */
  .nx-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 8px 16px;
    min-height: 38px;
    border-radius: 8px;
    font-size: 13.5px;
    font-weight: 600;
    cursor: pointer;
    border: 1px solid transparent;
    transition: background-color 140ms ease, border-color 140ms ease, color 140ms ease, transform 100ms ease;
    white-space: nowrap;
    flex-shrink: 0;
    text-decoration: none;
  }

  .nx-btn:active {
    transform: translateY(1px);
  }

  .nx-btn-primary {
    background: var(--nx-accent);
    color: #ffffff;
  }
  .nx-btn-primary:hover {
    background: var(--nx-accent-hover);
  }

  .nx-btn-secondary {
    background: var(--nx-surface);
    color: var(--nx-text);
    border-color: var(--nx-border);
  }
  .nx-btn-secondary:hover {
    background: var(--nx-surface-subtle);
    border-color: var(--nx-border-strong);
  }

  .nx-btn-ghost {
    background: transparent;
    color: var(--nx-text-secondary);
  }
  .nx-btn-ghost:hover {
    background: var(--nx-surface-subtle);
    color: var(--nx-text);
  }

  .nx-btn-danger {
    background: var(--nx-danger);
    color: #ffffff;
  }
  .nx-btn-danger:hover {
    background: #991b1b;
  }

  .nx-btn-sm {
    min-height: 32px;
    padding: 5px 12px;
    font-size: 12.5px;
  }

  /* Form controls */
  .nx-label {
    display: block;
    font-size: 12.5px;
    font-weight: 600;
    color: var(--nx-text-secondary);
    margin-bottom: 6px;
  }

  .nx-input, .nx-select, .nx-textarea {
    width: 100%;
    padding: 9px 12px;
    font-size: 13.5px;
    color: var(--nx-text);
    background: var(--nx-surface);
    border: 1px solid var(--nx-border);
    border-radius: 8px;
    transition: border-color 140ms ease, box-shadow 140ms ease;
  }

  .nx-input:focus, .nx-select:focus, .nx-textarea:focus {
    outline: none;
    border-color: var(--nx-accent);
    box-shadow: 0 0 0 3px rgba(67, 56, 202, 0.12);
  }

  .nx-textarea {
    min-height: 92px;
    resize: vertical;
  }

  /* Segmented Control */
  .nx-segmented {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    padding: 3px;
    background: var(--nx-surface-subtle);
    border: 1px solid var(--nx-border);
    border-radius: 8px;
  }

  .nx-seg-btn {
    padding: 6px 12px;
    font-size: 12.5px;
    font-weight: 500;
    color: var(--nx-text-muted);
    background: transparent;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    white-space: nowrap;
    transition: background-color 140ms ease, color 140ms ease;
  }

  .nx-seg-btn.active {
    background: var(--nx-surface);
    color: var(--nx-text);
    font-weight: 600;
    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.06);
  }

  /* Data Table */
  .nx-table-wrap {
    width: 100%;
    overflow-x: auto;
  }

  .nx-table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
  }

  .nx-table th {
    padding: 11px 16px;
    font-size: 12px;
    font-weight: 600;
    color: var(--nx-text-muted);
    background: var(--nx-bg);
    border-bottom: 1px solid var(--nx-border);
    white-space: nowrap;
  }

  .nx-table td {
    padding: 12px 16px;
    font-size: 13.5px;
    color: var(--nx-text-secondary);
    border-bottom: 1px solid var(--nx-border);
    vertical-align: middle;
  }

  .nx-table tbody tr:hover {
    background: #f8fafc;
  }

  .nx-table tbody tr:last-child td {
    border-bottom: none;
  }

  /* Clean Inline Metadata */
  .nx-meta-line {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
    font-size: 12.5px;
    color: var(--nx-text-muted);
  }

  /* Semantic Status Text Indicator (no garish candy pills) */
  .nx-status {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 12px;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 5px;
    white-space: nowrap;
    border: 1px solid transparent;
  }
  .nx-status-success {
    color: var(--nx-success);
    background: var(--nx-success-bg);
    border-color: #bbf7d0;
  }
  .nx-status-warning {
    color: var(--nx-warning);
    background: var(--nx-warning-bg);
    border-color: #fde68a;
  }
  .nx-status-danger {
    color: var(--nx-danger);
    background: var(--nx-danger-bg);
    border-color: #fecaca;
  }
  .nx-status-info {
    color: var(--nx-accent);
    background: var(--nx-accent-soft);
    border-color: var(--nx-accent-border);
  }
  .nx-status-neutral {
    color: var(--nx-text-secondary);
    background: var(--nx-surface-subtle);
    border-color: var(--nx-border);
  }

  /* Modal & Drawer */
  .nx-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.45);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    z-index: 60;
  }

  .nx-modal {
    background: var(--nx-surface);
    border: 1px solid var(--nx-border);
    border-radius: var(--nx-radius-lg);
    box-shadow: 0 20px 50px rgba(15, 23, 42, 0.18);
    width: 100%;
    max-width: 540px;
    max-height: 90vh;
    overflow-y: auto;
  }

  /* Toast */
  .nx-toast-stack {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 80;
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 360px;
  }

  .nx-toast {
    background: #0f172a;
    color: #ffffff;
    padding: 12px 16px;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 500;
    box-shadow: 0 10px 25px rgba(15, 23, 42, 0.22);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  /* Responsive */
  .nx-mobile-menu-btn {
    display: none;
  }
  .nx-sidebar-overlay {
    display: none;
  }

  @media (max-width: 1200px) {
    .nx-grid-4 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .nx-grid-split {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 960px) {
    .nx-sidebar {
      position: fixed;
      left: 0;
      top: 0;
      transform: translateX(-100%);
      transition: transform 200ms ease;
    }
    .nx-sidebar.open {
      transform: translateX(0);
    }
    .nx-sidebar-overlay.open {
      display: block;
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.4);
      z-index: 25;
    }
    .nx-mobile-menu-btn {
      display: inline-flex;
    }
    .nx-grid-3 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .nx-topbar {
      padding: 0 16px;
    }
    .nx-content {
      padding: 16px 16px 32px;
    }
  }

  @media (max-width: 640px) {
    .nx-grid-4, .nx-grid-3, .nx-grid-2 {
      grid-template-columns: 1fr;
    }
  }
`;

/* ============================================================================
   2. DOMAIN ENUMS, POSTGRESQL / SUPABASE SCHEMA SPEC & INITIAL SEED DATA
   ============================================================================ */

const ROLES = {
  INDIVIDUAL: 'individual',
  ORGANISATION: 'organisation',
  SERVICE_PROVIDER: 'service_provider',
  ADMIN: 'admin'
};

const ROLE_LABELS = {
  [ROLES.INDIVIDUAL]: 'Individual User',
  [ROLES.ORGANISATION]: 'Organisation',
  [ROLES.SERVICE_PROVIDER]: 'Service Provider',
  [ROLES.ADMIN]: 'Platform Administrator'
};

const LISTING_STATUSES = ['Draft', 'Pending Approval', 'Approved', 'Rejected', 'Active', 'Inactive'];
const ENQUIRY_STATUSES = ['New', 'In Progress', 'Responded', 'Completed', 'Cancelled'];

// Relational PostgreSQL / Supabase-ready schema specification for client architecture review
const DB_SCHEMA_SPEC = [
  { table: 'users', primaryKey: 'id (uuid)', columns: ['email', 'mobile', 'full_name', 'role', 'verification_status', 'account_status', 'city', 'state', 'pin_code', 'created_at'] },
  { table: 'organisations', primaryKey: 'id (uuid)', columns: ['owner_user_id (fk)', 'legal_name', 'registration_no', 'org_type', 'verification_status', 'hq_city', 'hq_state', 'pin_code', 'created_at'] },
  { table: 'listings', primaryKey: 'id (uuid)', columns: ['owner_id (fk)', 'organisation_id (fk)', 'title', 'category_id (fk)', 'status', 'city', 'state', 'pin_code', 'lat', 'lng', 'views_count', 'created_at', 'updated_at'] },
  { table: 'enquiries', primaryKey: 'id (uuid)', columns: ['listing_id (fk)', 'sender_id (fk)', 'recipient_id (fk)', 'subject', 'status', 'priority', 'created_at', 'updated_at'] },
  { table: 'messages', primaryKey: 'id (uuid)', columns: ['conversation_id (uuid)', 'enquiry_id (fk)', 'sender_id (fk)', 'body', 'is_read', 'sent_at'] },
  { table: 'notifications', primaryKey: 'id (uuid)', columns: ['user_id (fk)', 'category', 'title', 'message', 'is_read', 'action_url', 'created_at'] },
  { table: 'activity_logs', primaryKey: 'id (uuid)', columns: ['actor_id (fk)', 'actor_role', 'action_type', 'entity_type', 'entity_id', 'summary', 'created_at'] }
];

const INITIAL_USERS = [
  {
    id: 'usr-ind-01',
    name: 'Aarav Mehta',
    email: 'aarav.mehta@enterprise-mail.in',
    mobile: '+91 98450 21490',
    role: ROLES.INDIVIDUAL,
    title: 'VP Digital Operations',
    city: 'Bengaluru',
    state: 'Karnataka',
    pinCode: '560001',
    address: '42 Residency Road, Ashok Nagar',
    verificationStatus: 'Verified',
    accountStatus: 'Active',
    profileCompletion: 92,
    bio: 'Procurement and operations lead evaluating enterprise infrastructure, logistics, and advisory partners across South India.',
    preferences: { emailAlerts: true, smsAlerts: true, twoFactor: true, weeklyDigest: false },
    createdAt: '2026-08-14'
  },
  {
    id: 'usr-org-01',
    name: 'Kavya Deshmukh',
    email: 'ops@vanguardurban.in',
    mobile: '+91 98201 77432',
    role: ROLES.ORGANISATION,
    organisationId: 'org-01',
    title: 'Director of Partnerships',
    city: 'Mumbai',
    state: 'Maharashtra',
    pinCode: '400001',
    address: 'Level 14, Maker Chambers VI, Nariman Point',
    verificationStatus: 'Verified',
    accountStatus: 'Active',
    profileCompletion: 96,
    bio: 'Leading commercial real estate and smart campus infrastructure initiatives for Vanguard Urban Systems.',
    preferences: { emailAlerts: true, smsAlerts: true, twoFactor: true, weeklyDigest: true },
    createdAt: '2026-07-02'
  },
  {
    id: 'usr-sp-01',
    name: 'Rohan Kulkarni',
    email: 'dispatch@meridianpartners.in',
    mobile: '+91 98230 55118',
    role: ROLES.SERVICE_PROVIDER,
    organisationId: 'org-02',
    title: 'Managing Principal',
    city: 'Pune',
    state: 'Maharashtra',
    pinCode: '411001',
    address: 'Suite 802, ICC Trade Tower, Senapati Bapat Road',
    verificationStatus: 'Verified',
    accountStatus: 'Active',
    profileCompletion: 94,
    serviceCategories: ['Cloud & IT Infrastructure', 'Cybersecurity & Compliance', 'Managed Facility Systems'],
    serviceLocations: ['Pune (411001)', 'Mumbai (400001)', 'Bengaluru (560001)', 'Hyderabad (500081)'],
    rating: 4.9,
    reviewCount: 47,
    bio: 'ISO 27001 certified enterprise cloud, network architecture, and smart facility systems integrator.',
    preferences: { emailAlerts: true, smsAlerts: false, twoFactor: true, weeklyDigest: true },
    createdAt: '2026-06-19'
  },
  {
    id: 'usr-adm-01',
    name: 'Priya Nair',
    email: 'priya.nair@nexora.io',
    mobile: '+91 98110 88204',
    role: ROLES.ADMIN,
    title: 'Platform Governance Lead',
    city: 'New Delhi',
    state: 'Delhi',
    pinCode: '110001',
    address: '18 Barakhamba Road, Connaught Place',
    verificationStatus: 'Verified',
    accountStatus: 'Active',
    profileCompletion: 100,
    bio: 'Centralised platform operations, trust & safety verification, and enterprise SLA governance.',
    preferences: { emailAlerts: true, smsAlerts: true, twoFactor: true, weeklyDigest: true },
    createdAt: '2026-05-01'
  },
  {
    id: 'usr-org-02',
    name: 'Siddharth Rao',
    email: 's.rao@helioslogistics.in',
    mobile: '+91 98490 61209',
    role: ROLES.ORGANISATION,
    organisationId: 'org-03',
    title: 'Head of Fleet & Warehousing',
    city: 'Hyderabad',
    state: 'Telangana',
    pinCode: '500081',
    address: 'Plot 19, HITEC City Phase II',
    verificationStatus: 'Pending',
    accountStatus: 'Active',
    profileCompletion: 78,
    bio: 'Cold-chain warehousing and regional distribution hubs across Telangana and Andhra Pradesh.',
    preferences: { emailAlerts: true, smsAlerts: false, twoFactor: false, weeklyDigest: true },
    createdAt: '2026-10-28'
  },
  {
    id: 'usr-sp-02',
    name: 'Ananya Chatterjee',
    email: 'ananya@veritasadvisory.in',
    mobile: '+91 98300 44190',
    role: ROLES.SERVICE_PROVIDER,
    title: 'Principal Legal & ESG Consultant',
    city: 'Kolkata',
    state: 'West Bengal',
    pinCode: '700001',
    address: '8 Netaji Subhas Road, BBD Bagh',
    verificationStatus: 'Verified',
    accountStatus: 'Active',
    profileCompletion: 89,
    serviceCategories: ['Legal & Regulatory Advisory', 'ESG & Sustainability Audits'],
    serviceLocations: ['Kolkata (700001)', 'New Delhi (110001)', 'Mumbai (400001)'],
    rating: 4.8,
    reviewCount: 31,
    bio: 'Enterprise compliance, corporate structuring, and ESG reporting advisory.',
    preferences: { emailAlerts: true, smsAlerts: false, twoFactor: true, weeklyDigest: true },
    createdAt: '2026-09-05'
  },
  {
    id: 'usr-ind-02',
    name: 'Vikramaditya Sen',
    email: 'vikram.sen@apexgroup.co.in',
    mobile: '+91 98104 33921',
    role: ROLES.INDIVIDUAL,
    title: 'Regional Facility Manager',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pinCode: '600002',
    address: '104 Anna Salai, Guindy',
    verificationStatus: 'Pending',
    accountStatus: 'Inactive',
    profileCompletion: 65,
    bio: 'Managing commercial office expansions across Chennai.',
    preferences: { emailAlerts: true, smsAlerts: false, twoFactor: false, weeklyDigest: false },
    createdAt: '2026-11-03'
  }
];

const INITIAL_ORGANISATIONS = [
  {
    id: 'org-01',
    name: 'Vanguard Urban Systems Pvt. Ltd.',
    registrationNo: 'CIN-U70109MH2021PTC364812',
    taxId: '27AAACV8841M1Z4',
    industry: 'Commercial Real Estate & Smart Campuses',
    website: 'https://vanguardurban.in',
    email: 'ops@vanguardurban.in',
    phone: '+91 22 6618 4900',
    city: 'Mumbai',
    state: 'Maharashtra',
    pinCode: '400001',
    address: 'Level 14, Maker Chambers VI, Nariman Point, Mumbai',
    verificationStatus: 'Verified',
    description: 'Enterprise-grade Grade-A workspaces, co-managed R&D campuses, and smart building operations across Western and Southern India.',
    members: [
      { id: 'mem-1', name: 'Kavya Deshmukh', email: 'ops@vanguardurban.in', role: 'Organisation Admin', status: 'Active' },
      { id: 'mem-2', name: 'Nikhil Patwardhan', email: 'nikhil.p@vanguardurban.in', role: 'Listing Manager', status: 'Active' },
      { id: 'mem-3', name: 'Meera Iyer', email: 'meera.i@vanguardurban.in', role: 'Compliance Analyst', status: 'Active' }
    ],
    documents: [
      { id: 'doc-1', name: 'Certificate_of_Incorporation_Vanguard.pdf', type: 'Incorporation', status: 'Verified', uploadedAt: '2026-07-03' },
      { id: 'doc-2', name: 'GST_Registration_27AAACV.pdf', type: 'Tax ID', status: 'Verified', uploadedAt: '2026-07-03' }
    ],
    createdAt: '2026-07-02'
  },
  {
    id: 'org-02',
    name: 'Meridian Cloud & Facilities Partners',
    registrationNo: 'LLPIN-AAY-9412',
    taxId: '27AAHFM4421K1Z9',
    industry: 'Cloud Infrastructure & Managed Services',
    website: 'https://meridianpartners.in',
    email: 'dispatch@meridianpartners.in',
    phone: '+91 20 6722 8100',
    city: 'Pune',
    state: 'Maharashtra',
    pinCode: '411001',
    address: 'Suite 802, ICC Trade Tower, Senapati Bapat Road, Pune',
    verificationStatus: 'Verified',
    description: 'Full-lifecycle hybrid cloud engineering, zero-trust network architecture, and automated building telemetry solutions.',
    members: [
      { id: 'mem-4', name: 'Rohan Kulkarni', email: 'dispatch@meridianpartners.in', role: 'Managing Principal', status: 'Active' },
      { id: 'mem-5', name: 'Tanvi Joshi', email: 'tanvi@meridianpartners.in', role: 'Solutions Architect', status: 'Active' }
    ],
    documents: [
      { id: 'doc-3', name: 'ISO_27001_Certification_2026.pdf', type: 'Security Compliance', status: 'Verified', uploadedAt: '2026-06-20' }
    ],
    createdAt: '2026-06-19'
  },
  {
    id: 'org-03',
    name: 'Helios Cold-Chain & Logistics Ltd.',
    registrationNo: 'CIN-U63090TG2023PLC172094',
    taxId: '36AABCH9022R1Z2',
    industry: 'Warehousing & Enterprise Logistics',
    website: 'https://helioslogistics.in',
    email: 's.rao@helioslogistics.in',
    phone: '+91 40 4812 3300',
    city: 'Hyderabad',
    state: 'Telangana',
    pinCode: '500081',
    address: 'Plot 19, HITEC City Phase II, Hyderabad',
    verificationStatus: 'Pending',
    description: 'Temperature-controlled warehousing, automated fulfillment centers, and dedicated B2B corridor fleets.',
    members: [
      { id: 'mem-6', name: 'Siddharth Rao', email: 's.rao@helioslogistics.in', role: 'Organisation Admin', status: 'Active' }
    ],
    documents: [
      { id: 'doc-4', name: 'Helios_Incorporation_Filing.pdf', type: 'Incorporation', status: 'Pending Review', uploadedAt: '2026-10-29' }
    ],
    createdAt: '2026-10-28'
  }
];

const INITIAL_CATEGORIES = [
  { id: 'cat-1', name: 'Cloud & IT Infrastructure', slug: 'cloud-it', listingCount: 2, active: true },
  { id: 'cat-2', name: 'Commercial Workspaces', slug: 'workspaces', listingCount: 2, active: true },
  { id: 'cat-3', name: 'Warehousing & Logistics', slug: 'logistics', listingCount: 2, active: true },
  { id: 'cat-4', name: 'Cybersecurity & Compliance', slug: 'cybersecurity', listingCount: 1, active: true },
  { id: 'cat-5', name: 'Legal & Regulatory Advisory', slug: 'legal-advisory', listingCount: 1, active: true },
  { id: 'cat-6', name: 'ESG & Sustainability Audits', slug: 'esg-audits', listingCount: 1, active: true }
];

const INITIAL_LOCATIONS = [
  { id: 'loc-1', city: 'Bengaluru', state: 'Karnataka', pinCodes: ['560001', '560038', '560103'], x: 36, y: 74, active: true },
  { id: 'loc-2', city: 'Mumbai', state: 'Maharashtra', pinCodes: ['400001', '400051', '400076'], x: 24, y: 54, active: true },
  { id: 'loc-3', city: 'Pune', state: 'Maharashtra', pinCodes: ['411001', '411014', '411057'], x: 30, y: 60, active: true },
  { id: 'loc-4', city: 'Hyderabad', state: 'Telangana', pinCodes: ['500081', '500032', '500001'], x: 45, y: 62, active: true },
  { id: 'loc-5', city: 'New Delhi', state: 'Delhi', pinCodes: ['110001', '110020', '110075'], x: 39, y: 24, active: true },
  { id: 'loc-6', city: 'Chennai', state: 'Tamil Nadu', pinCodes: ['600002', '600096', '600113'], x: 49, y: 79, active: true },
  { id: 'loc-7', city: 'Kolkata', state: 'West Bengal', pinCodes: ['700001', '700091'], x: 74, y: 45, active: true }
];

const INITIAL_LISTINGS = [
  {
    id: 'lst-101',
    title: 'Zero-Trust Hybrid Cloud Migration & SOC Setup',
    description: 'End-to-end enterprise cloud landing zone deployment on multi-region Kubernetes clusters with 24/7 SOC monitoring, automated IAM governance, and ISO 27001 audit readiness.',
    category: 'Cloud & IT Infrastructure',
    ownerId: 'usr-sp-01',
    organisationId: 'org-02',
    providerName: 'Meridian Cloud & Facilities Partners',
    providerVerified: true,
    contactEmail: 'dispatch@meridianpartners.in',
    contactPhone: '+91 20 6722 8100',
    address: 'Suite 802, ICC Trade Tower, Senapati Bapat Road',
    city: 'Pune',
    state: 'Maharashtra',
    pinCode: '411001',
    mapX: 30,
    mapY: 60,
    status: 'Active',
    pricingLabel: '₹4.5L / engagement',
    rating: 4.9,
    reviewCount: 28,
    views: 1420,
    enquiriesCount: 19,
    visualTheme: 'indigo',
    createdAt: '2026-09-12',
    updatedAt: '2026-11-08'
  },
  {
    id: 'lst-102',
    title: 'Nariman Point Grade-A Enterprise Innovation Hub',
    description: '18,500 sq. ft. LEED Platinum certified managed corporate floorplate featuring redundant dual-ISP fiber, biometric turnstiles, executive boardrooms, and 24/7 facility SLA.',
    category: 'Commercial Workspaces',
    ownerId: 'usr-org-01',
    organisationId: 'org-01',
    providerName: 'Vanguard Urban Systems Pvt. Ltd.',
    providerVerified: true,
    contactEmail: 'ops@vanguardurban.in',
    contactPhone: '+91 22 6618 4900',
    address: 'Level 14, Maker Chambers VI, Nariman Point',
    city: 'Mumbai',
    state: 'Maharashtra',
    pinCode: '400001',
    mapX: 24,
    mapY: 54,
    status: 'Active',
    pricingLabel: '₹24,500 / seat / mo',
    rating: 4.8,
    reviewCount: 34,
    views: 2180,
    enquiriesCount: 27,
    visualTheme: 'slate',
    createdAt: '2026-08-22',
    updatedAt: '2026-11-10'
  },
  {
    id: 'lst-103',
    title: 'Bengaluru Central R&D Managed Tech Campus',
    description: 'Turnkey R&D engineering center in Ashok Nagar with acoustic test labs, 140 ergonomic workstations, smart HVAC telemetry, and enterprise SLA management.',
    category: 'Commercial Workspaces',
    ownerId: 'usr-org-01',
    organisationId: 'org-01',
    providerName: 'Vanguard Urban Systems Pvt. Ltd.',
    providerVerified: true,
    contactEmail: 'ops@vanguardurban.in',
    contactPhone: '+91 22 6618 4900',
    address: '42 Residency Road, Ashok Nagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    pinCode: '560001',
    mapX: 36,
    mapY: 74,
    status: 'Active',
    pricingLabel: '₹19,000 / seat / mo',
    rating: 4.9,
    reviewCount: 41,
    views: 2650,
    enquiriesCount: 33,
    visualTheme: 'blue',
    createdAt: '2026-09-02',
    updatedAt: '2026-11-12'
  },
  {
    id: 'lst-104',
    title: 'HITEC City Automated Cold-Chain Fulfillment Hub',
    description: '45,000 sq. ft. pharmaceutical and precision electronics climate-controlled warehousing facility with real-time IoT thermal logging and API inventory sync.',
    category: 'Warehousing & Logistics',
    ownerId: 'usr-org-02',
    organisationId: 'org-03',
    providerName: 'Helios Cold-Chain & Logistics Ltd.',
    providerVerified: false,
    contactEmail: 's.rao@helioslogistics.in',
    contactPhone: '+91 40 4812 3300',
    address: 'Plot 19, HITEC City Phase II',
    city: 'Hyderabad',
    state: 'Telangana',
    pinCode: '500081',
    mapX: 45,
    mapY: 62,
    status: 'Pending Approval',
    pricingLabel: '₹62 / sq. ft. / mo',
    rating: 4.6,
    reviewCount: 12,
    views: 680,
    enquiriesCount: 8,
    visualTheme: 'emerald',
    createdAt: '2026-11-01',
    updatedAt: '2026-11-11'
  },
  {
    id: 'lst-105',
    title: 'SOC 2 Type II & DPDP Act Compliance Readiness Program',
    description: 'Structured 8-week enterprise cybersecurity posture assessment, vulnerability remediation, policy drafting, and external auditor coordination.',
    category: 'Cybersecurity & Compliance',
    ownerId: 'usr-sp-01',
    organisationId: 'org-02',
    providerName: 'Meridian Cloud & Facilities Partners',
    providerVerified: true,
    contactEmail: 'dispatch@meridianpartners.in',
    contactPhone: '+91 20 6722 8100',
    address: '100 Feet Road, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    pinCode: '560038',
    mapX: 38,
    mapY: 75,
    status: 'Active',
    pricingLabel: '₹3.2L / program',
    rating: 4.9,
    reviewCount: 19,
    views: 1190,
    enquiriesCount: 14,
    visualTheme: 'indigo',
    createdAt: '2026-10-04',
    updatedAt: '2026-11-09'
  },
  {
    id: 'lst-106',
    title: 'Cross-Border Corporate Structuring & Regulatory Advisory',
    description: 'Comprehensive commercial contracting, FEMA/RBI regulatory filings, and enterprise vendor governance retainer led by senior partners.',
    category: 'Legal & Regulatory Advisory',
    ownerId: 'usr-sp-02',
    providerName: 'Veritas Corporate Advisory',
    providerVerified: true,
    contactEmail: 'ananya@veritasadvisory.in',
    contactPhone: '+91 33 4012 7700',
    address: '8 Netaji Subhas Road, BBD Bagh',
    city: 'Kolkata',
    state: 'West Bengal',
    pinCode: '700001',
    mapX: 74,
    mapY: 45,
    status: 'Active',
    pricingLabel: '₹1.8L / retainer',
    rating: 4.8,
    reviewCount: 22,
    views: 940,
    enquiriesCount: 11,
    visualTheme: 'amber',
    createdAt: '2026-09-18',
    updatedAt: '2026-11-05'
  },
  {
    id: 'lst-107',
    title: 'Scope 1-3 Carbon Accounting & BRSR ESG Audit Suite',
    description: 'Automated utility telemetry aggregation, supply-chain emissions modeling, and SEBI BRSR Core assurance documentation for listed enterprises.',
    category: 'ESG & Sustainability Audits',
    ownerId: 'usr-sp-02',
    providerName: 'Veritas Corporate Advisory',
    providerVerified: true,
    contactEmail: 'ananya@veritasadvisory.in',
    contactPhone: '+91 33 4012 7700',
    address: '18 Barakhamba Road, Connaught Place',
    city: 'New Delhi',
    state: 'Delhi',
    pinCode: '110001',
    mapX: 39,
    mapY: 24,
    status: 'Approved',
    pricingLabel: '₹2.9L / annual audit',
    rating: 4.7,
    reviewCount: 15,
    views: 760,
    enquiriesCount: 9,
    visualTheme: 'teal',
    createdAt: '2026-10-20',
    updatedAt: '2026-11-06'
  },
  {
    id: 'lst-108',
    title: 'Guindy Port-Linked Bonded Logistics Corridor',
    description: 'Custom-bonded staging warehouse 14 km from Chennai Port offering automated dock scheduling and real-time fleet GPS handoffs.',
    category: 'Warehousing & Logistics',
    ownerId: 'usr-org-01',
    organisationId: 'org-01',
    providerName: 'Vanguard Urban Systems Pvt. Ltd.',
    providerVerified: true,
    contactEmail: 'ops@vanguardurban.in',
    contactPhone: '+91 22 6618 4900',
    address: '104 Anna Salai, Guindy',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pinCode: '600002',
    mapX: 49,
    mapY: 79,
    status: 'Draft',
    pricingLabel: '₹54 / sq. ft. / mo',
    rating: 4.5,
    reviewCount: 6,
    views: 210,
    enquiriesCount: 2,
    visualTheme: 'slate',
    createdAt: '2026-11-11',
    updatedAt: '2026-11-13'
  }
];

const INITIAL_ENQUIRIES = [
  {
    id: 'enq-501',
    listingId: 'lst-101',
    listingTitle: 'Zero-Trust Hybrid Cloud Migration & SOC Setup',
    senderId: 'usr-ind-01',
    senderName: 'Aarav Mehta',
    recipientId: 'usr-sp-01',
    recipientName: 'Meridian Cloud & Facilities Partners',
    subject: 'Q1 Multi-Region Cloud Landing Zone Timeline & SLA',
    message: 'We are consolidating 14 regional workloads into a compliant hybrid cloud environment in Q1. Could you share typical phase-1 architecture timelines and SOC SLA metrics?',
    status: 'Responded',
    budget: '₹5L - ₹8L',
    createdAt: '2026-11-10',
    updatedAt: '2026-11-12'
  },
  {
    id: 'enq-502',
    listingId: 'lst-103',
    listingTitle: 'Bengaluru Central R&D Managed Tech Campus',
    senderId: 'usr-ind-01',
    senderName: 'Aarav Mehta',
    recipientId: 'usr-org-01',
    recipientName: 'Vanguard Urban Systems Pvt. Ltd.',
    subject: 'Site Inspection Request for 85-Seat Engineering Wing',
    message: 'Looking to tour the Ashok Nagar facility next Tuesday at 11:00 AM with our facilities committee.',
    status: 'In Progress',
    budget: '₹16L / mo',
    createdAt: '2026-11-12',
    updatedAt: '2026-11-13'
  },
  {
    id: 'enq-503',
    listingId: 'lst-105',
    listingTitle: 'SOC 2 Type II & DPDP Act Compliance Readiness Program',
    senderId: 'usr-org-01',
    senderName: 'Kavya Deshmukh (Vanguard Urban)',
    recipientId: 'usr-sp-01',
    recipientName: 'Meridian Cloud & Facilities Partners',
    subject: 'DPDP Gap Assessment for Property Management Portal',
    message: 'We need an expedited gap assessment for our tenant portal ahead of our Q2 enterprise audit.',
    status: 'New',
    budget: '₹3.2L',
    createdAt: '2026-11-13',
    updatedAt: '2026-11-13'
  },
  {
    id: 'enq-504',
    listingId: 'lst-102',
    listingTitle: 'Nariman Point Grade-A Enterprise Innovation Hub',
    senderId: 'usr-sp-02',
    senderName: 'Ananya Chatterjee',
    recipientId: 'usr-org-01',
    recipientName: 'Vanguard Urban Systems Pvt. Ltd.',
    subject: 'Executive Suite Lease Terms (24 Months)',
    message: 'Requesting floorplan PDF and lock-in flexibility for a 20-person legal advisory practice.',
    status: 'Completed',
    budget: '₹4.9L / mo',
    createdAt: '2026-11-04',
    updatedAt: '2026-11-09'
  }
];

const INITIAL_CONVERSATIONS = [
  {
    id: 'conv-1',
    enquiryId: 'enq-501',
    listingTitle: 'Zero-Trust Hybrid Cloud Migration & SOC Setup',
    participants: ['usr-ind-01', 'usr-sp-01'],
    unreadFor: [],
    messages: [
      { id: 'm-1', senderId: 'usr-ind-01', senderName: 'Aarav Mehta', text: 'Hi Rohan, we are consolidating 14 workloads in Q1. Can Meridian support a phased rollout with ISO 27001 controls?', time: '10 Nov · 10:14 AM' },
      { id: 'm-2', senderId: 'usr-sp-01', senderName: 'Rohan Kulkarni', text: 'Hello Aarav — yes, our standard Phase-1 landing zone deploys in 3 weeks with automated CIS benchmarks and 24/7 SOC telemetry.', time: '10 Nov · 11:02 AM' },
      { id: 'm-3', senderId: 'usr-ind-01', senderName: 'Aarav Mehta', text: 'Great. Please send over the technical scope checklist so we can review it with our CISO.', time: '12 Nov · 03:40 PM' }
    ]
  },
  {
    id: 'conv-2',
    enquiryId: 'enq-502',
    listingTitle: 'Bengaluru Central R&D Managed Tech Campus',
    participants: ['usr-ind-01', 'usr-org-01'],
    unreadFor: ['usr-ind-01'],
    messages: [
      { id: 'm-4', senderId: 'usr-ind-01', senderName: 'Aarav Mehta', text: 'Hi Kavya, requesting an on-site tour of the Residency Road R&D floorplate next Tuesday.', time: '12 Nov · 09:30 AM' },
      { id: 'm-5', senderId: 'usr-org-01', senderName: 'Kavya Deshmukh', text: 'Confirmed for Tuesday 11:00 AM. Our Bengaluru facility lead will meet your team at the reception with acoustic test specs.', time: '13 Nov · 09:15 AM' }
    ]
  },
  {
    id: 'conv-3',
    enquiryId: 'enq-503',
    listingTitle: 'SOC 2 Type II & DPDP Act Compliance Readiness Program',
    participants: ['usr-org-01', 'usr-sp-01'],
    unreadFor: ['usr-sp-01'],
    messages: [
      { id: 'm-6', senderId: 'usr-org-01', senderName: 'Kavya Deshmukh', text: 'Rohan, we need an expedited DPDP Act gap assessment for our tenant portal before Q2.', time: '13 Nov · 04:50 PM' }
    ]
  }
];

const INITIAL_NOTIFICATIONS = [
  { id: 'not-1', userId: 'usr-ind-01', category: 'Enquiry', title: 'Site tour confirmed by Vanguard Urban Systems', message: 'Your inspection for Bengaluru Central R&D Managed Tech Campus is scheduled for Tuesday 11:00 AM.', isRead: false, time: '2 hours ago', link: '/messages' },
  { id: 'not-2', userId: 'usr-ind-01', category: 'Listing', title: 'New verified listing near 560001', message: 'SOC 2 Type II & DPDP Act Compliance Readiness Program is now active in Bengaluru.', isRead: false, time: '1 day ago', link: '/listings/lst-105' },
  { id: 'not-3', userId: 'usr-org-01', category: 'Enquiry', title: 'New enquiry from Aarav Mehta', message: 'Requested a site inspection for Bengaluru Central R&D Managed Tech Campus.', isRead: false, time: '1 day ago', link: '/enquiries' },
  { id: 'not-4', userId: 'usr-sp-01', category: 'Enquiry', title: 'New compliance enquiry received', message: 'Vanguard Urban Systems Pvt. Ltd. requested a DPDP Act gap assessment.', isRead: false, time: '5 hours ago', link: '/enquiries' },
  { id: 'not-5', userId: 'usr-adm-01', category: 'Verification', title: 'Pending verification request', message: 'Helios Cold-Chain & Logistics Ltd. submitted incorporation documents for review.', isRead: false, time: '3 hours ago', link: '/admin/verifications' },
  { id: 'not-6', userId: 'usr-adm-01', category: 'Listing', title: 'Listing awaiting approval', message: 'HITEC City Automated Cold-Chain Fulfillment Hub requires admin compliance review.', isRead: false, time: '6 hours ago', link: '/admin/listings' }
];

const INITIAL_VERIFICATIONS = [
  { id: 'ver-1', entityType: 'Organisation', entityId: 'org-03', entityName: 'Helios Cold-Chain & Logistics Ltd.', applicantName: 'Siddharth Rao', email: 's.rao@helioslogistics.in', documentName: 'Helios_Incorporation_Filing.pdf', registrationNo: 'CIN-U63090TG2023PLC172094', city: 'Hyderabad, TS', submittedAt: '2026-10-29', status: 'Pending' },
  { id: 'ver-2', entityType: 'Individual', entityId: 'usr-ind-02', entityName: 'Vikramaditya Sen', applicantName: 'Vikramaditya Sen', email: 'vikram.sen@apexgroup.co.in', documentName: 'Corporate_Authorization_Letter.pdf', registrationNo: 'EMP-APX-4419', city: 'Chennai, TN', submittedAt: '2026-11-04', status: 'Pending' },
  { id: 'ver-3', entityType: 'Organisation', entityId: 'org-01', entityName: 'Vanguard Urban Systems Pvt. Ltd.', applicantName: 'Kavya Deshmukh', email: 'ops@vanguardurban.in', documentName: 'Certificate_of_Incorporation_Vanguard.pdf', registrationNo: 'CIN-U70109MH2021PTC364812', city: 'Mumbai, MH', submittedAt: '2026-07-03', status: 'Approved' },
  { id: 'ver-4', entityType: 'Service Provider', entityId: 'org-02', entityName: 'Meridian Cloud & Facilities Partners', applicantName: 'Rohan Kulkarni', email: 'dispatch@meridianpartners.in', documentName: 'ISO_27001_Certification_2026.pdf', registrationNo: 'LLPIN-AAY-9412', city: 'Pune, MH', submittedAt: '2026-06-20', status: 'Approved' }
];

const INITIAL_LOGS = [
  { id: 'log-1', actor: 'Priya Nair (Admin)', action: 'SYSTEM_AUDIT', summary: 'Reviewed monthly SLA compliance report across 6 active categories', timestamp: '2026-11-14 09:12' },
  { id: 'log-2', actor: 'Kavya Deshmukh (Organisation)', action: 'ENQUIRY_UPDATED', summary: 'Moved enquiry ENQ-502 to In Progress and confirmed site visit', timestamp: '2026-11-13 17:45' },
  { id: 'log-3', actor: 'Siddharth Rao (Organisation)', action: 'LISTING_SUBMITTED', summary: 'Submitted HITEC City Automated Cold-Chain Fulfillment Hub for approval', timestamp: '2026-11-11 14:20' },
  { id: 'log-4', actor: 'Rohan Kulkarni (Service Provider)', action: 'LISTING_UPDATED', summary: 'Updated Zero-Trust Hybrid Cloud Migration pricing & SLA schedule', timestamp: '2026-11-08 11:05' }
];

const INITIAL_SETTINGS = {
  platformName: 'NEXORA Enterprise Ecosystem',
  supportEmail: 'governance@nexora.io',
  autoApproveVerifiedOrgs: true,
  enforceMobileOtp: true,
  defaultDiscoveryRadiusKm: 50,
  maintenanceBannerEnabled: false,
  maintenanceMessage: 'Scheduled PostgreSQL replica maintenance Sunday 02:00 - 02:30 IST.',
  platformFeePercent: 2.5
};

const ANALYTICS_SERIES = {
  '7D': [
    { period: 'Mon', users: 18, orgs: 3, listings: 7, activeListings: 5, enquiries: 14, converted: 6 },
    { period: 'Tue', users: 24, orgs: 4, listings: 9, activeListings: 7, enquiries: 19, converted: 8 },
    { period: 'Wed', users: 21, orgs: 2, listings: 8, activeListings: 6, enquiries: 22, converted: 10 },
    { period: 'Thu', users: 31, orgs: 5, listings: 12, activeListings: 10, enquiries: 26, converted: 12 },
    { period: 'Fri', users: 35, orgs: 6, listings: 14, activeListings: 11, enquiries: 29, converted: 15 },
    { period: 'Sat', users: 14, orgs: 2, listings: 5, activeListings: 4, enquiries: 12, converted: 5 },
    { period: 'Sun', users: 12, orgs: 1, listings: 4, activeListings: 3, enquiries: 10, converted: 4 }
  ],
  '30D': [
    { period: 'Wk 1', users: 92, orgs: 14, listings: 34, activeListings: 28, enquiries: 64, converted: 28 },
    { period: 'Wk 2', users: 118, orgs: 19, listings: 41, activeListings: 35, enquiries: 78, converted: 36 },
    { period: 'Wk 3', users: 134, orgs: 22, listings: 49, activeListings: 42, enquiries: 94, converted: 44 },
    { period: 'Wk 4', users: 162, orgs: 27, listings: 58, activeListings: 50, enquiries: 112, converted: 54 }
  ],
  '90D': [
    { period: 'Sep', users: 310, orgs: 42, listings: 112, activeListings: 94, enquiries: 220, converted: 98 },
    { period: 'Oct', users: 428, orgs: 61, listings: 154, activeListings: 132, enquiries: 298, converted: 139 },
    { period: 'Nov', users: 506, orgs: 82, listings: 182, activeListings: 158, enquiries: 348, converted: 168 }
  ],
  '12M': [
    { period: 'Q1', users: 490, orgs: 65, listings: 180, activeListings: 145, enquiries: 340, converted: 142 },
    { period: 'Q2', users: 760, orgs: 108, listings: 275, activeListings: 230, enquiries: 510, converted: 228 },
    { period: 'Q3', users: 1090, orgs: 156, listings: 390, activeListings: 334, enquiries: 740, converted: 345 },
    { period: 'Q4', users: 1420, orgs: 214, listings: 495, activeListings: 428, enquiries: 940, converted: 452 }
  ]
};

/* ============================================================================
   3. SERVICE LAYER (LOCALSTORAGE SIMULATION + FUTURE API/POSTGRESQL ADAPTERS)
   ============================================================================ */

const STORAGE_KEY = 'nexora_platform_state_v1';

const loadPersistedState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const savePersistedState = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage quota errors in sandboxed contexts
  }
};

const exportToCsv = (filename, rows) => {
  if (!rows || rows.length === 0) return;
  const headers = Object.keys(rows[0]);
  const csvContent = [
    headers.join(','),
    ...rows.map((row) =>
      headers
        .map((field) => {
          const val = row[field] === undefined || row[field] === null ? '' : String(row[field]);
          return `"${val.replace(/"/g, '""')}"`;
        })
        .join(',')
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const NexoraContext = createContext(null);
const useNexora = () => useContext(NexoraContext);

/* ============================================================================
   4. REUSABLE UI PRIMITIVES & INTERACTIVE VECTOR MAP
   ============================================================================ */

function StatusIndicator({ status }) {
  const s = (status || '').toLowerCase();
  let cls = 'nx-status-neutral';
  let IconComp = Clock;

  if (['active', 'approved', 'verified', 'completed', 'responded'].includes(s)) {
    cls = 'nx-status-success';
    IconComp = CheckCircle2;
  } else if (['pending approval', 'pending', 'pending review', 'in progress'].includes(s)) {
    cls = 'nx-status-warning';
    IconComp = Clock;
  } else if (['rejected', 'cancelled', 'inactive', 'suspended'].includes(s)) {
    cls = 'nx-status-danger';
    IconComp = AlertCircle;
  } else if (['new', 'draft'].includes(s)) {
    cls = 'nx-status-info';
    IconComp = FileText;
  }

  return (
    <span className={`nx-status ${cls}`}>
      <IconComp size={12} aria-hidden="true" />
      <span>{status}</span>
    </span>
  );
}

function AvatarInitials({ name, size = 36, tone = 'indigo' }) {
  const initials = (name || 'NX')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join('');

  const tones = {
    indigo: { bg: '#eef2ff', color: '#3730a3', border: '#c7d2fe' },
    slate: { bg: '#f1f5f9', color: '#0f172a', border: '#cbd5e1' },
    emerald: { bg: '#ecfdf5', color: '#065f46', border: '#a7f3d0' },
    amber: { bg: '#fffbeb', color: '#92400e', border: '#fde68a' }
  };
  const palette = tones[tone] || tones.indigo;

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: Math.round(size * 0.25),
        background: palette.bg,
        color: palette.color,
        border: `1px solid ${palette.border}`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--nx-font-display)',
        fontWeight: 700,
        fontSize: Math.max(11, Math.round(size * 0.36)),
        flexShrink: 0
      }}
    >
      {initials}
    </div>
  );
}

function ListingVisualBanner({ listing, height = 132 }) {
  if (listing.customImage) {
    return (
      <div style={{ height, width: '100%', overflow: 'hidden', borderRadius: '8px 8px 0 0', background: '#f1f5f9' }}>
        <img
          src={listing.customImage}
          alt={listing.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
    );
  }

  const themes = {
    indigo: { bg: 'linear-gradient(135deg, #1e1b4b 0%, #3730a3 100%)', stroke: '#818cf8' },
    slate: { bg: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)', stroke: '#94a3b8' },
    blue: { bg: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 100%)', stroke: '#7dd3fc' },
    emerald: { bg: 'linear-gradient(135deg, #064e3b 0%, #047857 100%)', stroke: '#6ee7b7' },
    amber: { bg: 'linear-gradient(135deg, #451a03 0%, #92400e 100%)', stroke: '#fcd34d' },
    teal: { bg: 'linear-gradient(135deg, #134e4a 0%, #0f766e 100%)', stroke: '#5eead4' }
  };
  const t = themes[listing.visualTheme] || themes.indigo;

  return (
    <div
      style={{
        height,
        width: '100%',
        background: t.bg,
        borderRadius: '9px 9px 0 0',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '14px 16px'
      }}
    >
      <svg
        viewBox="0 0 320 120"
        preserveAspectRatio="none"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.2 }}
        aria-hidden="true"
      >
        <path d="M0 90 Q 80 50 160 80 T 320 60" fill="none" stroke={t.stroke} strokeWidth="1.5" />
        <path d="M0 105 Q 110 70 210 95 T 320 82" fill="none" stroke={t.stroke} strokeWidth="1" />
        <circle cx="268" cy="34" r="24" fill="none" stroke={t.stroke} strokeWidth="1" />
        <rect x="20" y="20" width="44" height="44" rx="6" fill="none" stroke={t.stroke} strokeWidth="1" />
      </svg>
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 11.5, fontWeight: 600, color: 'rgba(255,255,255,0.88)' }}>
          {listing.category}
        </span>
        <span className="nx-mono" style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)' }}>
          {listing.pinCode}
        </span>
      </div>
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#ffffff' }}>
          {listing.city}, {listing.state}
        </span>
        {listing.pricingLabel && (
          <span className="nx-mono" style={{ fontSize: 12, fontWeight: 600, color: '#e0e7ff' }}>
            {listing.pricingLabel}
          </span>
        )}
      </div>
    </div>
  );
}

function ConfirmDialog({ open, title, message, confirmLabel = 'Confirm', confirmTone = 'primary', onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="nx-backdrop" role="dialog" aria-modal="true">
      <div className="nx-modal" style={{ maxWidth: 440 }}>
        <div style={{ padding: '20px 22px', borderBottom: '1px solid var(--nx-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>{title}</h3>
          <button type="button" className="nx-btn nx-btn-ghost nx-btn-sm" onClick={onCancel} aria-label="Close dialog">
            <X size={16} />
          </button>
        </div>
        <div style={{ padding: '18px 22px', color: 'var(--nx-text-secondary)', fontSize: 13.5 }}>
          {message}
        </div>
        <div style={{ padding: '14px 22px', borderTop: '1px solid var(--nx-border)', display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
          <button type="button" className="nx-btn nx-btn-secondary nx-btn-sm" onClick={onCancel}>
            Cancel
          </button>
          <button
            type="button"
            className={`nx-btn nx-btn-sm ${confirmTone === 'danger' ? 'nx-btn-danger' : 'nx-btn-primary'}`}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

function PaginationBar({ page, totalPages, totalItems, onPageChange }) {
  if (totalItems === 0) return null;
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderTop: '1px solid var(--nx-border)', flexWrap: 'wrap', gap: 12 }}>
      <span style={{ fontSize: 12.5, color: 'var(--nx-text-muted)' }}>
        Showing page <strong className="nx-tabular" style={{ color: 'var(--nx-text)' }}>{page}</strong> of{' '}
        <strong className="nx-tabular" style={{ color: 'var(--nx-text)' }}>{Math.max(1, totalPages)}</strong> ({totalItems} records)
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <button
          type="button"
          className="nx-btn nx-btn-secondary nx-btn-sm"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronLeft size={14} /> Previous
        </button>
        <button
          type="button"
          className="nx-btn nx-btn-secondary nx-btn-sm"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

function EmptyPanel({ icon: Icon = FolderKanban, title, description, actionLabel, onAction }) {
  return (
    <div className="nx-card nx-card-pad" style={{ textAlign: 'center', padding: '44px 24px' }}>
      <div style={{ width: 44, height: 44, margin: '0 auto 14px', borderRadius: 10, background: 'var(--nx-surface-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--nx-text-muted)' }}>
        <Icon size={20} />
      </div>
      <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>{title}</h4>
      <p style={{ fontSize: 13, color: 'var(--nx-text-muted)', maxWidth: 420, margin: '0 auto 16px' }}>{description}</p>
      {actionLabel && onAction && (
        <button type="button" className="nx-btn nx-btn-primary nx-btn-sm" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}

function InteractiveGeoMap({ listings = [], selectedId, onSelectListing, height = 420, focusCity = 'All' }) {
  const [zoom, setZoom] = useState(1);
  const [hoveredId, setHoveredId] = useState(null);
  const activeItem = listings.find((l) => l.id === (hoveredId || selectedId)) || listings[0];

  return (
    <div className="nx-card" style={{ overflow: 'hidden', position: 'relative' }}>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--nx-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <MapPin size={15} style={{ color: 'var(--nx-accent)' }} />
          <span style={{ fontSize: 13, fontWeight: 600 }}>Geospatial Discovery Map</span>
          <span style={{ fontSize: 12, color: 'var(--nx-text-muted)' }}>
            · {listings.length} mapped {listings.length === 1 ? 'listing' : 'listings'}
            {focusCity !== 'All' ? ` in ${focusCity}` : ''}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button
            type="button"
            className="nx-btn nx-btn-secondary nx-btn-sm"
            onClick={() => setZoom((z) => Math.max(1, Number((z - 0.2).toFixed(1))))}
            title="Zoom out"
          >
            -
          </button>
          <span className="nx-mono" style={{ fontSize: 11.5, color: 'var(--nx-text-muted)', minWidth: 38, textAlign: 'center' }}>
            {zoom.toFixed(1)}x
          </span>
          <button
            type="button"
            className="nx-btn nx-btn-secondary nx-btn-sm"
            onClick={() => setZoom((z) => Math.min(1.6, Number((z + 0.2).toFixed(1))))}
            title="Zoom in"
          >
            +
          </button>
        </div>
      </div>

      <div style={{ position: 'relative', height, background: '#eef2f6', overflow: 'hidden' }}>
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          style={{
            width: '100%',
            height: '100%',
            transform: `scale(${zoom})`,
            transformOrigin: '50% 50%',
            transition: 'transform 180ms ease'
          }}
        >
          <defs>
            <pattern id="nx-map-grid" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#dde4ee" strokeWidth="0.3" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#nx-map-grid)" />

          {/* Stylized India regional landmass corridor */}
          <path
            d="M36,10 L48,14 L56,22 L72,26 L86,34 L82,48 L72,56 L62,64 L54,78 L46,92 L38,88 L30,74 L22,58 L16,44 L24,32 L32,22 Z"
            fill="#ffffff"
            stroke="#cbd5e1"
            strokeWidth="0.7"
          />

          {/* Major transit / enterprise corridors */}
          <line x1="39" y1="24" x2="24" y2="54" stroke="#cbd5e1" strokeWidth="0.45" strokeDasharray="1.2 1.2" />
          <line x1="24" y1="54" x2="30" y2="60" stroke="#cbd5e1" strokeWidth="0.45" strokeDasharray="1.2 1.2" />
          <line x1="30" y1="60" x2="45" y2="62" stroke="#cbd5e1" strokeWidth="0.45" strokeDasharray="1.2 1.2" />
          <line x1="45" y1="62" x2="36" y2="74" stroke="#cbd5e1" strokeWidth="0.45" strokeDasharray="1.2 1.2" />
          <line x1="36" y1="74" x2="49" y2="79" stroke="#cbd5e1" strokeWidth="0.45" strokeDasharray="1.2 1.2" />
          <line x1="39" y1="24" x2="74" y2="45" stroke="#cbd5e1" strokeWidth="0.45" strokeDasharray="1.2 1.2" />

          {/* City reference labels */}
          {[
            { label: 'New Delhi', x: 39, y: 20 },
            { label: 'Mumbai', x: 18, y: 53 },
            { label: 'Pune', x: 25, y: 63 },
            { label: 'Hyderabad', x: 49, y: 61 },
            { label: 'Bengaluru', x: 32, y: 78 },
            { label: 'Chennai', x: 54, y: 80 },
            { label: 'Kolkata', x: 78, y: 45 }
          ].map((c) => (
            <text key={c.label} x={c.x} y={c.y} fontSize="2.5" fill="#64748b" fontWeight="600">
              {c.label}
            </text>
          ))}

          {/* Listing Markers */}
          {listings.map((item, idx) => {
            const isSelected = item.id === selectedId || item.id === hoveredId;
            const offsetX = ((idx % 3) - 1) * 1.4;
            const offsetY = Math.floor(idx / 3) * 0.9;
            const cx = (item.mapX || 40) + offsetX;
            const cy = (item.mapY || 50) + offsetY;
            return (
              <g
                key={item.id}
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => onSelectListing && onSelectListing(item)}
              >
                {isSelected && (
                  <circle cx={cx} cy={cy} r="5.2" fill="rgba(67, 56, 202, 0.16)" stroke="#4338ca" strokeWidth="0.4" />
                )}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isSelected ? 2.6 : 2.1}
                  fill={isSelected ? '#4338ca' : '#0f172a'}
                  stroke="#ffffff"
                  strokeWidth="0.7"
                />
              </g>
            );
          })}
        </svg>

        {/* Bottom-left active pin preview card */}
        {activeItem && (
          <div
            style={{
              position: 'absolute',
              left: 14,
              right: 14,
              bottom: 14,
              background: 'rgba(255,255,255,0.96)',
              border: '1px solid var(--nx-border)',
              borderRadius: 10,
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
              boxShadow: '0 6px 20px rgba(15, 23, 42, 0.09)'
            }}
          >
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--nx-text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {activeItem.title}
              </div>
              <div className="nx-meta-line" style={{ marginTop: 2 }}>
                <span>{activeItem.city}, {activeItem.state}</span>
                <span>·</span>
                <span className="nx-mono">PIN {activeItem.pinCode}</span>
                <span>·</span>
                <span>{activeItem.providerName}</span>
              </div>
            </div>
            <Link to={`/listings/${activeItem.id}`} className="nx-btn nx-btn-primary nx-btn-sm">
              Open Details
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================================
   5. AUTHENTICATION SCREENS (LOGIN, REGISTRATION, OTP, FORGOT PASSWORD)
   ============================================================================ */

function LoginScreen() {
  const { users, loginAsUser, loginWithCredentials, notify } = useNexora();
  const navigate = useNavigate();

  const [authMode, setAuthMode] = useState('email'); // 'email' | 'otp'
  const [email, setEmail] = useState('aarav.mehta@enterprise-mail.in');
  const [password, setPassword] = useState('NexoraDemo@2026');
  const [mobile, setMobile] = useState('+91 98450 21490');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [error, setError] = useState('');
  const [forgotOpen, setForgotOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const demoAccounts = [
    { role: ROLES.INDIVIDUAL, userId: 'usr-ind-01', title: 'Individual User', desc: 'Discovery, saved opportunities, enquiries & profile', person: 'Aarav Mehta' },
    { role: ROLES.ORGANISATION, userId: 'usr-org-01', title: 'Organisation', desc: 'Listing portfolio, team members & inbound leads', person: 'Vanguard Urban Systems' },
    { role: ROLES.SERVICE_PROVIDER, userId: 'usr-sp-01', title: 'Service Provider', desc: 'Service catalogue, SLA enquiries & performance', person: 'Meridian Partners' },
    { role: ROLES.ADMIN, userId: 'usr-adm-01', title: 'Platform Administrator', desc: 'Global governance, verifications & analytics', person: 'Priya Nair' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (authMode === 'email') {
      const ok = loginWithCredentials(email);
      if (!ok) {
        setError('No matching account found for that email. Try one of the demo personas or register a new account.');
        return;
      }
      navigate('/dashboard');
    } else {
      if (!otpSent) {
        setOtpSent(true);
        notify('Simulated OTP 482910 generated for ' + mobile);
        return;
      }
      if (otpCode.trim() !== '482910') {
        setError('Enter the simulated 6-digit OTP code: 482910');
        return;
      }
      const matched = users.find((u) => u.mobile.replace(/\s/g, '') === mobile.replace(/\s/g, '')) || users[0];
      loginAsUser(matched.id);
      navigate('/dashboard');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--nx-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '28px 20px' }}>
      <div style={{ width: '100%', maxWidth: 1080, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 28, alignItems: 'stretch' }}>
        {/* Left: Enterprise Brand & Demo Role Selector */}
        <div className="nx-card" style={{ padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#0f172a', color: '#f8fafc', borderColor: '#1e293b' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
              <div className="nx-brand-mark">N</div>
              <span style={{ fontFamily: 'var(--nx-font-display)', fontWeight: 800, fontSize: 20, letterSpacing: '-0.02em', color: '#ffffff' }}>
                NEXORA
              </span>
            </div>
            <h1 style={{ fontSize: 26, fontWeight: 700, color: '#ffffff', lineHeight: 1.25, marginBottom: 12 }}>
              Unified Multi-User Enterprise Platform
            </h1>
            <p style={{ fontSize: 14, color: '#94a3b8', marginBottom: 28, lineHeight: 1.6 }}>
              Demonstrating role-based portals, listing lifecycle approvals, geospatial discovery, workflow messaging, and centralised administration.
            </p>

            <div style={{ fontSize: 12, fontWeight: 600, color: '#cbd5e1', marginBottom: 12 }}>
              Instant Demo Role Access
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {demoAccounts.map((acc) => (
                <button
                  key={acc.role}
                  type="button"
                  onClick={() => {
                    loginAsUser(acc.userId);
                    navigate('/dashboard');
                  }}
                  style={{
                    textAlign: 'left',
                    padding: '12px 14px',
                    borderRadius: 10,
                    border: '1px solid #334155',
                    background: 'rgba(30, 41, 59, 0.72)',
                    color: '#f8fafc',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 12,
                    transition: 'border-color 140ms ease, background 140ms ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#818cf8'; e.currentTarget.style.background = '#1e293b'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#334155'; e.currentTarget.style.background = 'rgba(30, 41, 59, 0.72)'; }}
                >
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: '#ffffff' }}>{acc.title}</div>
                    <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>{acc.person} · {acc.desc}</div>
                  </div>
                  <ArrowUpRight size={16} style={{ color: '#a5b4fc', flexShrink: 0 }} />
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 28, paddingTop: 18, borderTop: '1px solid #1e293b', fontSize: 12, color: '#94a3b8', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
            <span>Simulated local state persistence enabled</span>
            <span>PostgreSQL / Supabase schema-ready</span>
          </div>
        </div>

        {/* Right: Sign In Form */}
        <div className="nx-card" style={{ padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ marginBottom: 22 }}>
            <h2 style={{ fontSize: 21, fontWeight: 700, marginBottom: 6 }}>Sign in to NEXORA</h2>
            <p style={{ fontSize: 13.5, color: 'var(--nx-text-muted)', margin: 0 }}>
              Authenticate using email credentials or simulated mobile OTP.
            </p>
          </div>

          <div className="nx-segmented" style={{ marginBottom: 22, width: '100%' }}>
            <button
              type="button"
              className={`nx-seg-btn ${authMode === 'email' ? 'active' : ''}`}
              style={{ flex: 1 }}
              onClick={() => { setAuthMode('email'); setError(''); }}
            >
              Email & Password
            </button>
            <button
              type="button"
              className={`nx-seg-btn ${authMode === 'otp' ? 'active' : ''}`}
              style={{ flex: 1 }}
              onClick={() => { setAuthMode('otp'); setError(''); }}
            >
              Mobile OTP
            </button>
          </div>

          {error && (
            <div style={{ padding: '10px 12px', borderRadius: 8, background: 'var(--nx-danger-bg)', color: 'var(--nx-danger)', fontSize: 12.5, marginBottom: 16, border: '1px solid #fecaca' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {authMode === 'email' ? (
              <>
                <div>
                  <label className="nx-label" htmlFor="login-email">Work Email Address</label>
                  <input
                    id="login-email"
                    type="email"
                    className="nx-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <label className="nx-label" htmlFor="login-pass" style={{ marginBottom: 0 }}>Password</label>
                    <button
                      type="button"
                      onClick={() => { setResetEmail(email); setResetSent(false); setForgotOpen(true); }}
                      style={{ background: 'none', border: 'none', color: 'var(--nx-accent)', fontSize: 12.5, fontWeight: 600, cursor: 'pointer', padding: 0 }}
                    >
                      Forgot password?
                    </button>
                  </div>
                  <input
                    id="login-pass"
                    type="password"
                    className="nx-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="nx-label" htmlFor="login-mobile">Registered Mobile Number</label>
                  <input
                    id="login-mobile"
                    type="text"
                    className="nx-input nx-mono"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                  />
                </div>
                {otpSent && (
                  <div>
                    <label className="nx-label" htmlFor="login-otp">6-Digit OTP Verification Code</label>
                    <input
                      id="login-otp"
                      type="text"
                      className="nx-input nx-mono"
                      placeholder="Enter 482910"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      maxLength={6}
                      required
                    />
                    <div style={{ fontSize: 12, color: 'var(--nx-text-muted)', marginTop: 6 }}>
                      Demo simulation code: <strong className="nx-mono">482910</strong>
                    </div>
                  </div>
                )}
              </>
            )}

            <button type="submit" className="nx-btn nx-btn-primary" style={{ width: '100%', marginTop: 4 }}>
              {authMode === 'email' ? 'Sign In' : otpSent ? 'Verify OTP & Sign In' : 'Send Simulated OTP'}
            </button>
          </form>

          <div style={{ marginTop: 22, paddingTop: 18, borderTop: '1px solid var(--nx-border)', textAlign: 'center', fontSize: 13, color: 'var(--nx-text-muted)' }}>
            New to NEXORA?{' '}
            <Link to="/register" style={{ color: 'var(--nx-accent)', fontWeight: 600, textDecoration: 'none' }}>
              Create an Individual or Organisation Account
            </Link>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotOpen && (
        <div className="nx-backdrop" role="dialog" aria-modal="true">
          <div className="nx-modal" style={{ maxWidth: 420 }}>
            <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--nx-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: 16, fontWeight: 700 }}>Reset Account Password</h3>
              <button type="button" className="nx-btn nx-btn-ghost nx-btn-sm" onClick={() => setForgotOpen(false)}>
                <X size={16} />
              </button>
            </div>
            <div style={{ padding: 22 }}>
              {!resetSent ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setResetSent(true);
                    notify('Simulated password reset instructions sent to ' + resetEmail);
                  }}
                  style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
                >
                  <p style={{ margin: 0, fontSize: 13, color: 'var(--nx-text-muted)' }}>
                    Enter your registered enterprise email to receive a simulated recovery link.
                  </p>
                  <div>
                    <label className="nx-label">Email Address</label>
                    <input type="email" className="nx-input" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} required />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                    <button type="button" className="nx-btn nx-btn-secondary nx-btn-sm" onClick={() => setForgotOpen(false)}>Cancel</button>
                    <button type="submit" className="nx-btn nx-btn-primary nx-btn-sm">Send Recovery Link</button>
                  </div>
                </form>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div style={{ padding: 12, borderRadius: 8, background: 'var(--nx-success-bg)', color: 'var(--nx-success)', fontSize: 13 }}>
                    Recovery instructions simulated for <strong>{resetEmail}</strong>. In production this dispatches a signed Supabase/SMTP reset token.
                  </div>
                  <button type="button" className="nx-btn nx-btn-primary nx-btn-sm" onClick={() => setForgotOpen(false)}>
                    Return to Sign In
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function RegisterScreen() {
  const { registerAccount, notify } = useNexora();
  const navigate = useNavigate();

  const [accountType, setAccountType] = useState(ROLES.INDIVIDUAL);
  const [name, setName] = useState('');
  const [orgName, setOrgName] = useState('');
  const [regNo, setRegNo] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('+91 ');
  const [city, setCity] = useState('Bengaluru');
  const [stateName, setStateName] = useState('Karnataka');
  const [pinCode, setPinCode] = useState('560001');
  const [password, setPassword] = useState('');
  const [otpRequested, setOtpRequested] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);

  const handleRequestOtp = () => {
    setOtpRequested(true);
    notify('Simulated registration OTP sent: 482910');
  };

  const handleVerifyOtp = () => {
    if (otpInput.trim() === '482910') {
      setOtpVerified(true);
      notify('Mobile number verified');
    } else {
      notify('Use simulated OTP 482910 to verify', 'error');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    registerAccount({
      role: accountType,
      name: name || 'New Enterprise User',
      orgName,
      regNo,
      email,
      mobile,
      city,
      state: stateName,
      pinCode,
      otpVerified
    });
    navigate('/dashboard');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--nx-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '28px 20px' }}>
      <div className="nx-card" style={{ width: '100%', maxWidth: 660, padding: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="nx-brand-mark">N</div>
            <span style={{ fontFamily: 'var(--nx-font-display)', fontWeight: 800, fontSize: 18 }}>NEXORA</span>
          </div>
          <Link to="/login" style={{ fontSize: 13, fontWeight: 600, color: 'var(--nx-accent)', textDecoration: 'none' }}>
            Already have an account? Sign In
          </Link>
        </div>

        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>Create an Enterprise Account</h1>
        <p style={{ fontSize: 13.5, color: 'var(--nx-text-muted)', marginBottom: 20 }}>
          Choose your account classification to provision the matching workspace and verification workflow.
        </p>

        <div className="nx-segmented" style={{ width: '100%', marginBottom: 22 }}>
          <button type="button" className={`nx-seg-btn ${accountType === ROLES.INDIVIDUAL ? 'active' : ''}`} style={{ flex: 1 }} onClick={() => setAccountType(ROLES.INDIVIDUAL)}>
            Individual Account
          </button>
          <button type="button" className={`nx-seg-btn ${accountType === ROLES.ORGANISATION ? 'active' : ''}`} style={{ flex: 1 }} onClick={() => setAccountType(ROLES.ORGANISATION)}>
            Organisation Account
          </button>
          <button type="button" className={`nx-seg-btn ${accountType === ROLES.SERVICE_PROVIDER ? 'active' : ''}`} style={{ flex: 1 }} onClick={() => setAccountType(ROLES.SERVICE_PROVIDER)}>
            Service Provider
          </button>
        </div>

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="nx-grid-2" style={{ gap: 14 }}>
            <div>
              <label className="nx-label">Full Name (Primary Contact)</label>
              <input className="nx-input" placeholder="e.g. Riya Sharma" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <label className="nx-label">Work Email</label>
              <input type="email" className="nx-input" placeholder="name@company.in" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
          </div>

          {accountType !== ROLES.INDIVIDUAL && (
            <div className="nx-grid-2" style={{ gap: 14 }}>
              <div>
                <label className="nx-label">{accountType === ROLES.ORGANISATION ? 'Organisation Legal Name' : 'Service Firm Name'}</label>
                <input className="nx-input" placeholder="e.g. Horizon Industrial Solutions" value={orgName} onChange={(e) => setOrgName(e.target.value)} required />
              </div>
              <div>
                <label className="nx-label">Registration / CIN / GST Number</label>
                <input className="nx-input nx-mono" placeholder="CIN-U72900KA2024PTC..." value={regNo} onChange={(e) => setRegNo(e.target.value)} required />
              </div>
            </div>
          )}

          {/* Mobile OTP Verification Step */}
          <div style={{ padding: 14, borderRadius: 8, background: 'var(--nx-bg)', border: '1px solid var(--nx-border)' }}>
            <div className="nx-grid-2" style={{ gap: 12, alignItems: 'end' }}>
              <div>
                <label className="nx-label">Mobile Number (OTP Verification)</label>
                <input className="nx-input nx-mono" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {!otpVerified ? (
                  <button type="button" className="nx-btn nx-btn-secondary nx-btn-sm" onClick={handleRequestOtp}>
                    {otpRequested ? 'Resend OTP' : 'Send OTP'}
                  </button>
                ) : (
                  <StatusIndicator status="Verified" />
                )}
              </div>
            </div>
            {otpRequested && !otpVerified && (
              <div style={{ display: 'flex', gap: 10, marginTop: 12, alignItems: 'center' }}>
                <input
                  className="nx-input nx-mono"
                  style={{ maxWidth: 180 }}
                  placeholder="Enter 482910"
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                />
                <button type="button" className="nx-btn nx-btn-primary nx-btn-sm" onClick={handleVerifyOtp}>
                  Verify Code
                </button>
                <span style={{ fontSize: 12, color: 'var(--nx-text-muted)' }}>Demo code: 482910</span>
              </div>
            )}
          </div>

          <div className="nx-grid-3" style={{ gap: 14 }}>
            <div>
              <label className="nx-label">City</label>
              <input className="nx-input" value={city} onChange={(e) => setCity(e.target.value)} required />
            </div>
            <div>
              <label className="nx-label">State</label>
              <input className="nx-input" value={stateName} onChange={(e) => setStateName(e.target.value)} required />
            </div>
            <div>
              <label className="nx-label">PIN Code</label>
              <input className="nx-input nx-mono" value={pinCode} onChange={(e) => setPinCode(e.target.value)} maxLength={6} required />
            </div>
          </div>

          <div>
            <label className="nx-label">Create Password</label>
            <input type="password" className="nx-input" placeholder="Minimum 8 characters" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
          </div>

          <button type="submit" className="nx-btn nx-btn-primary" style={{ width: '100%', marginTop: 4 }}>
            Complete Registration & Launch Workspace
          </button>
        </form>
      </div>
    </div>
  );
}

/* ============================================================================
   6. WORKSPACE SHELL (SIDEBAR, TOP BAR, GLOBAL SEARCH, NOTIFICATIONS, ROLE SWITCH)
   ============================================================================ */

function AppLayout({ children }) {
  const {
    currentUser,
    users,
    listings,
    enquiries,
    conversations,
    notifications,
    verifications,
    settings,
    switchDemoRole,
    logout,
    markNotificationRead,
    markAllNotificationsRead,
    setGlobalSearchQuery
  } = useNexora();

  const location = useLocation();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState('');

  const userNotifications = useMemo(
    () => notifications.filter((n) => n.userId === currentUser.id),
    [notifications, currentUser.id]
  );
  const unreadNotifCount = userNotifications.filter((n) => !n.isRead).length;
  const unreadMessageCount = conversations.filter((c) => c.participants.includes(currentUser.id) && c.unreadFor.includes(currentUser.id)).length;
  const pendingVerifCount = verifications.filter((v) => v.status === 'Pending').length;
  const pendingListingCount = listings.filter((l) => l.status === 'Pending Approval').length;

  const navGroups = useMemo(() => {
    const role = currentUser.role;
    if (role === ROLES.ADMIN) {
      return [
        {
          label: 'Platform Governance',
          items: [
            { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
            { to: '/admin/users', label: 'User Management', icon: Users, count: users.length },
            { to: '/admin/organisations', label: 'Organisation Management', icon: Building2 },
            { to: '/admin/providers', label: 'Service Providers', icon: Briefcase },
            { to: '/admin/listings', label: 'Listing Management', icon: Layers, count: pendingListingCount || null },
            { to: '/admin/verifications', label: 'Verification Requests', icon: ShieldCheck, count: pendingVerifCount || null },
            { to: '/admin/enquiries', label: 'Enquiry Management', icon: FileText, count: enquiries.length }
          ]
        },
        {
          label: 'Taxonomy & Intelligence',
          items: [
            { to: '/admin/categories', label: 'Categories', icon: FolderKanban },
            { to: '/admin/locations', label: 'Location Management', icon: MapPin },
            { to: '/admin/analytics', label: 'Reports & Analytics', icon: BarChart3 },
            { to: '/admin/logs', label: 'Activity Logs', icon: Activity },
            { to: '/admin/settings', label: 'Platform Settings', icon: Settings }
          ]
        },
        {
          label: 'Personal Workspace',
          items: [
            { to: '/discover', label: 'Listing Discovery', icon: Compass },
            { to: '/messages', label: 'Messages', icon: MessageSquare, count: unreadMessageCount || null },
            { to: '/notifications', label: 'Notifications', icon: Bell, count: unreadNotifCount || null },
            { to: '/profile', label: 'My Profile', icon: UserCheck }
          ]
        }
      ];
    }

    if (role === ROLES.ORGANISATION) {
      return [
        {
          label: 'Organisation Workspace',
          items: [
            { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { to: '/my-listings', label: 'Organisation Listings', icon: Layers },
            { to: '/listings/new', label: 'Create Listing', icon: Plus },
            { to: '/enquiries', label: 'Enquiries', icon: FileText },
            { to: '/messages', label: 'Messages', icon: MessageSquare, count: unreadMessageCount || null },
            { to: '/analytics', label: 'Analytics & Reports', icon: BarChart3 }
          ]
        },
        {
          label: 'Ecosystem & Account',
          items: [
            { to: '/discover', label: 'Discover Ecosystem', icon: Compass },
            { to: '/organisation', label: 'Organisation Profile', icon: Building2 },
            { to: '/notifications', label: 'Notifications', icon: Bell, count: unreadNotifCount || null },
            { to: '/profile', label: 'Personal Profile', icon: UserCheck }
          ]
        }
      ];
    }

    if (role === ROLES.SERVICE_PROVIDER) {
      return [
        {
          label: 'Provider Operations',
          items: [
            { to: '/dashboard', label: 'Provider Dashboard', icon: LayoutDashboard },
            { to: '/my-listings', label: 'Service Catalogue', icon: Layers },
            { to: '/listings/new', label: 'Add New Service', icon: Plus },
            { to: '/enquiries', label: 'Incoming Enquiries', icon: FileText },
            { to: '/messages', label: 'Client Messages', icon: MessageSquare, count: unreadMessageCount || null },
            { to: '/analytics', label: 'Service Analytics', icon: BarChart3 }
          ]
        },
        {
          label: 'Discovery & Profile',
          items: [
            { to: '/discover', label: 'Nearby Opportunities', icon: Compass },
            { to: '/provider-profile', label: 'Service Profile', icon: Briefcase },
            { to: '/notifications', label: 'Notifications', icon: Bell, count: unreadNotifCount || null },
            { to: '/profile', label: 'Account Settings', icon: UserCheck }
          ]
        }
      ];
    }

    // Individual User
    return [
      {
        label: 'Workspace',
        items: [
          { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
          { to: '/discover', label: 'Discover Listings', icon: Compass },
          { to: '/enquiries', label: 'My Enquiries', icon: FileText },
          { to: '/messages', label: 'Messages', icon: MessageSquare, count: unreadMessageCount || null },
          { to: '/notifications', label: 'Notifications', icon: Bell, count: unreadNotifCount || null }
        ]
      },
      {
        label: 'Account',
        items: [
          { to: '/profile', label: 'Profile & Verification', icon: UserCheck },
          { to: '/my-listings', label: 'Saved & Drafts', icon: Bookmark }
        ]
      }
    ];
  }, [currentUser.role, users.length, pendingListingCount, pendingVerifCount, enquiries.length, unreadMessageCount, unreadNotifCount]);

  const handleGlobalSearch = (e) => {
    e.preventDefault();
    setGlobalSearchQuery(searchText);
    navigate('/discover');
  };

  return (
    <div className="nx-shell">
      <div className={`nx-sidebar-overlay ${sidebarOpen ? 'open' : ''}`} onClick={() => setSidebarOpen(false)} />

      {/* Sidebar */}
      <aside className={`nx-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="nx-sidebar-brand">
          <Link to="/dashboard" className="nx-wordmark" onClick={() => setSidebarOpen(false)}>
            <div className="nx-brand-mark">N</div>
            <span>NEXORA</span>
          </Link>
          <button
            type="button"
            className="nx-btn nx-btn-ghost nx-btn-sm nx-mobile-menu-btn"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="nx-nav-scroll" aria-label="Primary Sidebar">
          {navGroups.map((group) => (
            <div key={group.label}>
              <div className="nx-nav-group-label">{group.label}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = location.pathname === item.to || (item.to !== '/dashboard' && location.pathname.startsWith(item.to + '/'));
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setSidebarOpen(false)}
                      className={`nx-nav-item ${active ? 'active' : ''}`}
                    >
                      <span className="nx-nav-item-left">
                        <Icon size={16} aria-hidden="true" />
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.label}</span>
                      </span>
                      {item.count ? <span className="nx-nav-count">{item.count}</span> : null}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom Demo Role Switcher & Logout */}
        <div style={{ padding: 14, borderTop: '1px solid var(--nx-border)', background: '#fafbfd' }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--nx-text-muted)', marginBottom: 6 }}>
            Demo Role Switcher
          </div>
          <select
            aria-label="Switch demo role"
            className="nx-select"
            style={{ fontSize: 12.5, padding: '7px 10px', marginBottom: 10 }}
            value={currentUser.role}
            onChange={(e) => {
              switchDemoRole(e.target.value);
              navigate('/dashboard');
            }}
          >
            <option value={ROLES.INDIVIDUAL}>Individual User</option>
            <option value={ROLES.ORGANISATION}>Organisation</option>
            <option value={ROLES.SERVICE_PROVIDER}>Service Provider</option>
            <option value={ROLES.ADMIN}>Platform Administrator</option>
          </select>
          <button
            type="button"
            className="nx-btn nx-btn-secondary nx-btn-sm"
            style={{ width: '100%' }}
            onClick={() => {
              logout();
              navigate('/login');
            }}
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Column */}
      <div className="nx-main-wrap">
        {settings.maintenanceBannerEnabled && (
          <div style={{ background: '#1e293b', color: '#f8fafc', padding: '8px 24px', fontSize: 12.5, textAlign: 'center' }}>
            {settings.maintenanceMessage}
          </div>
        )}

        <header className="nx-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1, minWidth: 0 }}>
            <button
              type="button"
              className="nx-btn nx-btn-secondary nx-btn-sm nx-mobile-menu-btn"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={16} />
            </button>

            <form onSubmit={handleGlobalSearch} style={{ position: 'relative', flex: 1, maxWidth: 420 }}>
              <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--nx-text-muted)' }} />
              <input
                type="search"
                className="nx-input"
                style={{ paddingLeft: 36, height: 38, background: 'var(--nx-bg)' }}
                placeholder="Search listings, cities, PIN codes, providers..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </form>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, position: 'relative' }}>
            {currentUser.role !== ROLES.INDIVIDUAL && (
              <Link to="/listings/new" className="nx-btn nx-btn-primary nx-btn-sm">
                <Plus size={14} /> New Listing
              </Link>
            )}

            {/* Notifications Dropdown Trigger */}
            <div style={{ position: 'relative' }}>
              <button
                type="button"
                className="nx-btn nx-btn-secondary nx-btn-sm"
                onClick={() => { setNotifOpen((v) => !v); setRoleMenuOpen(false); }}
                aria-label="Notifications"
              >
                <Bell size={15} />
                {unreadNotifCount > 0 && <span className="nx-mono" style={{ fontSize: 11.5 }}>{unreadNotifCount}</span>}
              </button>

              {notifOpen && (
                <div
                  className="nx-card"
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 'calc(100% + 8px)',
                    width: 340,
                    boxShadow: 'var(--nx-shadow-md)',
                    zIndex: 50
                  }}
                >
                  <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--nx-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 13.5, fontWeight: 700 }}>Notifications</span>
                    <button
                      type="button"
                      onClick={() => markAllNotificationsRead()}
                      style={{ background: 'none', border: 'none', fontSize: 12, color: 'var(--nx-accent)', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Mark all read
                    </button>
                  </div>
                  <div style={{ maxHeight: 300, overflowY: 'auto' }}>
                    {userNotifications.length === 0 ? (
                      <div style={{ padding: 20, textAlign: 'center', fontSize: 13, color: 'var(--nx-text-muted)' }}>
                        No notifications for this account.
                      </div>
                    ) : (
                      userNotifications.slice(0, 5).map((n) => (
                        <div
                          key={n.id}
                          onClick={() => {
                            markNotificationRead(n.id);
                            setNotifOpen(false);
                            if (n.link) navigate(n.link);
                          }}
                          style={{
                            padding: '12px 16px',
                            borderBottom: '1px solid var(--nx-border)',
                            cursor: 'pointer',
                            background: n.isRead ? '#fff' : '#f8faff'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                            <span style={{ fontSize: 12.5, fontWeight: n.isRead ? 500 : 700, color: 'var(--nx-text)' }}>
                              {n.title}
                            </span>
                          </div>
                          <div style={{ fontSize: 12, color: 'var(--nx-text-muted)', marginTop: 3 }}>{n.message}</div>
                          <div style={{ fontSize: 11, color: 'var(--nx-text-muted)', marginTop: 4 }}>{n.category} · {n.time}</div>
                        </div>
                      ))
                    )}
                  </div>
                  <div style={{ padding: '10px 16px', textAlign: 'center', borderTop: '1px solid var(--nx-border)' }}>
                    <Link
                      to="/notifications"
                      onClick={() => setNotifOpen(false)}
                      style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--nx-accent)', textDecoration: 'none' }}
                    >
                      Open Notification Centre
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Menu Trigger */}
            <div style={{ position: 'relative' }}>
              <button
                type="button"
                className="nx-btn nx-btn-secondary nx-btn-sm"
                style={{ paddingLeft: 6, paddingRight: 10 }}
                onClick={() => { setRoleMenuOpen((v) => !v); setNotifOpen(false); }}
              >
                <AvatarInitials name={currentUser.name} size={24} />
                <span style={{ maxWidth: 140, overflow: 'hidden', textOverflow: 'ellipsis' }}>{currentUser.name}</span>
                <ChevronDown size={14} />
              </button>

              {roleMenuOpen && (
                <div
                  className="nx-card"
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 'calc(100% + 8px)',
                    width: 240,
                    boxShadow: 'var(--nx-shadow-md)',
                    zIndex: 50,
                    padding: 8
                  }}
                >
                  <div style={{ padding: '8px 10px', borderBottom: '1px solid var(--nx-border)', marginBottom: 6 }}>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{currentUser.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--nx-text-muted)' }}>{ROLE_LABELS[currentUser.role]}</div>
                  </div>
                  <Link to="/profile" className="nx-nav-item" onClick={() => setRoleMenuOpen(false)}>
                    <span className="nx-nav-item-left"><UserCheck size={15} /> Profile Settings</span>
                  </Link>
                  {currentUser.role === ROLES.ORGANISATION && (
                    <Link to="/organisation" className="nx-nav-item" onClick={() => setRoleMenuOpen(false)}>
                      <span className="nx-nav-item-left"><Building2 size={15} /> Organisation Profile</span>
                    </Link>
                  )}
                  <button
                    type="button"
                    className="nx-nav-item"
                    onClick={() => { setRoleMenuOpen(false); logout(); navigate('/login'); }}
                    style={{ color: 'var(--nx-danger)' }}
                  >
                    <span className="nx-nav-item-left"><LogOut size={15} /> Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="nx-content">{children}</main>
      </div>
    </div>
  );
}

/* ============================================================================
   7. ROLE-BASED DASHBOARDS (INDIVIDUAL, ORGANISATION, SERVICE PROVIDER, ADMIN)
   ============================================================================ */

function KpiCard({ label, value, meta, actionLabel, onAction }) {
  return (
    <div className="nx-card nx-card-pad" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 10 }}>
      <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--nx-text-muted)' }}>{label}</div>
      <div className="nx-tabular" style={{ fontSize: 28, fontWeight: 700, fontFamily: 'var(--nx-font-display)', lineHeight: 1.1 }}>
        {value}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <span style={{ fontSize: 12, color: 'var(--nx-text-muted)' }}>{meta}</span>
        {actionLabel && onAction && (
          <button
            type="button"
            onClick={onAction}
            style={{ background: 'none', border: 'none', color: 'var(--nx-accent)', fontSize: 12, fontWeight: 600, cursor: 'pointer', padding: 0 }}
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}

function IndividualDashboard() {
  const { currentUser, listings, savedIds, toggleSaveListing, enquiries, notifications, logs, navigate } = { ...useNexora(), navigate: useNavigate() };
  const activeListings = listings.filter((l) => l.status === 'Active');
  const nearbyListings = activeListings.filter((l) => l.city === currentUser.city || l.state === currentUser.state);
  const savedListings = listings.filter((l) => savedIds.includes(l.id));
  const myEnquiries = enquiries.filter((e) => e.senderId === currentUser.id);
  const myNotifs = notifications.filter((n) => n.userId === currentUser.id).slice(0, 4);

  return (
    <div>
      <div className="nx-page-header">
        <div>
          <h1 className="nx-page-title">Welcome back, {currentUser.name}</h1>
          <div className="nx-meta-line" style={{ marginTop: 4 }}>
            <span>{currentUser.title}</span>
            <span>·</span>
            <span>{currentUser.city}, {currentUser.state}</span>
            <span>·</span>
            <StatusIndicator status={currentUser.verificationStatus} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button type="button" className="nx-btn nx-btn-secondary" onClick={() => navigate('/profile')}>
            Complete Profile ({currentUser.profileCompletion}%)
          </button>
          <button type="button" className="nx-btn nx-btn-primary" onClick={() => navigate('/discover')}>
            <Compass size={15} /> Explore Opportunities
          </button>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="nx-grid-4" style={{ marginBottom: 22 }}>
        <KpiCard label="Profile Completion" value={`${currentUser.profileCompletion}%`} meta={`Status: ${currentUser.verificationStatus}`} actionLabel="Edit profile" onAction={() => navigate('/profile')} />
        <KpiCard label="Nearby Opportunities" value={nearbyListings.length} meta={`In ${currentUser.city} & region`} actionLabel="View map" onAction={() => navigate('/discover')} />
        <KpiCard label="Saved Listings" value={savedListings.length} meta="Bookmarked for evaluation" actionLabel="Browse all" onAction={() => navigate('/discover')} />
        <KpiCard label="Active Enquiries" value={myEnquiries.length} meta="Vendor & workspace threads" actionLabel="Track status" onAction={() => navigate('/enquiries')} />
      </div>

      {/* Profile completion bar */}
      <div className="nx-card nx-card-pad" style={{ marginBottom: 22, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 240 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 13.5, fontWeight: 600 }}>Identity & Enterprise Verification Progress</span>
            <span className="nx-mono" style={{ fontSize: 12.5, fontWeight: 600 }}>{currentUser.profileCompletion}%</span>
          </div>
          <div style={{ height: 8, background: 'var(--nx-surface-subtle)', borderRadius: 6, overflow: 'hidden' }}>
            <div style={{ width: `${currentUser.profileCompletion}%`, height: '100%', background: 'var(--nx-accent)' }} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button type="button" className="nx-btn nx-btn-secondary nx-btn-sm" onClick={() => navigate('/messages')}>
            Open Messages
          </button>
          <button type="button" className="nx-btn nx-btn-secondary nx-btn-sm" onClick={() => navigate('/enquiries')}>
            My Enquiries
          </button>
        </div>
      </div>

      <div className="nx-grid-split">
        {/* Left: Recommended & Nearby Listings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="nx-card nx-card-pad">
            <div className="nx-section-head">
              <div>
                <h2 style={{ fontSize: 16, fontWeight: 700 }}>Recommended & Nearby Opportunities</h2>
                <div style={{ fontSize: 12.5, color: 'var(--nx-text-muted)' }}>Matched to {currentUser.city} ({currentUser.pinCode}) and verified providers</div>
              </div>
              <Link to="/discover" style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--nx-accent)', textDecoration: 'none' }}>
                See all listings
              </Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {activeListings.slice(0, 4).map((item) => {
                const isSaved = savedIds.includes(item.id);
                return (
                  <div key={item.id} style={{ padding: '14px 16px', border: '1px solid var(--nx-border)', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                    <div style={{ minWidth: 220, flex: 1 }}>
                      <Link to={`/listings/${item.id}`} style={{ fontSize: 14, fontWeight: 600, color: 'var(--nx-text)', textDecoration: 'none' }}>
                        {item.title}
                      </Link>
                      <div className="nx-meta-line" style={{ marginTop: 4 }}>
                        <span>{item.category}</span>
                        <span>·</span>
                        <span>{item.city}, {item.state}</span>
                        <span>·</span>
                        <span className="nx-mono">{item.pricingLabel}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <button
                        type="button"
                        className="nx-btn nx-btn-secondary nx-btn-sm"
                        onClick={() => toggleSaveListing(item.id)}
                      >
                        <Bookmark size={14} fill={isSaved ? 'currentColor' : 'none'} />
                        {isSaved ? 'Saved' : 'Save'}
                      </button>
                      <Link to={`/listings/${item.id}`} className="nx-btn nx-btn-primary nx-btn-sm">
                        Inspect
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Saved Listings */}
          <div className="nx-card nx-card-pad">
            <div className="nx-section-head">
              <h2 style={{ fontSize: 16, fontWeight: 700 }}>Saved Shortlist</h2>
              <span className="nx-mono" style={{ fontSize: 12, color: 'var(--nx-text-muted)' }}>{savedListings.length} saved</span>
            </div>
            {savedListings.length === 0 ? (
              <p style={{ fontSize: 13, color: 'var(--nx-text-muted)', margin: 0 }}>
                No listings saved yet. Use Save on any listing in Discovery to track it here.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {savedListings.map((s) => (
                  <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10, borderBottom: '1px solid var(--nx-border)' }}>
                    <div>
                      <Link to={`/listings/${s.id}`} style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--nx-text)', textDecoration: 'none' }}>{s.title}</Link>
                      <div style={{ fontSize: 12, color: 'var(--nx-text-muted)' }}>{s.providerName} · {s.city}</div>
                    </div>
                    <Link to={`/listings/${s.id}`} className="nx-btn nx-btn-ghost nx-btn-sm">Open</Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Recent Interactions, Notifications & Activity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="nx-card nx-card-pad">
            <div className="nx-section-head">
              <h2 style={{ fontSize: 16, fontWeight: 700 }}>Recent Interactions</h2>
              <Link to="/enquiries" style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--nx-accent)', textDecoration: 'none' }}>All enquiries</Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {myEnquiries.map((enq) => (
                <div key={enq.id} style={{ paddingBottom: 12, borderBottom: '1px solid var(--nx-border)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 13.5, fontWeight: 600 }}>{enq.recipientName}</span>
                    <StatusIndicator status={enq.status} />
                  </div>
                  <div style={{ fontSize: 12.5, color: 'var(--nx-text-muted)' }}>{enq.subject}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--nx-text-muted)', marginTop: 4 }}>Updated {enq.updatedAt}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="nx-card nx-card-pad">
            <div className="nx-section-head">
              <h2 style={{ fontSize: 16, fontWeight: 700 }}>Notifications & Activity</h2>
              <Link to="/notifications" style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--nx-accent)', textDecoration: 'none' }}>View centre</Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {myNotifs.map((n) => (
                <div key={n.id} style={{ fontSize: 12.5, paddingBottom: 10, borderBottom: '1px solid var(--nx-border)' }}>
                  <div style={{ fontWeight: 600, color: 'var(--nx-text)' }}>{n.title}</div>
                  <div style={{ color: 'var(--nx-text-muted)', marginTop: 2 }}>{n.time} · {n.category}</div>
                </div>
              ))}
              {logs.slice(0, 2).map((l) => (
                <div key={l.id} style={{ fontSize: 12, color: 'var(--nx-text-muted)' }}>
                  <span className="nx-mono">{l.timestamp}</span> · {l.summary}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrganisationDashboard() {
  const { currentUser, organisations, listings, enquiries, logs } = useNexora();
  const navigate = useNavigate();

  const org = organisations.find((o) => o.id === currentUser.organisationId) || organisations[0];
  const orgListings = listings.filter((l) => l.organisationId === org.id || l.ownerId === currentUser.id);
  const activeCount = orgListings.filter((l) => l.status === 'Active').length;
  const pendingCount = orgListings.filter((l) => l.status === 'Pending Approval').length;
  const orgEnquiries = enquiries.filter((e) => e.recipientId === currentUser.id || e.senderId === currentUser.id);
  const totalViews = orgListings.reduce((sum, l) => sum + (l.views || 0), 0);

  return (
    <div>
      <div className="nx-page-header">
        <div>
          <h1 className="nx-page-title">{org.name}</h1>
          <div className="nx-meta-line" style={{ marginTop: 4 }}>
            <span className="nx-mono">{org.registrationNo}</span>
            <span>·</span>
            <span>{org.city}, {org.state}</span>
            <span>·</span>
            <StatusIndicator status={org.verificationStatus} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button type="button" className="nx-btn nx-btn-secondary" onClick={() => navigate('/organisation')}>
            <Users size={15} /> Manage Team ({org.members.length})
          </button>
          <button type="button" className="nx-btn nx-btn-primary" onClick={() => navigate('/listings/new')}>
            <Plus size={15} /> Create Listing
          </button>
        </div>
      </div>

      <div className="nx-grid-4" style={{ marginBottom: 22 }}>
        <KpiCard label="Total Listings" value={orgListings.length} meta="Across active & draft states" actionLabel="Manage" onAction={() => navigate('/my-listings')} />
        <KpiCard label="Active Listings" value={activeCount} meta={`${pendingCount} pending approval`} actionLabel="View active" onAction={() => navigate('/my-listings')} />
        <KpiCard label="User Enquiries" value={orgEnquiries.length} meta="Inbound & outbound threads" actionLabel="Respond" onAction={() => navigate('/enquiries')} />
        <KpiCard label="Listing Engagement" value={totalViews.toLocaleString()} meta="Cumulative impressions" actionLabel="Analytics" onAction={() => navigate('/analytics')} />
      </div>

      <div className="nx-grid-split">
        <div className="nx-card">
          <div style={{ padding: '18px 20px', borderBottom: '1px solid var(--nx-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: 16, fontWeight: 700 }}>Organisation Listing Portfolio</h2>
            <Link to="/my-listings" style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--nx-accent)', textDecoration: 'none' }}>Open Full Manager</Link>
          </div>
          <div className="nx-table-wrap">
            <table className="nx-table">
              <thead>
                <tr>
                  <th>Listing Title</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Views</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orgListings.map((l) => (
                  <tr key={l.id}>
                    <td style={{ fontWeight: 600, color: 'var(--nx-text)' }}>{l.title}</td>
                    <td>{l.city} · <span className="nx-mono">{l.pinCode}</span></td>
                    <td><StatusIndicator status={l.status} /></td>
                    <td style={{ textAlign: 'right' }} className="nx-tabular">{l.views.toLocaleString()}</td>
                    <td style={{ textAlign: 'right' }}>
                      <Link to={`/listings/${l.id}/edit`} className="nx-btn nx-btn-ghost nx-btn-sm">Edit</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="nx-card nx-card-pad">
            <div className="nx-section-head">
              <h2 style={{ fontSize: 16, fontWeight: 700 }}>Team Members</h2>
              <Link to="/organisation" style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--nx-accent)', textDecoration: 'none' }}>Manage</Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {org.members.map((m) => (
                <div key={m.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <AvatarInitials name={m.name} size={32} />
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 600 }}>{m.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--nx-text-muted)' }}>{m.role}</div>
                    </div>
                  </div>
                  <StatusIndicator status={m.status} />
                </div>
              ))}
            </div>
          </div>

          <div className="nx-card nx-card-pad">
            <div className="nx-section-head">
              <h2 style={{ fontSize: 16, fontWeight: 700 }}>Recent Activity</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {logs.slice(0, 4).map((l) => (
                <div key={l.id} style={{ fontSize: 12.5, paddingBottom: 8, borderBottom: '1px solid var(--nx-border)' }}>
                  <div style={{ fontWeight: 600, color: 'var(--nx-text)' }}>{l.summary}</div>
                  <div className="nx-mono" style={{ fontSize: 11.5, color: 'var(--nx-text-muted)', marginTop: 2 }}>{l.timestamp}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServiceProviderDashboard() {
  const { currentUser, listings, enquiries } = useNexora();
  const navigate = useNavigate();

  const myServices = listings.filter((l) => l.ownerId === currentUser.id);
  const incomingEnquiries = enquiries.filter((e) => e.recipientId === currentUser.id);
  const nearbyOpportunities = listings.filter((l) => l.ownerId !== currentUser.id && l.status === 'Active');

  const perfData = ANALYTICS_SERIES['30D'];

  return (
    <div>
      <div className="nx-page-header">
        <div>
          <h1 className="nx-page-title">Service Provider Operations</h1>
          <div className="nx-meta-line" style={{ marginTop: 4 }}>
            <span>{currentUser.name}</span>
            <span>·</span>
            <span>{currentUser.city}, {currentUser.state}</span>
            <span>·</span>
            <span>Rating {currentUser.rating || 4.9}/5.0 ({currentUser.reviewCount || 47} reviews)</span>
            <span>·</span>
            <StatusIndicator status={currentUser.verificationStatus} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button type="button" className="nx-btn nx-btn-secondary" onClick={() => navigate('/provider-profile')}>
            Service Profile
          </button>
          <button type="button" className="nx-btn nx-btn-primary" onClick={() => navigate('/listings/new')}>
            <Plus size={15} /> Publish Service
          </button>
        </div>
      </div>

      <div className="nx-grid-4" style={{ marginBottom: 22 }}>
        <KpiCard label="Active Services" value={myServices.filter((s) => s.status === 'Active').length} meta={`${myServices.length} total catalogue items`} actionLabel="Catalogue" onAction={() => navigate('/my-listings')} />
        <KpiCard label="Incoming Enquiries" value={incomingEnquiries.length} meta="Active client requests" actionLabel="Respond" onAction={() => navigate('/enquiries')} />
        <KpiCard label="Average Rating" value={`${currentUser.rating || 4.9}`} meta={`From ${currentUser.reviewCount || 47} enterprise audits`} actionLabel="Reviews" onAction={() => navigate('/provider-profile')} />
        <KpiCard label="Regional Demand" value={nearbyOpportunities.length} meta="Active ecosystem tenders" actionLabel="Discover" onAction={() => navigate('/discover')} />
      </div>

      <div className="nx-grid-split">
        <div className="nx-card nx-card-pad">
          <div className="nx-section-head">
            <div>
              <h2 style={{ fontSize: 16, fontWeight: 700 }}>Service Performance & Enquiry Conversion</h2>
              <div style={{ fontSize: 12.5, color: 'var(--nx-text-muted)' }}>30-day rolling service request throughput</div>
            </div>
            <Link to="/analytics" style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--nx-accent)', textDecoration: 'none' }}>Full Analytics</Link>
          </div>
          <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={perfData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="period" tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="enquiries" name="Incoming Enquiries" fill="#4338ca" radius={[4, 4, 0, 0]} />
                <Bar dataKey="converted" name="Converted Contracts" fill="#16a34a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="nx-card nx-card-pad">
          <div className="nx-section-head">
            <h2 style={{ fontSize: 16, fontWeight: 700 }}>Incoming Client Enquiries</h2>
            <Link to="/enquiries" style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--nx-accent)', textDecoration: 'none' }}>Manage queue</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {incomingEnquiries.map((enq) => (
              <div key={enq.id} style={{ padding: 12, border: '1px solid var(--nx-border)', borderRadius: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontSize: 13.5, fontWeight: 600 }}>{enq.senderName}</span>
                  <StatusIndicator status={enq.status} />
                </div>
                <div style={{ fontSize: 12.5, color: 'var(--nx-text-secondary)' }}>{enq.subject}</div>
                <div style={{ fontSize: 12, color: 'var(--nx-text-muted)', marginTop: 4 }}>Budget: {enq.budget} · {enq.createdAt}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminOverviewDashboard() {
  const { users, organisations, listings, verifications, enquiries, logs } = useNexora();
  const navigate = useNavigate();

  const serviceProviders = users.filter((u) => u.role === ROLES.SERVICE_PROVIDER);
  const pendingVerifs = verifications.filter((v) => v.status === 'Pending');
  const activeUsers = users.filter((u) => u.accountStatus === 'Active');
  const pendingListings = listings.filter((l) => l.status === 'Pending Approval');
  const chartData = ANALYTICS_SERIES['90D'];

  return (
    <div>
      <div className="nx-page-header">
        <div>
          <h1 className="nx-page-title">Platform Administration Overview</h1>
          <p className="nx-page-subtitle">
            Centralised governance across multi-user accounts, organisation verification, listing moderation, and ecosystem analytics.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button type="button" className="nx-btn nx-btn-secondary" onClick={() => navigate('/admin/verifications')}>
            Review Verifications ({pendingVerifs.length})
          </button>
          <button type="button" className="nx-btn nx-btn-primary" onClick={() => navigate('/admin/analytics')}>
            <BarChart3 size={15} /> Analytics & Export
          </button>
        </div>
      </div>

      {/* 6 Core Platform Metrics */}
      <div className="nx-grid-3" style={{ marginBottom: 22 }}>
        <KpiCard label="Total Registered Users" value={users.length} meta={`${activeUsers.length} active accounts`} actionLabel="User directory" onAction={() => navigate('/admin/users')} />
        <KpiCard label="Total Organisations" value={organisations.length} meta="Verified & onboarding entities" actionLabel="Manage orgs" onAction={() => navigate('/admin/organisations')} />
        <KpiCard label="Service Providers" value={serviceProviders.length} meta="Certified partner firms" actionLabel="Providers" onAction={() => navigate('/admin/providers')} />
        <KpiCard label="Total Platform Listings" value={listings.length} meta={`${pendingListings.length} awaiting approval`} actionLabel="Moderate" onAction={() => navigate('/admin/listings')} />
        <KpiCard label="Pending Verifications" value={pendingVerifs.length} meta="Compliance review queue" actionLabel="Review queue" onAction={() => navigate('/admin/verifications')} />
        <KpiCard label="Total Enquiries Tracked" value={enquiries.length} meta="Workflow SLA monitored" actionLabel="View enquiries" onAction={() => navigate('/admin/enquiries')} />
      </div>

      {/* Charts */}
      <div className="nx-grid-2" style={{ marginBottom: 22 }}>
        <div className="nx-card nx-card-pad">
          <div className="nx-section-head">
            <h2 style={{ fontSize: 16, fontWeight: 700 }}>User & Organisation Growth (90D)</h2>
          </div>
          <div style={{ width: '100%', height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="period" tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="users" name="Registered Users" stroke="#4338ca" fill="#eef2ff" strokeWidth={2} />
                <Area type="monotone" dataKey="orgs" name="Organisations" stroke="#0f766e" fill="#f0fdfa" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="nx-card nx-card-pad">
          <div className="nx-section-head">
            <h2 style={{ fontSize: 16, fontWeight: 700 }}>Listing Creation vs Active Inventory</h2>
          </div>
          <div style={{ width: '100%', height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="period" tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="listings" name="Created Listings" fill="#4338ca" radius={[4, 4, 0, 0]} />
                <Bar dataKey="activeListings" name="Active Listings" fill="#16a34a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Pending Tasks & Recent Registrations */}
      <div className="nx-grid-2">
        <div className="nx-card nx-card-pad">
          <div className="nx-section-head">
            <h2 style={{ fontSize: 16, fontWeight: 700 }}>Pending Administrative Tasks</h2>
            <Link to="/admin/verifications" style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--nx-accent)', textDecoration: 'none' }}>Open queue</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {pendingVerifs.map((v) => (
              <div key={v.id} style={{ padding: '12px 14px', border: '1px solid var(--nx-border)', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 600 }}>{v.entityName}</div>
                  <div style={{ fontSize: 12, color: 'var(--nx-text-muted)' }}>{v.entityType} Verification · {v.documentName}</div>
                </div>
                <button type="button" className="nx-btn nx-btn-primary nx-btn-sm" onClick={() => navigate('/admin/verifications')}>
                  Inspect
                </button>
              </div>
            ))}
            {pendingListings.map((l) => (
              <div key={l.id} style={{ padding: '12px 14px', border: '1px solid var(--nx-border)', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 600 }}>{l.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--nx-text-muted)' }}>Listing Approval · {l.providerName}</div>
                </div>
                <button type="button" className="nx-btn nx-btn-primary nx-btn-sm" onClick={() => navigate('/admin/listings')}>
                  Moderate
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="nx-card nx-card-pad">
          <div className="nx-section-head">
            <h2 style={{ fontSize: 16, fontWeight: 700 }}>Recent Registrations & System Logs</h2>
            <Link to="/admin/logs" style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--nx-accent)', textDecoration: 'none' }}>Audit trail</Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {users.slice(-3).reverse().map((u) => (
              <div key={u.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10, borderBottom: '1px solid var(--nx-border)' }}>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 600 }}>{u.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--nx-text-muted)' }}>{ROLE_LABELS[u.role]} · {u.city} · Joined {u.createdAt}</div>
                </div>
                <StatusIndicator status={u.verificationStatus} />
              </div>
            ))}
            {logs.slice(0, 2).map((l) => (
              <div key={l.id} style={{ fontSize: 12, color: 'var(--nx-text-muted)' }}>
                <span className="nx-mono">{l.timestamp}</span> · <strong>{l.actor}</strong>: {l.summary}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   8. LISTING DISCOVERY, GEOSPATIAL MAP, DETAILS, CREATE/EDIT & MY LISTINGS
   ============================================================================ */

function ListingDiscoveryScreen() {
  const { listings, categories, locations, savedIds, toggleSaveListing, globalSearchQuery, setGlobalSearchQuery, sendEnquiry } = useNexora();
  const [keyword, setKeyword] = useState(globalSearchQuery || '');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [stateFilter, setStateFilter] = useState('All');
  const [cityFilter, setCityFilter] = useState('All');
  const [pinFilter, setPinFilter] = useState('');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('split'); // 'grid' | 'split'
  const [selectedMapListing, setSelectedMapListing] = useState(null);
  const [enquiryModalListing, setEnquiryModalListing] = useState(null);
  const [enquirySubject, setEnquirySubject] = useState('');
  const [enquiryBody, setEnquiryBody] = useState('');

  useEffect(() => {
    if (globalSearchQuery) {
      setKeyword(globalSearchQuery);
    }
  }, [globalSearchQuery]);

  const uniqueStates = useMemo(() => [...new Set(locations.map((l) => l.state))], [locations]);
  const availableCities = useMemo(() => {
    if (stateFilter === 'All') return locations.map((l) => l.city);
    return locations.filter((l) => l.state === stateFilter).map((l) => l.city);
  }, [locations, stateFilter]);

  const filtered = useMemo(() => {
    const kw = keyword.trim().toLowerCase();
    const pin = pinFilter.trim().toLowerCase();

    let result = listings.filter((item) => {
      if (!['Active', 'Approved'].includes(item.status)) return false;
      if (categoryFilter !== 'All' && item.category !== categoryFilter) return false;
      if (stateFilter !== 'All' && item.state !== stateFilter) return false;
      if (cityFilter !== 'All' && item.city !== cityFilter) return false;
      if (verifiedOnly && !item.providerVerified) return false;
      if (pin && !item.pinCode.toLowerCase().includes(pin)) return false;
      if (kw) {
        const hay = `${item.title} ${item.description} ${item.category} ${item.city} ${item.state} ${item.pinCode} ${item.providerName}`.toLowerCase();
        if (!hay.includes(kw)) return false;
      }
      return true;
    });

    if (sortBy === 'newest') {
      result = [...result].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    } else if (sortBy === 'popular') {
      result = [...result].sort((a, b) => (b.views || 0) - (a.views || 0));
    } else {
      result = [...result].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    return result;
  }, [listings, keyword, categoryFilter, stateFilter, cityFilter, pinFilter, verifiedOnly, sortBy]);

  const handleResetFilters = () => {
    setKeyword('');
    setGlobalSearchQuery('');
    setCategoryFilter('All');
    setStateFilter('All');
    setCityFilter('All');
    setPinFilter('');
    setVerifiedOnly(false);
  };

  return (
    <div>
      <div className="nx-page-header">
        <div>
          <h1 className="nx-page-title">Enterprise Listing Discovery & Location Services</h1>
          <p className="nx-page-subtitle">
            Search verified services, workspaces, and logistics hubs by category, city, state, or PIN code.
          </p>
        </div>
        <div className="nx-segmented">
          <button type="button" className={`nx-seg-btn ${viewMode === 'split' ? 'active' : ''}`} onClick={() => setViewMode('split')}>
            Map & List Split
          </button>
          <button type="button" className={`nx-seg-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}>
            Grid Cards
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="nx-card nx-card-pad" style={{ marginBottom: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 12, alignItems: 'end' }}>
          <div>
            <label className="nx-label">Keyword</label>
            <input className="nx-input" placeholder="Cloud, Hub, SOC..." value={keyword} onChange={(e) => setKeyword(e.target.value)} />
          </div>
          <div>
            <label className="nx-label">Category</label>
            <select className="nx-select" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option value="All">All Categories</option>
              {categories.filter((c) => c.active).map((c) => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="nx-label">State</label>
            <select className="nx-select" value={stateFilter} onChange={(e) => { setStateFilter(e.target.value); setCityFilter('All'); }}>
              <option value="All">All States</option>
              {uniqueStates.map((st) => <option key={st} value={st}>{st}</option>)}
            </select>
          </div>
          <div>
            <label className="nx-label">City</label>
            <select className="nx-select" value={cityFilter} onChange={(e) => setCityFilter(e.target.value)}>
              <option value="All">All Cities</option>
              {availableCities.map((ct) => <option key={ct} value={ct}>{ct}</option>)}
            </select>
          </div>
          <div>
            <label className="nx-label">PIN Code</label>
            <input className="nx-input nx-mono" placeholder="e.g. 560001" value={pinFilter} onChange={(e) => setPinFilter(e.target.value)} maxLength={6} />
          </div>
          <div>
            <label className="nx-label">Sort By</label>
            <select className="nx-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="relevance">Relevance & Rating</option>
              <option value="newest">Newest First</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>
        <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
            <input type="checkbox" checked={verifiedOnly} onChange={(e) => setVerifiedOnly(e.target.checked)} />
            <span>Verified providers & organisations only</span>
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span className="nx-mono" style={{ fontSize: 12.5, color: 'var(--nx-text-muted)' }}>{filtered.length} matching results</span>
            <button type="button" className="nx-btn nx-btn-ghost nx-btn-sm" onClick={handleResetFilters}>Reset Filters</button>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyPanel
          icon={Compass}
          title="No matching listings found"
          description="Try broadening your PIN code, city, or category filters to explore active enterprise listings across NEXORA."
          actionLabel="Clear All Filters"
          onAction={handleResetFilters}
        />
      ) : viewMode === 'split' ? (
        <div className="nx-grid-split">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {filtered.map((item) => {
              const isSaved = savedIds.includes(item.id);
              const isSelected = selectedMapListing?.id === item.id;
              return (
                <div
                  key={item.id}
                  className="nx-card nx-card-pad"
                  style={{
                    borderColor: isSelected ? 'var(--nx-accent)' : 'var(--nx-border)',
                    cursor: 'pointer'
                  }}
                  onClick={() => setSelectedMapListing(item)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 6 }}>
                    <Link to={`/listings/${item.id}`} style={{ fontSize: 15.5, fontWeight: 700, color: 'var(--nx-text)', textDecoration: 'none' }}>
                      {item.title}
                    </Link>
                    {item.providerVerified && <StatusIndicator status="Verified" />}
                  </div>
                  <div className="nx-meta-line" style={{ marginBottom: 8 }}>
                    <span>{item.category}</span>
                    <span>·</span>
                    <span>{item.city}, {item.state}</span>
                    <span>·</span>
                    <span className="nx-mono">PIN {item.pinCode}</span>
                    <span>·</span>
                    <span>★ {item.rating} ({item.reviewCount})</span>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--nx-text-secondary)', margin: '0 0 12px' }}>
                    {item.description}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                    <div style={{ fontSize: 12.5, color: 'var(--nx-text-muted)' }}>
                      Provider: <strong style={{ color: 'var(--nx-text)' }}>{item.providerName}</strong> · <span className="nx-mono">{item.pricingLabel}</span>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }} onClick={(e) => e.stopPropagation()}>
                      <button type="button" className="nx-btn nx-btn-secondary nx-btn-sm" onClick={() => toggleSaveListing(item.id)}>
                        <Bookmark size={14} fill={isSaved ? 'currentColor' : 'none'} />
                        {isSaved ? 'Saved' : 'Save'}
                      </button>
                      <button
                        type="button"
                        className="nx-btn nx-btn-secondary nx-btn-sm"
                        onClick={() => {
                          setEnquiryModalListing(item);
                          setEnquirySubject(`Enquiry regarding ${item.title}`);
                          setEnquiryBody('');
                        }}
                      >
                        Send Enquiry
                      </button>
                      <Link to={`/listings/${item.id}`} className="nx-btn nx-btn-primary nx-btn-sm">
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ position: 'sticky', top: 84 }}>
            <InteractiveGeoMap
              listings={filtered}
              selectedId={selectedMapListing?.id}
              onSelectListing={(item) => setSelectedMapListing(item)}
              focusCity={cityFilter}
              height={460}
            />
          </div>
        </div>
      ) : (
        <div className="nx-grid-3">
          {filtered.map((item) => {
            const isSaved = savedIds.includes(item.id);
            return (
              <div key={item.id} className="nx-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <ListingVisualBanner listing={item} height={126} />
                  <div style={{ padding: 18 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 6 }}>
                      <Link to={`/listings/${item.id}`} style={{ fontSize: 15, fontWeight: 700, color: 'var(--nx-text)', textDecoration: 'none', lineHeight: 1.3 }}>
                        {item.title}
                      </Link>
                    </div>
                    <div className="nx-meta-line" style={{ marginBottom: 10 }}>
                      <span>{item.providerName}</span>
                      <span>·</span>
                      <span>★ {item.rating}</span>
                      {item.providerVerified && <><span>·</span><span style={{ color: 'var(--nx-success)', fontWeight: 600 }}>Verified</span></>}
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--nx-text-secondary)', margin: 0, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {item.description}
                    </p>
                  </div>
                </div>
                <div style={{ padding: '12px 18px', borderTop: '1px solid var(--nx-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                  <button type="button" className="nx-btn nx-btn-ghost nx-btn-sm" onClick={() => toggleSaveListing(item.id)}>
                    <Bookmark size={14} fill={isSaved ? 'currentColor' : 'none'} /> {isSaved ? 'Saved' : 'Save'}
                  </button>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      type="button"
                      className="nx-btn nx-btn-secondary nx-btn-sm"
                      onClick={() => {
                        setEnquiryModalListing(item);
                        setEnquirySubject(`Enquiry regarding ${item.title}`);
                        setEnquiryBody('');
                      }}
                    >
                      Enquire
                    </button>
                    <Link to={`/listings/${item.id}`} className="nx-btn nx-btn-primary nx-btn-sm">View</Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Quick Enquiry Modal */}
      {enquiryModalListing && (
        <div className="nx-backdrop" role="dialog" aria-modal="true">
          <div className="nx-modal">
            <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--nx-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: 16, fontWeight: 700 }}>Send Enterprise Enquiry</h3>
              <button type="button" className="nx-btn nx-btn-ghost nx-btn-sm" onClick={() => setEnquiryModalListing(null)}><X size={16} /></button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendEnquiry({ listing: enquiryModalListing, subject: enquirySubject, message: enquiryBody });
                setEnquiryModalListing(null);
              }}
              style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 14 }}
            >
              <div style={{ fontSize: 13, color: 'var(--nx-text-muted)' }}>
                Recipient: <strong style={{ color: 'var(--nx-text)' }}>{enquiryModalListing.providerName}</strong> ({enquiryModalListing.city})
              </div>
              <div>
                <label className="nx-label">Subject</label>
                <input className="nx-input" value={enquirySubject} onChange={(e) => setEnquirySubject(e.target.value)} required />
              </div>
              <div>
                <label className="nx-label">Requirements & Timeline</label>
                <textarea className="nx-textarea" placeholder="Describe project scope, capacity requirements, or preferred inspection dates..." value={enquiryBody} onChange={(e) => setEnquiryBody(e.target.value)} required />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <button type="button" className="nx-btn nx-btn-secondary nx-btn-sm" onClick={() => setEnquiryModalListing(null)}>Cancel</button>
                <button type="submit" className="nx-btn nx-btn-primary nx-btn-sm"><Send size={14} /> Submit Enquiry</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function ListingDetailsScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { listings, currentUser, savedIds, toggleSaveListing, sendEnquiry } = useNexora();

  const listing = listings.find((l) => l.id === id);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [budget, setBudget] = useState('');

  useEffect(() => {
    if (listing) {
      setSubject(`Proposal & SLA Request: ${listing.title}`);
    }
  }, [listing]);

  if (!listing) {
    return (
      <EmptyPanel
        title="Listing not found"
        description="This listing may have been removed or is unavailable."
        actionLabel="Return to Discovery"
        onAction={() => navigate('/discover')}
      />
    );
  }

  const isSaved = savedIds.includes(listing.id);
  const canEdit = currentUser.role === ROLES.ADMIN || listing.ownerId === currentUser.id;

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <button type="button" className="nx-btn nx-btn-ghost nx-btn-sm" onClick={() => navigate(-1)}>
          <ChevronLeft size={15} /> Back
        </button>
      </div>

      <div className="nx-card" style={{ overflow: 'hidden', marginBottom: 22 }}>
        <ListingVisualBanner listing={listing} height={180} />
        <div className="nx-card-pad">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
            <div>
              <div className="nx-meta-line" style={{ marginBottom: 6 }}>
                <span>{listing.category}</span>
                <span>·</span>
                <span>Created {listing.createdAt}</span>
                <span>·</span>
                <span>Updated {listing.updatedAt}</span>
              </div>
              <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>{listing.title}</h1>
              <div className="nx-meta-line">
                <StatusIndicator status={listing.status} />
                {listing.providerVerified && <StatusIndicator status="Verified" />}
                <span>★ {listing.rating} ({listing.reviewCount} reviews)</span>
                <span>·</span>
                <span className="nx-tabular">{listing.views.toLocaleString()} views</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button type="button" className="nx-btn nx-btn-secondary" onClick={() => toggleSaveListing(listing.id)}>
                <Bookmark size={15} fill={isSaved ? 'currentColor' : 'none'} />
                {isSaved ? 'Saved' : 'Save Listing'}
              </button>
              {canEdit && (
                <Link to={`/listings/${listing.id}/edit`} className="nx-btn nx-btn-primary">
                  <Edit3 size={15} /> Edit Listing
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="nx-grid-split">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="nx-card nx-card-pad">
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10 }}>Scope & Technical Overview</h2>
            <p style={{ fontSize: 14, color: 'var(--nx-text-secondary)', margin: '0 0 18px', lineHeight: 1.65 }}>
              {listing.description}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14, paddingTop: 16, borderTop: '1px solid var(--nx-border)' }}>
              <div>
                <div style={{ fontSize: 12, color: 'var(--nx-text-muted)' }}>Commercial Terms</div>
                <div className="nx-mono" style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>{listing.pricingLabel || 'Custom Quote'}</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: 'var(--nx-text-muted)' }}>Street Address</div>
                <div style={{ fontSize: 13.5, fontWeight: 600, marginTop: 2 }}>{listing.address}</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: 'var(--nx-text-muted)' }}>City, State & PIN</div>
                <div style={{ fontSize: 13.5, fontWeight: 600, marginTop: 2 }}>{listing.city}, {listing.state} · <span className="nx-mono">{listing.pinCode}</span></div>
              </div>
            </div>
          </div>

          <InteractiveGeoMap listings={[listing]} selectedId={listing.id} height={300} focusCity={listing.city} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="nx-card nx-card-pad">
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Organisation / Provider</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <AvatarInitials name={listing.providerName} size={42} />
              <div>
                <div style={{ fontSize: 14.5, fontWeight: 700 }}>{listing.providerName}</div>
                <div style={{ fontSize: 12.5, color: 'var(--nx-text-muted)' }}>{listing.providerVerified ? 'KYC & Compliance Verified' : 'Verification Pending'}</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13, color: 'var(--nx-text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Mail size={14} /> {listing.contactEmail}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Phone size={14} /> <span className="nx-mono">{listing.contactPhone}</span></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><MapPin size={14} /> {listing.city}, {listing.state} ({listing.pinCode})</div>
            </div>
          </div>

          <div className="nx-card nx-card-pad">
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Submit Direct Enquiry</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendEnquiry({ listing, subject, message, budget });
                setMessage('');
                setBudget('');
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
            >
              <div>
                <label className="nx-label">Subject</label>
                <input className="nx-input" value={subject} onChange={(e) => setSubject(e.target.value)} required />
              </div>
              <div>
                <label className="nx-label">Estimated Budget / Scale</label>
                <input className="nx-input" placeholder="e.g. ₹4.5L or 80 seats" value={budget} onChange={(e) => setBudget(e.target.value)} />
              </div>
              <div>
                <label className="nx-label">Message</label>
                <textarea className="nx-textarea" placeholder="Share deployment timeline, SLA expectations, or questions..." value={message} onChange={(e) => setMessage(e.target.value)} required />
              </div>
              <button type="submit" className="nx-btn nx-btn-primary">
                <Send size={14} /> Send Enquiry & Open Thread
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function CreateEditListingScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { listings, categories, currentUser, saveListing } = useNexora();

  const existing = id ? listings.find((l) => l.id === id) : null;

  const [title, setTitle] = useState(existing?.title || '');
  const [description, setDescription] = useState(existing?.description || '');
  const [category, setCategory] = useState(existing?.category || categories[0]?.name || 'Cloud & IT Infrastructure');
  const [pricingLabel, setPricingLabel] = useState(existing?.pricingLabel || '₹2.5L / engagement');
  const [contactEmail, setContactEmail] = useState(existing?.contactEmail || currentUser.email);
  const [contactPhone, setContactPhone] = useState(existing?.contactPhone || currentUser.mobile);
  const [address, setAddress] = useState(existing?.address || currentUser.address || '');
  const [city, setCity] = useState(existing?.city || currentUser.city || 'Bengaluru');
  const [stateName, setStateName] = useState(existing?.state || currentUser.state || 'Karnataka');
  const [pinCode, setPinCode] = useState(existing?.pinCode || currentUser.pinCode || '560001');
  const [visualTheme, setVisualTheme] = useState(existing?.visualTheme || 'indigo');
  const [customImage, setCustomImage] = useState(existing?.customImage || '');
  const [status, setStatus] = useState(existing?.status || 'Pending Approval');

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setCustomImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (targetStatus) => {
    const saved = saveListing({
      id: existing?.id,
      title,
      description,
      category,
      pricingLabel,
      contactEmail,
      contactPhone,
      address,
      city,
      state: stateName,
      pinCode,
      visualTheme,
      customImage,
      status: targetStatus || status
    });
    navigate(`/listings/${saved.id}`);
  };

  return (
    <div style={{ maxWidth: 920 }}>
      <div className="nx-page-header">
        <div>
          <h1 className="nx-page-title">{existing ? 'Edit Listing' : 'Create New Listing'}</h1>
          <p className="nx-page-subtitle">
            Configure service specifications, location coordinates, media preview, and approval workflow state.
          </p>
        </div>
        <button type="button" className="nx-btn nx-btn-secondary" onClick={() => navigate(-1)}>
          Cancel
        </button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave(currentUser.role === ROLES.ADMIN ? status : 'Pending Approval');
        }}
        className="nx-card nx-card-pad"
        style={{ display: 'flex', flexDirection: 'column', gap: 18 }}
      >
        <div className="nx-grid-2">
          <div>
            <label className="nx-label">Listing Title</label>
            <input className="nx-input" placeholder="e.g. Managed Enterprise Kubernetes Landing Zone" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div>
            <label className="nx-label">Category</label>
            <select className="nx-select" value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="nx-label">Detailed Description & SLA Scope</label>
          <textarea className="nx-textarea" rows={4} placeholder="Describe technical specifications, compliance standards, and deliverables..." value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>

        <div className="nx-grid-3">
          <div>
            <label className="nx-label">Indicative Pricing</label>
            <input className="nx-input nx-mono" value={pricingLabel} onChange={(e) => setPricingLabel(e.target.value)} />
          </div>
          <div>
            <label className="nx-label">Contact Email</label>
            <input type="email" className="nx-input" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} required />
          </div>
          <div>
            <label className="nx-label">Contact Phone</label>
            <input className="nx-input nx-mono" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} required />
          </div>
        </div>

        <div>
          <label className="nx-label">Street Address</label>
          <input className="nx-input" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </div>

        <div className="nx-grid-3">
          <div>
            <label className="nx-label">City</label>
            <input className="nx-input" value={city} onChange={(e) => setCity(e.target.value)} required />
          </div>
          <div>
            <label className="nx-label">State</label>
            <input className="nx-input" value={stateName} onChange={(e) => setStateName(e.target.value)} required />
          </div>
          <div>
            <label className="nx-label">PIN Code</label>
            <input className="nx-input nx-mono" value={pinCode} onChange={(e) => setPinCode(e.target.value)} maxLength={6} required />
          </div>
        </div>

        {/* Image Upload Simulation + Banner Theme */}
        <div className="nx-grid-2" style={{ padding: 16, background: 'var(--nx-bg)', borderRadius: 8, border: '1px solid var(--nx-border)' }}>
          <div>
            <label className="nx-label">Upload Cover Image (Simulated / Local Preview)</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ fontSize: 12.5 }} />
            <div style={{ marginTop: 10 }}>
              <label className="nx-label">Or Select Vector Cover Accent</label>
              <select className="nx-select" value={visualTheme} onChange={(e) => { setVisualTheme(e.target.value); setCustomImage(''); }}>
                <option value="indigo">Deep Indigo Enterprise</option>
                <option value="slate">Executive Slate</option>
                <option value="blue">Ocean Infrastructure</option>
                <option value="emerald">Logistics Emerald</option>
                <option value="amber">Advisory Amber</option>
                <option value="teal">Sustainability Teal</option>
              </select>
            </div>
          </div>
          <div>
            <div className="nx-label">Preview</div>
            <ListingVisualBanner listing={{ title, category, city, state: stateName, pinCode, pricingLabel, visualTheme, customImage }} height={110} />
          </div>
        </div>

        {currentUser.role === ROLES.ADMIN && (
          <div style={{ maxWidth: 280 }}>
            <label className="nx-label">Listing Status</label>
            <select className="nx-select" value={status} onChange={(e) => setStatus(e.target.value)}>
              {LISTING_STATUSES.map((st) => <option key={st} value={st}>{st}</option>)}
            </select>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, paddingTop: 12, borderTop: '1px solid var(--nx-border)', flexWrap: 'wrap' }}>
          <button type="button" className="nx-btn nx-btn-secondary" onClick={() => handleSave('Draft')}>
            Save as Draft
          </button>
          <button type="submit" className="nx-btn nx-btn-primary">
            {currentUser.role === ROLES.ADMIN ? 'Save Listing' : 'Submit for Approval'}
          </button>
        </div>
      </form>
    </div>
  );
}

function MyListingsScreen() {
  const { listings, currentUser, categories, savedIds, updateListingStatus, deleteListing } = useNexora();
  const navigate = useNavigate();

  const [viewMode, setViewMode] = useState('table');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [catFilter, setCatFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const pageSize = 5;

  const ownedOrSaved = useMemo(() => {
    if (currentUser.role === ROLES.INDIVIDUAL) {
      return listings.filter((l) => savedIds.includes(l.id) || l.ownerId === currentUser.id);
    }
    if (currentUser.role === ROLES.ADMIN) {
      return listings;
    }
    return listings.filter((l) => l.ownerId === currentUser.id || (currentUser.organisationId && l.organisationId === currentUser.organisationId));
  }, [listings, currentUser, savedIds]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return ownedOrSaved.filter((l) => {
      if (statusFilter !== 'All' && l.status !== statusFilter) return false;
      if (catFilter !== 'All' && l.category !== catFilter) return false;
      if (q && !`${l.title} ${l.city} ${l.pinCode}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [ownedOrSaved, search, statusFilter, catFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div>
      <div className="nx-page-header">
        <div>
          <h1 className="nx-page-title">{currentUser.role === ROLES.INDIVIDUAL ? 'Saved & Draft Listings' : 'Listing Management'}</h1>
          <p className="nx-page-subtitle">
            Manage listing lifecycles across Draft, Pending Approval, Approved, Active, and Inactive states.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <div className="nx-segmented">
            <button type="button" className={`nx-seg-btn ${viewMode === 'table' ? 'active' : ''}`} onClick={() => setViewMode('table')}>Table</button>
            <button type="button" className={`nx-seg-btn ${viewMode === 'cards' ? 'active' : ''}`} onClick={() => setViewMode('cards')}>Cards</button>
          </div>
          <button type="button" className="nx-btn nx-btn-primary" onClick={() => navigate('/listings/new')}>
            <Plus size={15} /> Create Listing
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="nx-card nx-card-pad" style={{ marginBottom: 18, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <input className="nx-input" style={{ maxWidth: 260 }} placeholder="Search title, city, PIN..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
        <select className="nx-select" style={{ maxWidth: 200 }} value={catFilter} onChange={(e) => { setCatFilter(e.target.value); setPage(1); }}>
          <option value="All">All Categories</option>
          {categories.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
        </select>
        <select className="nx-select" style={{ maxWidth: 180 }} value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}>
          <option value="All">All Statuses</option>
          {LISTING_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyPanel
          title="No listings match your filter"
          description="Create a new listing or adjust your search and status criteria."
          actionLabel="Create Listing"
          onAction={() => navigate('/listings/new')}
        />
      ) : viewMode === 'table' ? (
        <div className="nx-card">
          <div className="nx-table-wrap">
            <table className="nx-table">
              <thead>
                <tr>
                  <th>Title & Category</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Modified</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((l) => (
                  <tr key={l.id}>
                    <td>
                      <Link to={`/listings/${l.id}`} style={{ fontWeight: 600, color: 'var(--nx-text)', textDecoration: 'none' }}>{l.title}</Link>
                      <div style={{ fontSize: 12, color: 'var(--nx-text-muted)' }}>{l.category}</div>
                    </td>
                    <td>{l.city}, {l.state} · <span className="nx-mono">{l.pinCode}</span></td>
                    <td><StatusIndicator status={l.status} /></td>
                    <td className="nx-mono" style={{ fontSize: 12.5 }}>{l.updatedAt}</td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: 6 }}>
                        {l.status === 'Draft' && (
                          <button type="button" className="nx-btn nx-btn-secondary nx-btn-sm" onClick={() => updateListingStatus(l.id, 'Pending Approval')}>
                            Submit
                          </button>
                        )}
                        {l.status === 'Active' && (
                          <button type="button" className="nx-btn nx-btn-secondary nx-btn-sm" onClick={() => updateListingStatus(l.id, 'Inactive')}>
                            Pause
                          </button>
                        )}
                        {['Approved', 'Inactive'].includes(l.status) && (
                          <button type="button" className="nx-btn nx-btn-secondary nx-btn-sm" onClick={() => updateListingStatus(l.id, 'Active')}>
                            Activate
                          </button>
                        )}
                        <Link to={`/listings/${l.id}/edit`} className="nx-btn nx-btn-ghost nx-btn-sm">Edit</Link>
                        <button type="button" className="nx-btn nx-btn-ghost nx-btn-sm" style={{ color: 'var(--nx-danger)' }} onClick={() => setConfirmDelete(l)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <PaginationBar page={page} totalPages={totalPages} totalItems={filtered.length} onPageChange={setPage} />
        </div>
      ) : (
        <div className="nx-grid-3">
          {paginated.map((l) => (
            <div key={l.id} className="nx-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <ListingVisualBanner listing={l} height={116} />
                <div style={{ padding: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 8 }}>
                    <StatusIndicator status={l.status} />
                    <span className="nx-mono" style={{ fontSize: 11.5, color: 'var(--nx-text-muted)' }}>{l.updatedAt}</span>
                  </div>
                  <Link to={`/listings/${l.id}`} style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--nx-text)', textDecoration: 'none' }}>{l.title}</Link>
                  <div style={{ fontSize: 12.5, color: 'var(--nx-text-muted)', marginTop: 4 }}>{l.city}, {l.state} · {l.pinCode}</div>
                </div>
              </div>
              <div style={{ padding: '12px 16px', borderTop: '1px solid var(--nx-border)', display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                <Link to={`/listings/${l.id}/edit`} className="nx-btn nx-btn-secondary nx-btn-sm">Edit</Link>
                <button type="button" className="nx-btn nx-btn-ghost nx-btn-sm" style={{ color: 'var(--nx-danger)' }} onClick={() => setConfirmDelete(l)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={Boolean(confirmDelete)}
        title="Delete Listing"
        message={`Are you sure you want to permanently remove "${confirmDelete?.title}"?`}
        confirmLabel="Delete Listing"
        confirmTone="danger"
        onCancel={() => setConfirmDelete(null)}
        onConfirm={() => {
          deleteListing(confirmDelete.id);
          setConfirmDelete(null);
        }}
      />
    </div>
  );
}

/* ============================================================================
   9. ENQUIRIES, MESSAGES, NOTIFICATIONS & PROFILE SCREENS
   ============================================================================ */

function EnquiriesScreen() {
  const { enquiries, currentUser, updateEnquiryStatus, respondToEnquiry } = useNexora();
  const [scopeTab, setScopeTab] = useState('all'); // 'all' | 'received' | 'sent'
  const [statusFilter, setStatusFilter] = useState('All');
  const [selected, setSelected] = useState(null);
  const [replyText, setReplyText] = useState('');

  const scoped = useMemo(() => {
    return enquiries.filter((e) => {
      const isRelevant = currentUser.role === ROLES.ADMIN || e.senderId === currentUser.id || e.recipientId === currentUser.id;
      if (!isRelevant) return false;
      if (scopeTab === 'received' && e.recipientId !== currentUser.id) return false;
      if (scopeTab === 'sent' && e.senderId !== currentUser.id) return false;
      if (statusFilter !== 'All' && e.status !== statusFilter) return false;
      return true;
    });
  }, [enquiries, currentUser, scopeTab, statusFilter]);

  const activeEnq = selected ? enquiries.find((e) => e.id === selected.id) : scoped[0];

  return (
    <div>
      <div className="nx-page-header">
        <div>
          <h1 className="nx-page-title">Enquiry & Workflow Management</h1>
          <p className="nx-page-subtitle">
            Track vendor requests, update workflow states, and respond directly to stakeholder conversations.
          </p>
        </div>
        <div className="nx-segmented">
          <button type="button" className={`nx-seg-btn ${scopeTab === 'all' ? 'active' : ''}`} onClick={() => setScopeTab('all')}>All</button>
          <button type="button" className={`nx-seg-btn ${scopeTab === 'received' ? 'active' : ''}`} onClick={() => setScopeTab('received')}>Received</button>
          <button type="button" className={`nx-seg-btn ${scopeTab === 'sent' ? 'active' : ''}`} onClick={() => setScopeTab('sent')}>Sent</button>
        </div>
      </div>

      <div style={{ marginBottom: 16, display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
        <div className="nx-segmented">
          {['All', ...ENQUIRY_STATUSES].map((st) => (
            <button key={st} type="button" className={`nx-seg-btn ${statusFilter === st ? 'active' : ''}`} onClick={() => setStatusFilter(st)}>
              {st}
            </button>
          ))}
        </div>
      </div>

      {scoped.length === 0 ? (
        <EmptyPanel title="No enquiries in this view" description="Submit an enquiry from any listing in Discovery to start a workflow thread." />
      ) : (
        <div className="nx-grid-split">
          <div className="nx-card">
            <div className="nx-table-wrap">
              <table className="nx-table">
                <thead>
                  <tr>
                    <th>Enquiry & Listing</th>
                    <th>Counterparty</th>
                    <th>Status</th>
                    <th>Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {scoped.map((enq) => (
                    <tr
                      key={enq.id}
                      onClick={() => setSelected(enq)}
                      style={{ cursor: 'pointer', background: activeEnq?.id === enq.id ? 'var(--nx-accent-soft)' : undefined }}
                    >
                      <td>
                        <div style={{ fontWeight: 600, color: 'var(--nx-text)' }}>{enq.subject}</div>
                        <div style={{ fontSize: 12, color: 'var(--nx-text-muted)' }}>{enq.listingTitle}</div>
                      </td>
                      <td style={{ fontSize: 13 }}>
                        {enq.senderId === currentUser.id ? enq.recipientName : enq.senderName}
                      </td>
                      <td><StatusIndicator status={enq.status} /></td>
                      <td className="nx-mono" style={{ fontSize: 12 }}>{enq.updatedAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {activeEnq && (
            <div className="nx-card nx-card-pad" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                <div>
                  <div className="nx-mono" style={{ fontSize: 11.5, color: 'var(--nx-text-muted)' }}>{activeEnq.id.toUpperCase()}</div>
                  <h2 style={{ fontSize: 17, fontWeight: 700, marginTop: 2 }}>{activeEnq.subject}</h2>
                </div>
                <StatusIndicator status={activeEnq.status} />
              </div>

              <div className="nx-meta-line">
                <span>From: <strong>{activeEnq.senderName}</strong></span>
                <span>·</span>
                <span>To: <strong>{activeEnq.recipientName}</strong></span>
                {activeEnq.budget && <><span>·</span><span>Budget: <strong className="nx-mono">{activeEnq.budget}</strong></span></>}
              </div>

              <div style={{ padding: 14, background: 'var(--nx-bg)', borderRadius: 8, border: '1px solid var(--nx-border)', fontSize: 13.5, color: 'var(--nx-text-secondary)' }}>
                {activeEnq.message}
              </div>

              <div>
                <label className="nx-label">Update Workflow Status</label>
                <select
                  className="nx-select"
                  value={activeEnq.status}
                  onChange={(e) => updateEnquiryStatus(activeEnq.id, e.target.value)}
                >
                  {ENQUIRY_STATUSES.map((st) => <option key={st} value={st}>{st}</option>)}
                </select>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!replyText.trim()) return;
                  respondToEnquiry(activeEnq.id, replyText.trim());
                  setReplyText('');
                }}
                style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 12, borderTop: '1px solid var(--nx-border)' }}
              >
                <label className="nx-label">Send Response (Syncs to Messages)</label>
                <textarea
                  className="nx-textarea"
                  placeholder="Write proposal details, schedule confirmation, or technical questions..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Link to="/messages" style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--nx-accent)', textDecoration: 'none' }}>
                    Open Conversation Thread
                  </Link>
                  <button type="submit" className="nx-btn nx-btn-primary nx-btn-sm">
                    <Send size={14} /> Send Response
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function MessagesScreen() {
  const { conversations, users, currentUser, sendMessage, markConversationRead } = useNexora();
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [draft, setDraft] = useState('');

  const myConvs = useMemo(() => {
    return conversations.filter((c) => {
      if (currentUser.role !== ROLES.ADMIN && !c.participants.includes(currentUser.id)) return false;
      if (!search.trim()) return true;
      return c.listingTitle.toLowerCase().includes(search.toLowerCase());
    });
  }, [conversations, currentUser, search]);

  const activeConv = myConvs.find((c) => c.id === selectedId) || myConvs[0];

  const getCounterparty = (conv) => {
    const otherId = conv.participants.find((id) => id !== currentUser.id) || conv.participants[0];
    return users.find((u) => u.id === otherId) || { name: 'Enterprise Partner', role: ROLES.ORGANISATION };
  };

  return (
    <div>
      <div className="nx-page-header">
        <div>
          <h1 className="nx-page-title">Enterprise Messaging</h1>
          <p className="nx-page-subtitle">Direct user-to-user and organisation communication linked to active enquiries.</p>
        </div>
      </div>

      {myConvs.length === 0 ? (
        <EmptyPanel title="No conversations yet" description="Enquire on any listing to initiate a direct message thread with the provider." />
      ) : (
        <div className="nx-card" style={{ display: 'grid', gridTemplateColumns: 'minmax(240px, 320px) 1fr', minHeight: 520, overflow: 'hidden' }}>
          {/* Conversation List */}
          <div style={{ borderRight: '1px solid var(--nx-border)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: 14, borderBottom: '1px solid var(--nx-border)' }}>
              <input className="nx-input" placeholder="Filter conversations..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {myConvs.map((c) => {
                const other = getCounterparty(c);
                const lastMsg = c.messages[c.messages.length - 1];
                const unread = c.unreadFor.includes(currentUser.id);
                const isSelected = activeConv?.id === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => { setSelectedId(c.id); markConversationRead(c.id); }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '14px 16px',
                      border: 'none',
                      borderBottom: '1px solid var(--nx-border)',
                      background: isSelected ? 'var(--nx-accent-soft)' : '#ffffff',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                      <span style={{ fontSize: 13.5, fontWeight: unread ? 700 : 600, color: 'var(--nx-text)' }}>{other.name}</span>
                      {unread && <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--nx-accent)' }}>Unread</span>}
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--nx-text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {c.listingTitle}
                    </div>
                    {lastMsg && (
                      <div style={{ fontSize: 12, color: 'var(--nx-text-muted)', marginTop: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {lastMsg.text}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Message Thread */}
          {activeConv && (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#fafbfd' }}>
              <div style={{ padding: '16px 20px', background: '#ffffff', borderBottom: '1px solid var(--nx-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>{getCounterparty(activeConv).name}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--nx-text-muted)' }}>Topic: {activeConv.listingTitle}</div>
                </div>
                <Link to="/enquiries" className="nx-btn nx-btn-secondary nx-btn-sm">View Enquiry</Link>
              </div>

              <div style={{ flex: 1, padding: 20, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 14, maxHeight: 380 }}>
                {activeConv.messages.map((m) => {
                  const mine = m.senderId === currentUser.id;
                  return (
                    <div key={m.id} style={{ display: 'flex', flexDirection: 'column', alignItems: mine ? 'flex-end' : 'flex-start' }}>
                      <div style={{ fontSize: 11.5, color: 'var(--nx-text-muted)', marginBottom: 4 }}>
                        {m.senderName} · {m.time}
                      </div>
                      <div
                        style={{
                          maxWidth: '75%',
                          padding: '10px 14px',
                          borderRadius: 10,
                          fontSize: 13.5,
                          background: mine ? 'var(--nx-accent)' : '#ffffff',
                          color: mine ? '#ffffff' : 'var(--nx-text)',
                          border: mine ? 'none' : '1px solid var(--nx-border)'
                        }}
                      >
                        {m.text}
                      </div>
                    </div>
                  );
                })}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!draft.trim()) return;
                  sendMessage(activeConv.id, draft.trim());
                  setDraft('');
                }}
                style={{ padding: 14, background: '#ffffff', borderTop: '1px solid var(--nx-border)', display: 'flex', gap: 10 }}
              >
                <input
                  className="nx-input"
                  placeholder="Write a message..."
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                />
                <button type="submit" className="nx-btn nx-btn-primary">
                  <Send size={15} /> Send
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function NotificationsScreen() {
  const { notifications, logs, currentUser, markNotificationRead, markAllNotificationsRead } = useNexora();
  const navigate = useNavigate();
  const [tab, setTab] = useState('notifications');
  const [catFilter, setCatFilter] = useState('All');

  const mine = notifications.filter((n) => (currentUser.role === ROLES.ADMIN ? true : n.userId === currentUser.id));
  const filtered = mine.filter((n) => catFilter === 'All' || n.category === catFilter);

  return (
    <div>
      <div className="nx-page-header">
        <div>
          <h1 className="nx-page-title">Notification Centre & Activity Timeline</h1>
          <p className="nx-page-subtitle">Stay informed on listing approvals, verification updates, and enquiry responses.</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <div className="nx-segmented">
            <button type="button" className={`nx-seg-btn ${tab === 'notifications' ? 'active' : ''}`} onClick={() => setTab('notifications')}>Notifications</button>
            <button type="button" className={`nx-seg-btn ${tab === 'activity' ? 'active' : ''}`} onClick={() => setTab('activity')}>Activity History</button>
          </div>
          {tab === 'notifications' && (
            <button type="button" className="nx-btn nx-btn-secondary" onClick={markAllNotificationsRead}>
              Mark All Read
            </button>
          )}
        </div>
      </div>

      {tab === 'notifications' ? (
        <div className="nx-card nx-card-pad">
          <div style={{ marginBottom: 16 }}>
            <div className="nx-segmented">
              {['All', 'Enquiry', 'Listing', 'Verification', 'System'].map((c) => (
                <button key={c} type="button" className={`nx-seg-btn ${catFilter === c ? 'active' : ''}`} onClick={() => setCatFilter(c)}>{c}</button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filtered.length === 0 ? (
              <p style={{ color: 'var(--nx-text-muted)', margin: 0 }}>No notifications in this category.</p>
            ) : (
              filtered.map((n) => (
                <div
                  key={n.id}
                  style={{
                    padding: '14px 16px',
                    border: '1px solid var(--nx-border)',
                    borderRadius: 8,
                    background: n.isRead ? '#ffffff' : '#f8faff',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 14,
                    flexWrap: 'wrap'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 14, fontWeight: n.isRead ? 500 : 700 }}>{n.title}</span>
                      {!n.isRead && <StatusIndicator status="New" />}
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--nx-text-secondary)', marginTop: 4 }}>{n.message}</div>
                    <div style={{ fontSize: 12, color: 'var(--nx-text-muted)', marginTop: 4 }}>{n.category} · {n.time}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {!n.isRead && (
                      <button type="button" className="nx-btn nx-btn-secondary nx-btn-sm" onClick={() => markNotificationRead(n.id)}>
                        Mark Read
                      </button>
                    )}
                    {n.link && (
                      <button type="button" className="nx-btn nx-btn-primary nx-btn-sm" onClick={() => { markNotificationRead(n.id); navigate(n.link); }}>
                        Open
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="nx-card nx-card-pad">
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>Recent Platform & Account Activity</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {logs.map((l) => (
              <div key={l.id} style={{ paddingBottom: 12, borderBottom: '1px solid var(--nx-border)', display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 600 }}>{l.summary}</div>
                  <div style={{ fontSize: 12, color: 'var(--nx-text-muted)', marginTop: 2 }}>Actor: {l.actor} · Event: <span className="nx-mono">{l.action}</span></div>
                </div>
                <span className="nx-mono" style={{ fontSize: 12, color: 'var(--nx-text-muted)' }}>{l.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function UserProfileScreen() {
  const { currentUser, updateUserProfile, requestVerification } = useNexora();
  const [name, setName] = useState(currentUser.name);
  const [title, setTitle] = useState(currentUser.title || '');
  const [mobile, setMobile] = useState(currentUser.mobile);
  const [address, setAddress] = useState(currentUser.address || '');
  const [city, setCity] = useState(currentUser.city);
  const [stateName, setStateName] = useState(currentUser.state);
  const [pinCode, setPinCode] = useState(currentUser.pinCode);
  const [bio, setBio] = useState(currentUser.bio || '');
  const [prefs, setPrefs] = useState(currentUser.preferences || { emailAlerts: true, smsAlerts: false, twoFactor: true, weeklyDigest: false });

  return (
    <div style={{ maxWidth: 880 }}>
      <div className="nx-page-header">
        <div>
          <h1 className="nx-page-title">User Profile & Account Preferences</h1>
          <p className="nx-page-subtitle">Manage your identity details, verification status, and notification channels.</p>
        </div>
        <StatusIndicator status={currentUser.verificationStatus} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateUserProfile({ name, title, mobile, address, city, state: stateName, pinCode, bio, preferences: prefs });
        }}
        style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
      >
        <div className="nx-card nx-card-pad" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, paddingBottom: 16, borderBottom: '1px solid var(--nx-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <AvatarInitials name={name} size={56} />
              <div>
                <div style={{ fontSize: 17, fontWeight: 700 }}>{name}</div>
                <div style={{ fontSize: 13, color: 'var(--nx-text-muted)' }}>{currentUser.email} · {ROLE_LABELS[currentUser.role]}</div>
              </div>
            </div>
            {currentUser.verificationStatus !== 'Verified' && (
              <button type="button" className="nx-btn nx-btn-secondary nx-btn-sm" onClick={() => requestVerification('Individual', currentUser.name)}>
                Submit Verification Request
              </button>
            )}
          </div>

          <div className="nx-grid-2">
            <div>
              <label className="nx-label">Full Name</label>
              <input className="nx-input" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <label className="nx-label">Role / Designation</label>
              <input className="nx-input" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
          </div>

          <div className="nx-grid-2">
            <div>
              <label className="nx-label">Email Address (Verified)</label>
              <input className="nx-input" value={currentUser.email} disabled style={{ background: 'var(--nx-bg)' }} />
            </div>
            <div>
              <label className="nx-label">Mobile Number</label>
              <input className="nx-input nx-mono" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
            </div>
          </div>

          <div>
            <label className="nx-label">Address</label>
            <input className="nx-input" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>

          <div className="nx-grid-3">
            <div>
              <label className="nx-label">City</label>
              <input className="nx-input" value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
            <div>
              <label className="nx-label">State</label>
              <input className="nx-input" value={stateName} onChange={(e) => setStateName(e.target.value)} />
            </div>
            <div>
              <label className="nx-label">PIN Code</label>
              <input className="nx-input nx-mono" value={pinCode} onChange={(e) => setPinCode(e.target.value)} maxLength={6} />
            </div>
          </div>

          <div>
            <label className="nx-label">Professional Bio</label>
            <textarea className="nx-textarea" value={bio} onChange={(e) => setBio(e.target.value)} />
          </div>
        </div>

        <div className="nx-card nx-card-pad">
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>Security & Communication Preferences</h2>
          <div className="nx-grid-2">
            {[
              { key: 'emailAlerts', label: 'Email notifications for new enquiries' },
              { key: 'smsAlerts', label: 'SMS alerts for urgent status updates' },
              { key: 'twoFactor', label: 'Two-factor OTP authentication' },
              { key: 'weeklyDigest', label: 'Weekly ecosystem analytics digest' }
            ].map((item) => (
              <label key={item.key} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13.5, cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={Boolean(prefs[item.key])}
                  onChange={(e) => setPrefs((p) => ({ ...p, [item.key]: e.target.checked }))}
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" className="nx-btn nx-btn-primary">Save Profile Changes</button>
        </div>
      </form>
    </div>
  );
}

function OrganisationProfileScreen() {
  const { currentUser, organisations, updateOrganisation, addOrgMember, removeOrgMember, addOrgDocument } = useNexora();
  const org = organisations.find((o) => o.id === currentUser.organisationId) || organisations[0];

  const [name, setName] = useState(org.name);
  const [industry, setIndustry] = useState(org.industry);
  const [registrationNo, setRegistrationNo] = useState(org.registrationNo);
  const [phone, setPhone] = useState(org.phone);
  const [address, setAddress] = useState(org.address);
  const [description, setDescription] = useState(org.description);

  const [inviteOpen, setInviteOpen] = useState(false);
  const [memName, setMemName] = useState('');
  const [memEmail, setMemEmail] = useState('');
  const [memRole, setMemRole] = useState('Listing Manager');

  return (
    <div style={{ maxWidth: 960 }}>
      <div className="nx-page-header">
        <div>
          <h1 className="nx-page-title">Organisation Profile & Team Governance</h1>
          <p className="nx-page-subtitle">Update corporate registration details, manage team permissions, and upload verification records.</p>
        </div>
        <StatusIndicator status={org.verificationStatus} />
      </div>

      <div className="nx-grid-split">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateOrganisation(org.id, { name, industry, registrationNo, phone, address, description });
          }}
          className="nx-card nx-card-pad"
          style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 6 }}>
            <AvatarInitials name={name} size={48} tone="slate" />
            <div>
              <div style={{ fontSize: 16, fontWeight: 700 }}>{name}</div>
              <div className="nx-mono" style={{ fontSize: 12, color: 'var(--nx-text-muted)' }}>{registrationNo}</div>
            </div>
          </div>

          <div>
            <label className="nx-label">Organisation Legal Name</label>
            <input className="nx-input" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="nx-grid-2">
            <div>
              <label className="nx-label">Industry Sector</label>
              <input className="nx-input" value={industry} onChange={(e) => setIndustry(e.target.value)} />
            </div>
            <div>
              <label className="nx-label">Registration / CIN</label>
              <input className="nx-input nx-mono" value={registrationNo} onChange={(e) => setRegistrationNo(e.target.value)} />
            </div>
          </div>
          <div>
            <label className="nx-label">Corporate Phone</label>
            <input className="nx-input nx-mono" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div>
            <label className="nx-label">Headquarters Address</label>
            <input className="nx-input" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div>
            <label className="nx-label">Organisation Overview</label>
            <textarea className="nx-textarea" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="nx-btn nx-btn-primary">Save Organisation Details</button>
          </div>
        </form>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Team Management */}
          <div className="nx-card nx-card-pad">
            <div className="nx-section-head">
              <h2 style={{ fontSize: 16, fontWeight: 700 }}>Team Members ({org.members.length})</h2>
              <button type="button" className="nx-btn nx-btn-secondary nx-btn-sm" onClick={() => setInviteOpen(true)}>
                <Plus size={14} /> Invite Member
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {org.members.map((m) => (
                <div key={m.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10, borderBottom: '1px solid var(--nx-border)' }}>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 600 }}>{m.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--nx-text-muted)' }}>{m.email} · {m.role}</div>
                  </div>
                  <button type="button" className="nx-btn nx-btn-ghost nx-btn-sm" style={{ color: 'var(--nx-danger)' }} onClick={() => removeOrgMember(org.id, m.id)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Verification Documents Simulator */}
          <div className="nx-card nx-card-pad">
            <div className="nx-section-head">
              <h2 style={{ fontSize: 16, fontWeight: 700 }}>Verification Documents</h2>
              <label className="nx-btn nx-btn-secondary nx-btn-sm" style={{ cursor: 'pointer' }}>
                <Upload size={14} /> Upload PDF
                <input
                  type="file"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) addOrgDocument(org.id, f.name);
                  }}
                />
              </label>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {org.documents.map((doc) => (
                <div key={doc.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{doc.name}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--nx-text-muted)' }}>{doc.type} · Uploaded {doc.uploadedAt}</div>
                  </div>
                  <StatusIndicator status={doc.status} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {inviteOpen && (
        <div className="nx-backdrop" role="dialog" aria-modal="true">
          <div className="nx-modal" style={{ maxWidth: 420 }}>
            <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--nx-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: 16, fontWeight: 700 }}>Invite Team Member</h3>
              <button type="button" className="nx-btn nx-btn-ghost nx-btn-sm" onClick={() => setInviteOpen(false)}><X size={16} /></button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addOrgMember(org.id, { name: memName, email: memEmail, role: memRole });
                setMemName('');
                setMemEmail('');
                setInviteOpen(false);
              }}
              style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 14 }}
            >
              <div>
                <label className="nx-label">Member Full Name</label>
                <input className="nx-input" value={memName} onChange={(e) => setMemName(e.target.value)} required />
              </div>
              <div>
                <label className="nx-label">Corporate Email</label>
                <input type="email" className="nx-input" value={memEmail} onChange={(e) => setMemEmail(e.target.value)} required />
              </div>
              <div>
                <label className="nx-label">Assigned Role</label>
                <select className="nx-select" value={memRole} onChange={(e) => setMemRole(e.target.value)}>
                  <option value="Organisation Admin">Organisation Admin</option>
                  <option value="Listing Manager">Listing Manager</option>
                  <option value="Compliance Analyst">Compliance Analyst</option>
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <button type="button" className="nx-btn nx-btn-secondary nx-btn-sm" onClick={() => setInviteOpen(false)}>Cancel</button>
                <button type="submit" className="nx-btn nx-btn-primary nx-btn-sm">Send Invite</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function ServiceProviderProfileScreen() {
  const { currentUser, updateUserProfile } = useNexora();
  const [bio, setBio] = useState(currentUser.bio || '');
  const [locations, setLocations] = useState((currentUser.serviceLocations || ['Pune (411001)', 'Mumbai (400001)']).join(', '));

  const sampleReviews = [
    { id: 'rev-1', client: 'Vanguard Urban Systems', rating: 5, comment: 'Seamless SOC 2 readiness rollout delivered two weeks ahead of audit schedule.', date: '2026-10-28' },
    { id: 'rev-2', client: 'Kinetix Manufacturing', rating: 4.8, comment: 'Strong zero-trust network segmentation across three plant locations.', date: '2026-09-19' }
  ];

  return (
    <div style={{ maxWidth: 920 }}>
      <div className="nx-page-header">
        <div>
          <h1 className="nx-page-title">Service Provider Profile & Credentials</h1>
          <p className="nx-page-subtitle">Manage service categories, geographic coverage, and client rating history.</p>
        </div>
        <StatusIndicator status={currentUser.verificationStatus} />
      </div>

      <div className="nx-grid-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateUserProfile({
              bio,
              serviceLocations: locations.split(',').map((s) => s.trim()).filter(Boolean)
            });
          }}
          className="nx-card nx-card-pad"
          style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
        >
          <h2 style={{ fontSize: 16, fontWeight: 700 }}>Business Capabilities</h2>
          <div>
            <div className="nx-label">Authorized Service Categories</div>
            <div style={{ fontSize: 13.5, color: 'var(--nx-text-secondary)' }}>
              {(currentUser.serviceCategories || ['Cloud & IT Infrastructure', 'Cybersecurity & Compliance']).join(' · ')}
            </div>
          </div>
          <div>
            <label className="nx-label">Covered Cities & PIN Codes</label>
            <input className="nx-input" value={locations} onChange={(e) => setLocations(e.target.value)} />
          </div>
          <div>
            <label className="nx-label">Service Capabilities Statement</label>
            <textarea className="nx-textarea" value={bio} onChange={(e) => setBio(e.target.value)} />
          </div>
          <button type="submit" className="nx-btn nx-btn-primary">Update Service Profile</button>
        </form>

        <div className="nx-card nx-card-pad">
          <div className="nx-section-head">
            <h2 style={{ fontSize: 16, fontWeight: 700 }}>Verified Client Reviews</h2>
            <span className="nx-mono" style={{ fontSize: 13, fontWeight: 700 }}>★ {currentUser.rating || 4.9} / 5.0</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {sampleReviews.map((r) => (
              <div key={r.id} style={{ padding: 12, border: '1px solid var(--nx-border)', borderRadius: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <strong style={{ fontSize: 13.5 }}>{r.client}</strong>
                  <span className="nx-mono" style={{ fontSize: 12 }}>★ {r.rating}</span>
                </div>
                <p style={{ margin: '0 0 6px', fontSize: 13, color: 'var(--nx-text-secondary)' }}>{r.comment}</p>
                <div style={{ fontSize: 11.5, color: 'var(--nx-text-muted)' }}>{r.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   10. CENTRALISED ADMINISTRATION & ANALYTICS SCREENS
   ============================================================================ */

function AdminUsersScreen() {
  const { users, toggleUserAccountStatus } = useNexora();
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [inspectUser, setInspectUser] = useState(null);
  const [confirmTarget, setConfirmTarget] = useState(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return users.filter((u) => {
      if (roleFilter !== 'All' && u.role !== roleFilter) return false;
      if (statusFilter !== 'All' && u.accountStatus !== statusFilter) return false;
      if (q && !`${u.name} ${u.email} ${u.city}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [users, search, roleFilter, statusFilter]);

  return (
    <div>
      <div className="nx-page-header">
        <div>
          <h1 className="nx-page-title">User Management</h1>
          <p className="nx-page-subtitle">Search, inspect, and control account activation across all platform roles.</p>
        </div>
      </div>

      <div className="nx-card nx-card-pad" style={{ marginBottom: 18, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <input className="nx-input" style={{ maxWidth: 260 }} placeholder="Search name, email, city..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <select className="nx-select" style={{ maxWidth: 200 }} value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
          <option value="All">All Roles</option>
          {Object.entries(ROLE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <select className="nx-select" style={{ maxWidth: 180 }} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All Account Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <div className="nx-card">
        <div className="nx-table-wrap">
          <table className="nx-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Location</th>
                <th>Verification</th>
                <th>Account Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id}>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--nx-text)' }}>{u.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--nx-text-muted)' }}>{u.email}</div>
                  </td>
                  <td>{ROLE_LABELS[u.role]}</td>
                  <td>{u.city}, {u.state}</td>
                  <td><StatusIndicator status={u.verificationStatus} /></td>
                  <td><StatusIndicator status={u.accountStatus} /></td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: 8 }}>
                      <button type="button" className="nx-btn nx-btn-ghost nx-btn-sm" onClick={() => setInspectUser(u)}>View</button>
                      <button
                        type="button"
                        className="nx-btn nx-btn-secondary nx-btn-sm"
                        onClick={() => setConfirmTarget(u)}
                      >
                        {u.accountStatus === 'Active' ? 'Deactivate' : 'Activate'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {inspectUser && (
        <div className="nx-backdrop" role="dialog" aria-modal="true">
          <div className="nx-modal">
            <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--nx-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: 16, fontWeight: 700 }}>Account Details</h3>
              <button type="button" className="nx-btn nx-btn-ghost nx-btn-sm" onClick={() => setInspectUser(null)}><X size={16} /></button>
            </div>
            <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13.5 }}>
              <div><strong>Name:</strong> {inspectUser.name}</div>
              <div><strong>Role:</strong> {ROLE_LABELS[inspectUser.role]}</div>
              <div><strong>Email:</strong> {inspectUser.email}</div>
              <div><strong>Mobile:</strong> <span className="nx-mono">{inspectUser.mobile}</span></div>
              <div><strong>Location:</strong> {inspectUser.address}, {inspectUser.city}, {inspectUser.state} ({inspectUser.pinCode})</div>
              <div><strong>Joined:</strong> <span className="nx-mono">{inspectUser.createdAt}</span></div>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={Boolean(confirmTarget)}
        title={confirmTarget?.accountStatus === 'Active' ? 'Deactivate User Account' : 'Activate User Account'}
        message={`Confirm ${confirmTarget?.accountStatus === 'Active' ? 'deactivation' : 'activation'} for ${confirmTarget?.name} (${confirmTarget?.email})?`}
        confirmLabel={confirmTarget?.accountStatus === 'Active' ? 'Deactivate' : 'Activate'}
        confirmTone={confirmTarget?.accountStatus === 'Active' ? 'danger' : 'primary'}
        onCancel={() => setConfirmTarget(null)}
        onConfirm={() => {
          toggleUserAccountStatus(confirmTarget.id);
          setConfirmTarget(null);
        }}
      />
    </div>
  );
}

function AdminOrganisationsScreen() {
  const { organisations, updateOrganisationStatus } = useNexora();
  const [confirmOrg, setConfirmOrg] = useState(null);

  return (
    <div>
      <div className="nx-page-header">
        <div>
          <h1 className="nx-page-title">Organisation Management</h1>
          <p className="nx-page-subtitle">Govern corporate entities, registration compliance, and member directories.</p>
        </div>
      </div>

      <div className="nx-card">
        <div className="nx-table-wrap">
          <table className="nx-table">
            <thead>
              <tr>
                <th>Organisation</th>
                <th>Registration No.</th>
                <th>Location</th>
                <th>Members</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {organisations.map((org) => (
                <tr key={org.id}>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--nx-text)' }}>{org.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--nx-text-muted)' }}>{org.industry}</div>
                  </td>
                  <td className="nx-mono" style={{ fontSize: 12 }}>{org.registrationNo}</td>
                  <td>{org.city}, {org.state}</td>
                  <td className="nx-tabular">{org.members.length}</td>
                  <td><StatusIndicator status={org.verificationStatus} /></td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: 6 }}>
                      {org.verificationStatus !== 'Verified' && (
                        <button type="button" className="nx-btn nx-btn-primary nx-btn-sm" onClick={() => setConfirmOrg({ org, status: 'Verified' })}>
                          Approve
                        </button>
                      )}
                      {org.verificationStatus !== 'Rejected' && (
                        <button type="button" className="nx-btn nx-btn-secondary nx-btn-sm" onClick={() => setConfirmOrg({ org, status: 'Rejected' })}>
                          Reject
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmDialog
        open={Boolean(confirmOrg)}
        title="Confirm Organisation Decision"
        message={`Set verification status for "${confirmOrg?.org.name}" to ${confirmOrg?.status}?`}
        confirmLabel={`Mark ${confirmOrg?.status}`}
        confirmTone={confirmOrg?.status === 'Rejected' ? 'danger' : 'primary'}
        onCancel={() => setConfirmOrg(null)}
        onConfirm={() => {
          updateOrganisationStatus(confirmOrg.org.id, confirmOrg.status);
          setConfirmOrg(null);
        }}
      />
    </div>
  );
}

function AdminProvidersScreen() {
  const { users, listings, toggleUserAccountStatus } = useNexora();
  const providers = users.filter((u) => u.role === ROLES.SERVICE_PROVIDER);

  return (
    <div>
      <div className="nx-page-header">
        <div>
          <h1 className="nx-page-title">Service Provider Management</h1>
          <p className="nx-page-subtitle">Monitor accredited service partners, ratings, and active catalogue counts.</p>
        </div>
      </div>

      <div className="nx-card">
        <div className="nx-table-wrap">
          <table className="nx-table">
            <thead>
              <tr>
                <th>Provider</th>
                <th>Primary Hub</th>
                <th>Active Listings</th>
                <th>Rating</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {providers.map((p) => {
                const count = listings.filter((l) => l.ownerId === p.id).length;
                return (
                  <tr key={p.id}>
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--nx-text)' }}>{p.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--nx-text-muted)' }}>{p.email}</div>
                    </td>
                    <td>{p.city}, {p.state}</td>
                    <td className="nx-tabular">{count}</td>
                    <td className="nx-mono">★ {p.rating || 4.8} ({p.reviewCount || 15})</td>
                    <td><StatusIndicator status={p.accountStatus} /></td>
                    <td style={{ textAlign: 'right' }}>
                      <button type="button" className="nx-btn nx-btn-secondary nx-btn-sm" onClick={() => toggleUserAccountStatus(p.id)}>
                        {p.accountStatus === 'Active' ? 'Suspend' : 'Reinstate'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AdminListingsScreen() {
  const { listings, updateListingStatus, deleteListing } = useNexora();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [confirmAction, setConfirmAction] = useState(null);

  const filtered = listings.filter((l) => {
    if (statusFilter !== 'All' && l.status !== statusFilter) return false;
    if (search.trim() && !`${l.title} ${l.providerName} ${l.city}`.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <div className="nx-page-header">
        <div>
          <h1 className="nx-page-title">Listing Administration</h1>
          <p className="nx-page-subtitle">Moderate submissions, approve pending listings, and enforce marketplace quality standards.</p>
        </div>
      </div>

      <div className="nx-card nx-card-pad" style={{ marginBottom: 18, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <input className="nx-input" style={{ maxWidth: 280 }} placeholder="Search listing, provider, city..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <select className="nx-select" style={{ maxWidth: 200 }} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All Statuses</option>
          {LISTING_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <div className="nx-card">
        <div className="nx-table-wrap">
          <table className="nx-table">
            <thead>
              <tr>
                <th>Listing</th>
                <th>Provider / Organisation</th>
                <th>Location</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Moderation</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((l) => (
                <tr key={l.id}>
                  <td>
                    <Link to={`/listings/${l.id}`} style={{ fontWeight: 600, color: 'var(--nx-text)', textDecoration: 'none' }}>{l.title}</Link>
                    <div style={{ fontSize: 12, color: 'var(--nx-text-muted)' }}>{l.category}</div>
                  </td>
                  <td>{l.providerName}</td>
                  <td>{l.city} · <span className="nx-mono">{l.pinCode}</span></td>
                  <td><StatusIndicator status={l.status} /></td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: 6 }}>
                      {l.status !== 'Active' && (
                        <button type="button" className="nx-btn nx-btn-primary nx-btn-sm" onClick={() => setConfirmAction({ type: 'status', listing: l, next: 'Active' })}>
                          Approve & Activate
                        </button>
                      )}
                      {l.status !== 'Rejected' && (
                        <button type="button" className="nx-btn nx-btn-secondary nx-btn-sm" onClick={() => setConfirmAction({ type: 'status', listing: l, next: 'Rejected' })}>
                          Reject
                        </button>
                      )}
                      <button type="button" className="nx-btn nx-btn-ghost nx-btn-sm" style={{ color: 'var(--nx-danger)' }} onClick={() => setConfirmAction({ type: 'delete', listing: l })}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmDialog
        open={Boolean(confirmAction)}
        title={confirmAction?.type === 'delete' ? 'Delete Listing' : 'Update Listing Status'}
        message={
          confirmAction?.type === 'delete'
            ? `Permanently delete "${confirmAction?.listing.title}" from the platform?`
            : `Change status of "${confirmAction?.listing.title}" to "${confirmAction?.next}"?`
        }
        confirmLabel={confirmAction?.type === 'delete' ? 'Delete' : `Set ${confirmAction?.next}`}
        confirmTone={confirmAction?.type === 'delete' || confirmAction?.next === 'Rejected' ? 'danger' : 'primary'}
        onCancel={() => setConfirmAction(null)}
        onConfirm={() => {
          if (confirmAction.type === 'delete') {
            deleteListing(confirmAction.listing.id);
          } else {
            updateListingStatus(confirmAction.listing.id, confirmAction.next);
          }
          setConfirmAction(null);
        }}
      />
    </div>
  );
}

function AdminVerificationsScreen() {
  const { verifications, processVerification } = useNexora();
  const [confirmDecision, setConfirmDecision] = useState(null);

  return (
    <div>
      <div className="nx-page-header">
        <div>
          <h1 className="nx-page-title">Verification Management</h1>
          <p className="nx-page-subtitle">Review KYC, incorporation certificates, and accreditation filings.</p>
        </div>
      </div>

      <div className="nx-card">
        <div className="nx-table-wrap">
          <table className="nx-table">
            <thead>
              <tr>
                <th>Entity / Applicant</th>
                <th>Type</th>
                <th>Submitted Document</th>
                <th>Submitted</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Decision</th>
              </tr>
            </thead>
            <tbody>
              {verifications.map((v) => (
                <tr key={v.id}>
                  <td>
                    <div style={{ fontWeight: 600, color: 'var(--nx-text)' }}>{v.entityName}</div>
                    <div style={{ fontSize: 12, color: 'var(--nx-text-muted)' }}>{v.applicantName} · {v.city}</div>
                  </td>
                  <td>{v.entityType}</td>
                  <td>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{v.documentName}</div>
                    <div className="nx-mono" style={{ fontSize: 11.5, color: 'var(--nx-text-muted)' }}>{v.registrationNo}</div>
                  </td>
                  <td className="nx-mono" style={{ fontSize: 12 }}>{v.submittedAt}</td>
                  <td><StatusIndicator status={v.status} /></td>
                  <td style={{ textAlign: 'right' }}>
                    {v.status === 'Pending' ? (
                      <div style={{ display: 'inline-flex', gap: 6 }}>
                        <button type="button" className="nx-btn nx-btn-primary nx-btn-sm" onClick={() => setConfirmDecision({ ver: v, decision: 'Approved' })}>
                          Approve
                        </button>
                        <button type="button" className="nx-btn nx-btn-secondary nx-btn-sm" onClick={() => setConfirmDecision({ ver: v, decision: 'Rejected' })}>
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span style={{ fontSize: 12, color: 'var(--nx-text-muted)' }}>Reviewed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmDialog
        open={Boolean(confirmDecision)}
        title="Confirm Verification Decision"
        message={`Confirm ${confirmDecision?.decision.toLowerCase()} for ${confirmDecision?.ver.entityName}? This updates their platform verification badge immediately.`}
        confirmLabel={confirmDecision?.decision}
        confirmTone={confirmDecision?.decision === 'Rejected' ? 'danger' : 'primary'}
        onCancel={() => setConfirmDecision(null)}
        onConfirm={() => {
          processVerification(confirmDecision.ver.id, confirmDecision.decision);
          setConfirmDecision(null);
        }}
      />
    </div>
  );
}

function AdminCategoriesScreen() {
  const { categories, addCategory, toggleCategory } = useNexora();
  const [name, setName] = useState('');

  return (
    <div style={{ maxWidth: 820 }}>
      <div className="nx-page-header">
        <div>
          <h1 className="nx-page-title">Category Taxonomy Management</h1>
          <p className="nx-page-subtitle">Configure ecosystem service categories available for listing classification and discovery.</p>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!name.trim()) return;
          addCategory(name.trim());
          setName('');
        }}
        className="nx-card nx-card-pad"
        style={{ marginBottom: 18, display: 'flex', gap: 12 }}
      >
        <input className="nx-input" placeholder="New category name (e.g. Industrial IoT Telemetry)" value={name} onChange={(e) => setName(e.target.value)} required />
        <button type="submit" className="nx-btn nx-btn-primary">Add Category</button>
      </form>

      <div className="nx-card">
        <div className="nx-table-wrap">
          <table className="nx-table">
            <thead>
              <tr>
                <th>Category Name</th>
                <th>Slug</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <tr key={c.id}>
                  <td style={{ fontWeight: 600, color: 'var(--nx-text)' }}>{c.name}</td>
                  <td className="nx-mono" style={{ fontSize: 12 }}>{c.slug}</td>
                  <td><StatusIndicator status={c.active ? 'Active' : 'Inactive'} /></td>
                  <td style={{ textAlign: 'right' }}>
                    <button type="button" className="nx-btn nx-btn-secondary nx-btn-sm" onClick={() => toggleCategory(c.id)}>
                      {c.active ? 'Disable' : 'Enable'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AdminLocationsScreen() {
  const { locations, addLocation, toggleLocation } = useNexora();
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
  const [pins, setPins] = useState('');

  return (
    <div style={{ maxWidth: 920 }}>
      <div className="nx-page-header">
        <div>
          <h1 className="nx-page-title">Location & PIN Corridor Management</h1>
          <p className="nx-page-subtitle">Define supported cities, states, and postal PIN regions for geospatial discovery.</p>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          addLocation({ city, state: stateName, pinCodes: pins.split(',').map((p) => p.trim()).filter(Boolean) });
          setCity('');
          setStateName('');
          setPins('');
        }}
        className="nx-card nx-card-pad"
        style={{ marginBottom: 18, display: 'grid', gridTemplateColumns: '1fr 1fr 1.2fr auto', gap: 12, alignItems: 'end' }}
      >
        <div>
          <label className="nx-label">City</label>
          <input className="nx-input" placeholder="Ahmedabad" value={city} onChange={(e) => setCity(e.target.value)} required />
        </div>
        <div>
          <label className="nx-label">State</label>
          <input className="nx-input" placeholder="Gujarat" value={stateName} onChange={(e) => setStateName(e.target.value)} required />
        </div>
        <div>
          <label className="nx-label">PIN Codes (comma separated)</label>
          <input className="nx-input nx-mono" placeholder="380001, 380015" value={pins} onChange={(e) => setPins(e.target.value)} required />
        </div>
        <button type="submit" className="nx-btn nx-btn-primary">Add Region</button>
      </form>

      <div className="nx-card">
        <div className="nx-table-wrap">
          <table className="nx-table">
            <thead>
              <tr>
                <th>City</th>
                <th>State</th>
                <th>Supported PIN Codes</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((loc) => (
                <tr key={loc.id}>
                  <td style={{ fontWeight: 600, color: 'var(--nx-text)' }}>{loc.city}</td>
                  <td>{loc.state}</td>
                  <td className="nx-mono" style={{ fontSize: 12 }}>{loc.pinCodes.join(', ')}</td>
                  <td><StatusIndicator status={loc.active ? 'Active' : 'Inactive'} /></td>
                  <td style={{ textAlign: 'right' }}>
                    <button type="button" className="nx-btn nx-btn-secondary nx-btn-sm" onClick={() => toggleLocation(loc.id)}>
                      {loc.active ? 'Disable' : 'Enable'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AnalyticsReportsScreen() {
  const { listings, enquiries, users, notify } = useNexora();
  const [range, setRange] = useState('30D');
  const series = ANALYTICS_SERIES[range] || ANALYTICS_SERIES['30D'];

  const geoDistribution = useMemo(() => {
    const map = {};
    listings.forEach((l) => {
      map[l.city] = (map[l.city] || 0) + 1;
    });
    return Object.entries(map).map(([city, count]) => ({ city, listings: count, enquiries: count * 6 + 4 }));
  }, [listings]);

  const activeVsInactive = useMemo(() => {
    const active = listings.filter((l) => ['Active', 'Approved'].includes(l.status)).length;
    const other = listings.length - active;
    return [
      { name: 'Active / Approved', value: active },
      { name: 'Draft / Pending / Inactive', value: other }
    ];
  }, [listings]);

  const handleExportCsv = () => {
    exportToCsv(`nexora-analytics-${range.toLowerCase()}.csv`, series);
    notify(`Exported nexora-analytics-${range.toLowerCase()}.csv`);
  };

  return (
    <div>
      <div className="nx-page-header">
        <div>
          <h1 className="nx-page-title">Analytics & Executive Reporting</h1>
          <p className="nx-page-subtitle">Track registration growth, listing velocity, enquiry conversion, and regional footprint.</p>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <div className="nx-segmented">
            {['7D', '30D', '90D', '12M'].map((r) => (
              <button key={r} type="button" className={`nx-seg-btn ${range === r ? 'active' : ''}`} onClick={() => setRange(r)}>{r}</button>
            ))}
          </div>
          <button type="button" className="nx-btn nx-btn-primary" onClick={handleExportCsv}>
            <Download size={15} /> Export CSV Report
          </button>
        </div>
      </div>

      <div className="nx-grid-4" style={{ marginBottom: 22 }}>
        <KpiCard label="Ecosystem Accounts" value={users.length} meta={`Range: ${range}`} />
        <KpiCard label="Total Listings" value={listings.length} meta="Across 6 service verticals" />
        <KpiCard label="Enquiry Conversion" value="46.2%" meta={`${enquiries.length} tracked workflows`} />
        <KpiCard label="Active Regions" value={geoDistribution.length} meta="Major enterprise corridors" />
      </div>

      <div className="nx-grid-2" style={{ marginBottom: 20 }}>
        <div className="nx-card nx-card-pad">
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>User & Organisation Growth ({range})</h2>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={series}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="period" tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="users" name="Individual & Total Users" stroke="#4338ca" strokeWidth={2.2} />
                <Line type="monotone" dataKey="orgs" name="Organisations" stroke="#0f766e" strokeWidth={2.2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="nx-card nx-card-pad">
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>Enquiry Throughput vs Conversions ({range})</h2>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={series}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="period" tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="enquiries" name="Total Enquiries" fill="#4338ca" radius={[4, 4, 0, 0]} />
                <Bar dataKey="converted" name="Converted" fill="#16a34a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="nx-grid-2">
        <div className="nx-card nx-card-pad">
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>Geographic Distribution by City</h2>
          <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={geoDistribution} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis dataKey="city" type="category" width={90} tick={{ fontSize: 12, fill: '#334155' }} />
                <Tooltip />
                <Bar dataKey="listings" name="Listings" fill="#4338ca" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="nx-card nx-card-pad">
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>Active vs Non-Active Inventory</h2>
          <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={activeVsInactive} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4}>
                  <Cell fill="#4338ca" />
                  <Cell fill="#cbd5e1" />
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminSettingsScreen() {
  const { settings, updateSettings, resetDemoData } = useNexora();
  const [form, setForm] = useState(settings);
  const [confirmReset, setConfirmReset] = useState(false);

  return (
    <div style={{ maxWidth: 940 }}>
      <div className="nx-page-header">
        <div>
          <h1 className="nx-page-title">Platform Settings & Architecture Blueprint</h1>
          <p className="nx-page-subtitle">Configure global governance rules and inspect the relational PostgreSQL / Supabase schema.</p>
        </div>
        <button type="button" className="nx-btn nx-btn-secondary" onClick={() => setConfirmReset(true)}>
          <RefreshCw size={14} /> Reset Demo Data
        </button>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateSettings(form);
        }}
        className="nx-card nx-card-pad"
        style={{ marginBottom: 22, display: 'flex', flexDirection: 'column', gap: 16 }}
      >
        <h2 style={{ fontSize: 16, fontWeight: 700 }}>Global Governance Controls</h2>
        <div className="nx-grid-2">
          <div>
            <label className="nx-label">Platform Display Name</label>
            <input className="nx-input" value={form.platformName} onChange={(e) => setForm({ ...form, platformName: e.target.value })} />
          </div>
          <div>
            <label className="nx-label">Governance Support Email</label>
            <input className="nx-input" value={form.supportEmail} onChange={(e) => setForm({ ...form, supportEmail: e.target.value })} />
          </div>
        </div>

        <div className="nx-grid-2">
          <div>
            <label className="nx-label">Default Discovery Radius (km)</label>
            <input type="number" className="nx-input nx-mono" value={form.defaultDiscoveryRadiusKm} onChange={(e) => setForm({ ...form, defaultDiscoveryRadiusKm: Number(e.target.value) })} />
          </div>
          <div>
            <label className="nx-label">Platform Service Fee (%)</label>
            <input type="number" step="0.1" className="nx-input nx-mono" value={form.platformFeePercent} onChange={(e) => setForm({ ...form, platformFeePercent: Number(e.target.value) })} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13.5, cursor: 'pointer' }}>
            <input type="checkbox" checked={form.autoApproveVerifiedOrgs} onChange={(e) => setForm({ ...form, autoApproveVerifiedOrgs: e.target.checked })} />
            <span>Fast-track listing approvals for KYC-verified organisations</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13.5, cursor: 'pointer' }}>
            <input type="checkbox" checked={form.enforceMobileOtp} onChange={(e) => setForm({ ...form, enforceMobileOtp: e.target.checked })} />
            <span>Require mobile OTP verification during new account onboarding</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13.5, cursor: 'pointer' }}>
            <input type="checkbox" checked={form.maintenanceBannerEnabled} onChange={(e) => setForm({ ...form, maintenanceBannerEnabled: e.target.checked })} />
            <span>Display scheduled maintenance notice across workspace headers</span>
          </label>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" className="nx-btn nx-btn-primary">Save Platform Settings</button>
        </div>
      </form>

      {/* PostgreSQL / Supabase Architecture Spec */}
      <div className="nx-card nx-card-pad">
        <div className="nx-section-head">
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 700 }}>PostgreSQL / Supabase Target Data Model</h2>
            <div style={{ fontSize: 12.5, color: 'var(--nx-text-muted)' }}>Relational entity blueprint ready for Node.js / NestJS API migration</div>
          </div>
        </div>
        <div className="nx-table-wrap">
          <table className="nx-table">
            <thead>
              <tr>
                <th>Table</th>
                <th>Primary Key</th>
                <th>Relational Columns</th>
              </tr>
            </thead>
            <tbody>
              {DB_SCHEMA_SPEC.map((t) => (
                <tr key={t.table}>
                  <td className="nx-mono" style={{ fontWeight: 600, color: 'var(--nx-accent)' }}>{t.table}</td>
                  <td className="nx-mono" style={{ fontSize: 12 }}>{t.primaryKey}</td>
                  <td className="nx-mono" style={{ fontSize: 12 }}>{t.columns.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmDialog
        open={confirmReset}
        title="Reset Demo Workspace Data"
        message="Restore all users, listings, enquiries, messages, and settings back to the initial NEXORA enterprise seed dataset?"
        confirmLabel="Reset Data"
        confirmTone="danger"
        onCancel={() => setConfirmReset(false)}
        onConfirm={() => {
          resetDemoData();
          setConfirmReset(false);
        }}
      />
    </div>
  );
}

function AdminLogsScreen() {
  const { logs, notify } = useNexora();
  const [query, setQuery] = useState('');

  const filtered = logs.filter((l) => !query.trim() || `${l.actor} ${l.action} ${l.summary}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <div className="nx-page-header">
        <div>
          <h1 className="nx-page-title">System Activity & Audit Logs</h1>
          <p className="nx-page-subtitle">Immutable chronological trail of governance, verification, and workflow mutations.</p>
        </div>
        <button
          type="button"
          className="nx-btn nx-btn-secondary"
          onClick={() => {
            exportToCsv('nexora-audit-logs.csv', filtered);
            notify('Exported nexora-audit-logs.csv');
          }}
        >
          <Download size={14} /> Export Audit CSV
        </button>
      </div>

      <div className="nx-card nx-card-pad" style={{ marginBottom: 16 }}>
        <input className="nx-input" style={{ maxWidth: 320 }} placeholder="Filter logs by actor, action, or summary..." value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      <div className="nx-card">
        <div className="nx-table-wrap">
          <table className="nx-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Actor</th>
                <th>Action Type</th>
                <th>Summary</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((l) => (
                <tr key={l.id}>
                  <td className="nx-mono" style={{ fontSize: 12 }}>{l.timestamp}</td>
                  <td style={{ fontWeight: 600, color: 'var(--nx-text)' }}>{l.actor}</td>
                  <td><span className="nx-mono" style={{ fontSize: 12 }}>{l.action}</span></td>
                  <td>{l.summary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   11. ROOT STATE PROVIDER & APPLICATION ROUTING
   ============================================================================ */

function DashboardRouter() {
  const { currentUser } = useNexora();
  if (currentUser.role === ROLES.ADMIN) return <AdminOverviewDashboard />;
  if (currentUser.role === ROLES.ORGANISATION) return <OrganisationDashboard />;
  if (currentUser.role === ROLES.SERVICE_PROVIDER) return <ServiceProviderDashboard />;
  return <IndividualDashboard />;
}

function ProtectedRoute({ children }) {
  const { currentUser } = useNexora();
  if (!currentUser) return <Navigate to="/login" replace />;
  return <AppLayout>{children}</AppLayout>;
}

export default function App() {
  const persisted = useMemo(() => loadPersistedState(), []);

  const [users, setUsers] = useState(() => persisted?.users || INITIAL_USERS);
  const [organisations, setOrganisations] = useState(() => persisted?.organisations || INITIAL_ORGANISATIONS);
  const [categories, setCategories] = useState(() => persisted?.categories || INITIAL_CATEGORIES);
  const [locations, setLocations] = useState(() => persisted?.locations || INITIAL_LOCATIONS);
  const [listings, setListings] = useState(() => persisted?.listings || INITIAL_LISTINGS);
  const [enquiries, setEnquiries] = useState(() => persisted?.enquiries || INITIAL_ENQUIRIES);
  const [conversations, setConversations] = useState(() => persisted?.conversations || INITIAL_CONVERSATIONS);
  const [notifications, setNotifications] = useState(() => persisted?.notifications || INITIAL_NOTIFICATIONS);
  const [verifications, setVerifications] = useState(() => persisted?.verifications || INITIAL_VERIFICATIONS);
  const [logs, setLogs] = useState(() => persisted?.logs || INITIAL_LOGS);
  const [settings, setSettings] = useState(() => persisted?.settings || INITIAL_SETTINGS);
  const [savedIds, setSavedIds] = useState(() => persisted?.savedIds || ['lst-101', 'lst-103']);
  const [currentUserId, setCurrentUserId] = useState(() =>
    persisted && 'currentUserId' in persisted ? persisted.currentUserId : 'usr-ind-01'
  );
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    savePersistedState({
      users,
      organisations,
      categories,
      locations,
      listings,
      enquiries,
      conversations,
      notifications,
      verifications,
      logs,
      settings,
      savedIds,
      currentUserId
    });
  }, [users, organisations, categories, locations, listings, enquiries, conversations, notifications, verifications, logs, settings, savedIds, currentUserId]);

  const currentUser = useMemo(() => users.find((u) => u.id === currentUserId) || null, [users, currentUserId]);

  const notify = (text, tone = 'info') => {
    const id = 'toast-' + Date.now() + Math.random().toString(36).slice(2, 6);
    setToasts((prev) => [...prev, { id, text, tone }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3400);
  };

  const appendLog = (action, summary, actorOverride) => {
    const actor = actorOverride || (currentUser ? `${currentUser.name} (${ROLE_LABELS[currentUser.role]})` : 'System');
    const now = new Date();
    const ts = `${now.toISOString().slice(0, 10)} ${now.toTimeString().slice(0, 5)}`;
    setLogs((prev) => [{ id: 'log-' + Date.now(), actor, action, summary, timestamp: ts }, ...prev]);
  };

  const loginAsUser = (userId) => {
    setCurrentUserId(userId);
    const u = users.find((x) => x.id === userId);
    if (u) notify(`Signed in as ${u.name} (${ROLE_LABELS[u.role]})`);
  };

  const loginWithCredentials = (email) => {
    const found = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (!found) return false;
    setCurrentUserId(found.id);
    notify(`Welcome back, ${found.name}`);
    return true;
  };

  const switchDemoRole = (role) => {
    const match = users.find((u) => u.role === role);
    if (match) {
      setCurrentUserId(match.id);
      notify(`Switched workspace to ${ROLE_LABELS[role]}`);
    }
  };

  const logout = () => {
    setCurrentUserId(null);
    notify('Signed out of NEXORA workspace');
  };

  const registerAccount = ({ role, name, orgName, regNo, email, mobile, city, state, pinCode, otpVerified }) => {
    const newUserId = 'usr-' + Date.now();
    let newOrgId = null;
    if (role !== ROLES.INDIVIDUAL) {
      newOrgId = 'org-' + Date.now();
      setOrganisations((prev) => [
        ...prev,
        {
          id: newOrgId,
          name: orgName || `${name} Enterprises`,
          registrationNo: regNo || 'CIN-PENDING-2026',
          industry: 'Enterprise Services',
          email,
          phone: mobile,
          city,
          state,
          pinCode,
          address: `${city}, ${state}`,
          verificationStatus: 'Pending',
          description: 'Newly onboarded NEXORA enterprise entity.',
          members: [{ id: 'mem-' + Date.now(), name, email, role: 'Organisation Admin', status: 'Active' }],
          documents: [],
          createdAt: new Date().toISOString().slice(0, 10)
        }
      ]);
      setVerifications((prev) => [
        {
          id: 'ver-' + Date.now(),
          entityType: role === ROLES.ORGANISATION ? 'Organisation' : 'Service Provider',
          entityId: newOrgId,
          entityName: orgName || name,
          applicantName: name,
          email,
          documentName: 'Onboarding_Compliance_Dossier.pdf',
          registrationNo: regNo || 'PENDING',
          city: `${city}, ${state}`,
          submittedAt: new Date().toISOString().slice(0, 10),
          status: 'Pending'
        },
        ...prev
      ]);
    }

    const newUser = {
      id: newUserId,
      name,
      email,
      mobile,
      role,
      organisationId: newOrgId,
      title: role === ROLES.INDIVIDUAL ? 'Enterprise Member' : 'Primary Account Administrator',
      city,
      state,
      pinCode,
      address: `${city}, ${state}`,
      verificationStatus: otpVerified ? 'Pending' : 'Pending',
      accountStatus: 'Active',
      profileCompletion: otpVerified ? 75 : 55,
      preferences: { emailAlerts: true, smsAlerts: otpVerified, twoFactor: otpVerified, weeklyDigest: true },
      createdAt: new Date().toISOString().slice(0, 10)
    };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUserId(newUserId);
    appendLog('ACCOUNT_REGISTERED', `Registered ${ROLE_LABELS[role]} account for ${name}`, name);
    notify('Account provisioned successfully');
  };

  const toggleSaveListing = (listingId) => {
    setSavedIds((prev) => {
      const exists = prev.includes(listingId);
      notify(exists ? 'Removed from saved shortlist' : 'Listing saved to shortlist');
      return exists ? prev.filter((id) => id !== listingId) : [...prev, listingId];
    });
  };

  const saveListing = (payload) => {
    const today = new Date().toISOString().slice(0, 10);
    if (payload.id) {
      let updatedItem = null;
      setListings((prev) =>
        prev.map((l) => {
          if (l.id !== payload.id) return l;
          updatedItem = { ...l, ...payload, updatedAt: today };
          return updatedItem;
        })
      );
      appendLog('LISTING_UPDATED', `Updated listing "${payload.title}"`);
      notify('Listing changes saved');
      return updatedItem || payload;
    }

    const org = organisations.find((o) => o.id === currentUser.organisationId);
    const created = {
      ...payload,
      id: 'lst-' + Date.now(),
      ownerId: currentUser.id,
      organisationId: currentUser.organisationId || null,
      providerName: org ? org.name : currentUser.name,
      providerVerified: currentUser.verificationStatus === 'Verified',
      mapX: 38 + Math.round((Math.random() - 0.5) * 20),
      mapY: 52 + Math.round((Math.random() - 0.5) * 24),
      rating: 4.8,
      reviewCount: 0,
      views: 1,
      enquiriesCount: 0,
      createdAt: today,
      updatedAt: today
    };
    setListings((prev) => [created, ...prev]);
    appendLog('LISTING_CREATED', `Created listing "${created.title}" (${created.status})`);
    notify(`Listing created (${created.status})`);
    return created;
  };

  const updateListingStatus = (listingId, nextStatus) => {
    const today = new Date().toISOString().slice(0, 10);
    setListings((prev) => prev.map((l) => (l.id === listingId ? { ...l, status: nextStatus, updatedAt: today } : l)));
    appendLog('LISTING_STATUS', `Changed listing ${listingId} status to ${nextStatus}`);
    notify(`Listing marked as ${nextStatus}`);
  };

  const deleteListing = (listingId) => {
    setListings((prev) => prev.filter((l) => l.id !== listingId));
    appendLog('LISTING_DELETED', `Deleted listing ${listingId}`);
    notify('Listing removed');
  };

  const sendEnquiry = ({ listing, subject, message, budget }) => {
    const today = new Date().toISOString().slice(0, 10);
    const newEnqId = 'enq-' + Date.now();
    const newEnq = {
      id: newEnqId,
      listingId: listing.id,
      listingTitle: listing.title,
      senderId: currentUser.id,
      senderName: currentUser.name,
      recipientId: listing.ownerId,
      recipientName: listing.providerName,
      subject,
      message,
      status: 'New',
      budget: budget || 'On Request',
      createdAt: today,
      updatedAt: today
    };
    setEnquiries((prev) => [newEnq, ...prev]);

    const newConv = {
      id: 'conv-' + Date.now(),
      enquiryId: newEnqId,
      listingTitle: listing.title,
      participants: [currentUser.id, listing.ownerId],
      unreadFor: [listing.ownerId],
      messages: [
        { id: 'm-' + Date.now(), senderId: currentUser.id, senderName: currentUser.name, text: message, time: 'Just now' }
      ]
    };
    setConversations((prev) => [newConv, ...prev]);

    setNotifications((prev) => [
      {
        id: 'not-' + Date.now(),
        userId: listing.ownerId,
        category: 'Enquiry',
        title: `New enquiry from ${currentUser.name}`,
        message: subject,
        isRead: false,
        time: 'Just now',
        link: '/enquiries'
      },
      ...prev
    ]);
    appendLog('ENQUIRY_SENT', `Sent enquiry on "${listing.title}"`);
    notify('Enquiry submitted and conversation thread opened');
  };

  const updateEnquiryStatus = (enquiryId, status) => {
    const today = new Date().toISOString().slice(0, 10);
    setEnquiries((prev) => prev.map((e) => (e.id === enquiryId ? { ...e, status, updatedAt: today } : e)));
    appendLog('ENQUIRY_STATUS', `Updated enquiry ${enquiryId} to ${status}`);
    notify(`Enquiry status updated to ${status}`);
  };

  const respondToEnquiry = (enquiryId, text) => {
    const enq = enquiries.find((e) => e.id === enquiryId);
    if (!enq) return;
    updateEnquiryStatus(enquiryId, 'Responded');
    setConversations((prev) => {
      const exists = prev.find((c) => c.enquiryId === enquiryId);
      const msgObj = { id: 'm-' + Date.now(), senderId: currentUser.id, senderName: currentUser.name, text, time: 'Just now' };
      if (exists) {
        return prev.map((c) => (c.enquiryId === enquiryId ? { ...c, messages: [...c.messages, msgObj] } : c));
      }
      return [
        {
          id: 'conv-' + Date.now(),
          enquiryId,
          listingTitle: enq.listingTitle,
          participants: [enq.senderId, enq.recipientId],
          unreadFor: [enq.senderId],
          messages: [msgObj]
        },
        ...prev
      ];
    });
    notify('Response dispatched and synced to Messages');
  };

  const sendMessage = (convId, text) => {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== convId) return c;
        const others = c.participants.filter((p) => p !== currentUser.id);
        return {
          ...c,
          unreadFor: others,
          messages: [...c.messages, { id: 'm-' + Date.now(), senderId: currentUser.id, senderName: currentUser.name, text, time: 'Just now' }]
        };
      })
    );
  };

  const markConversationRead = (convId) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === convId ? { ...c, unreadFor: c.unreadFor.filter((id) => id !== currentUser.id) } : c))
    );
  };

  const markNotificationRead = (id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => (n.userId === currentUser.id || currentUser.role === ROLES.ADMIN ? { ...n, isRead: true } : n)));
    notify('All notifications marked as read');
  };

  const updateUserProfile = (patch) => {
    setUsers((prev) => prev.map((u) => (u.id === currentUser.id ? { ...u, ...patch, profileCompletion: Math.min(100, (u.profileCompletion || 80) + 5) } : u)));
    appendLog('PROFILE_UPDATED', `Updated profile information for ${currentUser.name}`);
    notify('Profile updated');
  };

  const requestVerification = (entityType, entityName) => {
    setVerifications((prev) => [
      {
        id: 'ver-' + Date.now(),
        entityType,
        entityId: currentUser.id,
        entityName,
        applicantName: currentUser.name,
        email: currentUser.email,
        documentName: 'Identity_Verification_Packet.pdf',
        registrationNo: 'KYC-' + Math.floor(10000 + Math.random() * 89999),
        city: `${currentUser.city}, ${currentUser.state}`,
        submittedAt: new Date().toISOString().slice(0, 10),
        status: 'Pending'
      },
      ...prev
    ]);
    notify('Verification request submitted to Platform Administration');
  };

  const updateOrganisation = (orgId, patch) => {
    setOrganisations((prev) => prev.map((o) => (o.id === orgId ? { ...o, ...patch } : o)));
    notify('Organisation profile saved');
  };

  const addOrgMember = (orgId, member) => {
    setOrganisations((prev) =>
      prev.map((o) =>
        o.id === orgId ? { ...o, members: [...o.members, { id: 'mem-' + Date.now(), ...member, status: 'Active' }] } : o
      )
    );
    notify(`Invited ${member.name} to organisation workspace`);
  };

  const removeOrgMember = (orgId, memberId) => {
    setOrganisations((prev) =>
      prev.map((o) => (o.id === orgId ? { ...o, members: o.members.filter((m) => m.id !== memberId) } : o))
    );
    notify('Team member removed');
  };

  const addOrgDocument = (orgId, fileName) => {
    const today = new Date().toISOString().slice(0, 10);
    setOrganisations((prev) =>
      prev.map((o) =>
        o.id === orgId
          ? { ...o, documents: [...o.documents, { id: 'doc-' + Date.now(), name: fileName, type: 'Compliance Filing', status: 'Pending Review', uploadedAt: today }] }
          : o
      )
    );
    notify(`Uploaded ${fileName} for verification review`);
  };

  const toggleUserAccountStatus = (userId) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== userId) return u;
        const next = u.accountStatus === 'Active' ? 'Inactive' : 'Active';
        appendLog('USER_STATUS_CHANGED', `Set user ${u.name} account status to ${next}`);
        notify(`${u.name} marked ${next}`);
        return { ...u, accountStatus: next };
      })
    );
  };

  const updateOrganisationStatus = (orgId, status) => {
    setOrganisations((prev) => prev.map((o) => (o.id === orgId ? { ...o, verificationStatus: status } : o)));
    appendLog('ORG_STATUS_CHANGED', `Updated organisation ${orgId} verification status to ${status}`);
    notify(`Organisation marked ${status}`);
  };

  const processVerification = (verId, decision) => {
    const target = verifications.find((v) => v.id === verId);
    setVerifications((prev) => prev.map((v) => (v.id === verId ? { ...v, status: decision } : v)));
    if (target) {
      const mapped = decision === 'Approved' ? 'Verified' : 'Rejected';
      setOrganisations((prev) => prev.map((o) => (o.id === target.entityId ? { ...o, verificationStatus: mapped } : o)));
      setUsers((prev) => prev.map((u) => (u.id === target.entityId || u.organisationId === target.entityId ? { ...u, verificationStatus: mapped } : u)));
      appendLog('VERIFICATION_DECISION', `${decision} verification for ${target.entityName}`);
      notify(`Verification ${decision.toLowerCase()} for ${target.entityName}`);
    }
  };

  const addCategory = (name) => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    setCategories((prev) => [...prev, { id: 'cat-' + Date.now(), name, slug, listingCount: 0, active: true }]);
    notify(`Category "${name}" added`);
  };

  const toggleCategory = (catId) => {
    setCategories((prev) => prev.map((c) => (c.id === catId ? { ...c, active: !c.active } : c)));
  };

  const addLocation = ({ city, state, pinCodes }) => {
    setLocations((prev) => [
      ...prev,
      { id: 'loc-' + Date.now(), city, state, pinCodes, x: 42, y: 50, active: true }
    ]);
    notify(`Added regional hub ${city}, ${state}`);
  };

  const toggleLocation = (locId) => {
    setLocations((prev) => prev.map((l) => (l.id === locId ? { ...l, active: !l.active } : l)));
  };

  const updateSettings = (next) => {
    setSettings(next);
    appendLog('SETTINGS_UPDATED', 'Updated platform governance settings');
    notify('Platform settings saved');
  };

  const resetDemoData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUsers(INITIAL_USERS);
    setOrganisations(INITIAL_ORGANISATIONS);
    setCategories(INITIAL_CATEGORIES);
    setLocations(INITIAL_LOCATIONS);
    setListings(INITIAL_LISTINGS);
    setEnquiries(INITIAL_ENQUIRIES);
    setConversations(INITIAL_CONVERSATIONS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setVerifications(INITIAL_VERIFICATIONS);
    setLogs(INITIAL_LOGS);
    setSettings(INITIAL_SETTINGS);
    setSavedIds(['lst-101', 'lst-103']);
    setCurrentUserId('usr-ind-01');
    notify('Demo dataset restored to initial state');
  };

  const ctxValue = {
    currentUser,
    users,
    organisations,
    categories,
    locations,
    listings,
    enquiries,
    conversations,
    notifications,
    verifications,
    logs,
    settings,
    savedIds,
    globalSearchQuery,
    setGlobalSearchQuery,
    notify,
    loginAsUser,
    loginWithCredentials,
    switchDemoRole,
    logout,
    registerAccount,
    toggleSaveListing,
    saveListing,
    updateListingStatus,
    deleteListing,
    sendEnquiry,
    updateEnquiryStatus,
    respondToEnquiry,
    sendMessage,
    markConversationRead,
    markNotificationRead,
    markAllNotificationsRead,
    updateUserProfile,
    requestVerification,
    updateOrganisation,
    addOrgMember,
    removeOrgMember,
    addOrgDocument,
    toggleUserAccountStatus,
    updateOrganisationStatus,
    processVerification,
    addCategory,
    toggleCategory,
    addLocation,
    toggleLocation,
    updateSettings,
    resetDemoData
  };

  return (
    <NexoraContext.Provider value={ctxValue}>
      <style>{NEXORA_STYLES}</style>
      <Routes>
        <Route path="/login" element={currentUser ? <Navigate to="/dashboard" replace /> : <LoginScreen />} />
        <Route path="/register" element={currentUser ? <Navigate to="/dashboard" replace /> : <RegisterScreen />} />

        <Route path="/dashboard" element={<ProtectedRoute><DashboardRouter /></ProtectedRoute>} />
        <Route path="/discover" element={<ProtectedRoute><ListingDiscoveryScreen /></ProtectedRoute>} />
        <Route path="/listings/new" element={<ProtectedRoute><CreateEditListingScreen /></ProtectedRoute>} />
        <Route path="/listings/:id" element={<ProtectedRoute><ListingDetailsScreen /></ProtectedRoute>} />
        <Route path="/listings/:id/edit" element={<ProtectedRoute><CreateEditListingScreen /></ProtectedRoute>} />
        <Route path="/my-listings" element={<ProtectedRoute><MyListingsScreen /></ProtectedRoute>} />
        <Route path="/enquiries" element={<ProtectedRoute><EnquiriesScreen /></ProtectedRoute>} />
        <Route path="/messages" element={<ProtectedRoute><MessagesScreen /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><NotificationsScreen /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><UserProfileScreen /></ProtectedRoute>} />
        <Route path="/organisation" element={<ProtectedRoute><OrganisationProfileScreen /></ProtectedRoute>} />
        <Route path="/provider-profile" element={<ProtectedRoute><ServiceProviderProfileScreen /></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute><AnalyticsReportsScreen /></ProtectedRoute>} />

        {/* Centralised Administration Routes */}
        <Route path="/admin/overview" element={<ProtectedRoute><AdminOverviewDashboard /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute><AdminUsersScreen /></ProtectedRoute>} />
        <Route path="/admin/organisations" element={<ProtectedRoute><AdminOrganisationsScreen /></ProtectedRoute>} />
        <Route path="/admin/providers" element={<ProtectedRoute><AdminProvidersScreen /></ProtectedRoute>} />
        <Route path="/admin/listings" element={<ProtectedRoute><AdminListingsScreen /></ProtectedRoute>} />
        <Route path="/admin/verifications" element={<ProtectedRoute><AdminVerificationsScreen /></ProtectedRoute>} />
        <Route path="/admin/enquiries" element={<ProtectedRoute><EnquiriesScreen /></ProtectedRoute>} />
        <Route path="/admin/categories" element={<ProtectedRoute><AdminCategoriesScreen /></ProtectedRoute>} />
        <Route path="/admin/locations" element={<ProtectedRoute><AdminLocationsScreen /></ProtectedRoute>} />
        <Route path="/admin/analytics" element={<ProtectedRoute><AnalyticsReportsScreen /></ProtectedRoute>} />
        <Route path="/admin/settings" element={<ProtectedRoute><AdminSettingsScreen /></ProtectedRoute>} />
        <Route path="/admin/logs" element={<ProtectedRoute><AdminLogsScreen /></ProtectedRoute>} />

        <Route path="/" element={<Navigate to={currentUser ? '/dashboard' : '/login'} replace />} />
        <Route path="*" element={<Navigate to={currentUser ? '/dashboard' : '/login'} replace />} />
      </Routes>

      {/* Toast Stack */}
      <div className="nx-toast-stack" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className="nx-toast">
            <span>{t.text}</span>
            <button
              type="button"
              onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
              style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0, display: 'flex' }}
              aria-label="Dismiss notification"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </NexoraContext.Provider>
  );
}
