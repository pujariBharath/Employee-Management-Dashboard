/* CSS Custom Properties */
:root {
  --primary-50: #eff6ff;
  --primary-100: #dbeafe;
  --primary-500: #3b82f6;
  --primary-600: #2563eb;
  --primary-700: #1d4ed8;

  --success-50: #f0fdf4;
  --success-500: #22c55e;
  --success-600: #16a34a;

  --warning-50: #fffbeb;
  --warning-500: #f59e0b;
  --warning-600: #d97706;

  --danger-50: #fef2f2;
  --danger-500: #ef4444;
  --danger-600: #dc2626;

  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-200: #e5e7eb;
  --gray-300: #d1d5db;
  --gray-400: #9ca3af;
  --gray-500: #6b7280;
  --gray-600: #4b5563;
  --gray-700: #374151;
  --gray-800: #1f2937;
  --gray-900: #111827;

  --white: #ffffff;
  --black: #000000;

  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04);

  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;

  --font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;

  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-3: 0.75rem;
  --spacing-4: 1rem;
  --spacing-5: 1.25rem;
  --spacing-6: 1.5rem;
  --spacing-8: 2rem;
  --spacing-10: 2.5rem;
  --spacing-12: 3rem;

  --transition-fast: 150ms ease-in-out;
  --transition-normal: 250ms ease-in-out;
  --transition-slow: 350ms ease-in-out;

  --sidebar-width: 320px;
  --header-height: 64px;
}

/* Reset and Base Styles */
*,
*::before,
*::after {
  box-sizing: border-box;
}

* {
  margin: 0;
  padding: 0;
}

html {
  height: 100%;
}

body {
  font-family: var(--font-family);
  font-size: var(--font-size-base);
  line-height: 1.6;
  color: var(--gray-700);
  background-color: var(--gray-50);
  height: 100%;
  overflow-x: hidden;
}

/* Loading Screen */
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--white);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  transition: opacity var(--transition-normal);
}

.loading-screen.hidden {
  opacity: 0;
  pointer-events: none;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--gray-200);
  border-top: 3px solid var(--primary-600);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: var(--spacing-4);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Toast Notifications */
.toast-container {
  position: fixed;
  top: var(--spacing-6);
  right: var(--spacing-6);
  z-index: 10000;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3);
}

.toast {
  background: var(--white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  padding: var(--spacing-4) var(--spacing-5);
  border-left: 4px solid;
  min-width: 320px;
  animation: slideInRight var(--transition-normal);
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
}

.toast.success {
  border-left-color: var(--success-500);
}
.toast.error {
  border-left-color: var(--danger-500);
}
.toast.info {
  border-left-color: var(--primary-500);
}
.toast.warning {
  border-left-color: var(--warning-500);
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* App Container */
.app-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header */
.header {
  background: var(--white);
  border-bottom: 1px solid var(--gray-200);
  height: var(--header-height);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: var(--shadow-sm);
}

.header-content {
  height: 100%;
  max-width: 100%;
  padding: 0 var(--spacing-6);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-left {
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
}

.sidebar-toggle {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--spacing-2);
  border-radius: var(--radius-sm);
  transition: var(--transition-fast);
}

.sidebar-toggle:hover {
  background: var(--gray-100);
}

.sidebar-toggle span {
  width: 20px;
  height: 2px;
  background: var(--gray-600);
  border-radius: 1px;
  transition: var(--transition-fast);
}

.header-title {
  font-size: var(--font-size-xl);
  font-weight: 700;
  color: var(--gray-900);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
}

/* Main Layout */
.main-layout {
  flex: 1;
  display: flex;
  overflow: hidden;
}

/* Sidebar */
.sidebar {
  width: var(--sidebar-width);
  background: var(--white);
  border-right: 1px solid var(--gray-200);
  overflow-y: auto;
  transition: transform var(--transition-normal);
}

.sidebar-content {
  padding: var(--spacing-6);
}

.search-section {
  margin-bottom: var(--spacing-8);
}

.search-box {
  position: relative;
}

.search-icon {
  position: absolute;
  left: var(--spacing-3);
  top: 50%;
  transform: translateY(-50%);
  color: var(--gray-400);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: var(--spacing-3) var(--spacing-10) var(--spacing-3) var(--spacing-10);
  border: 1px solid var(--gray-300);
  border-radius: var(--radius-lg);
  font-size: var(--font-size-sm);
  transition: var(--transition-fast);
  background: var(--white);
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px rgb(59 130 246 / 0.1);
}

.clear-search {
  position: absolute;
  right: var(--spacing-3);
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--gray-400);
  cursor: pointer;
  font-size: var(--font-size-lg);
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: var(--transition-fast);
}

.clear-search:hover {
  background: var(--gray-100);
  color: var(--gray-600);
}

.filter-section {
  margin-bottom: var(--spacing-6);
}

.filter-title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--gray-900);
  margin-bottom: var(--spacing-5);
  padding-bottom: var(--spacing-3);
  border-bottom: 2px solid var(--primary-500);
}

.filter-group {
  margin-bottom: var(--spacing-5);
}

.filter-label {
  display: block;
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--gray-700);
  margin-bottom: var(--spacing-2);
}

.filter-select {
  width: 100%;
  padding: var(--spacing-3);
  border: 1px solid var(--gray-300);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  background: var(--white);
  transition: var(--transition-fast);
}

.filter-select:focus {
  outline: none;
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px rgb(59 130 246 / 0.1);
}

.salary-range {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
}

.salary-input {
  flex: 1;
  padding: var(--spacing-3);
  border: 1px solid var(--gray-300);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  background: var(--white);
  transition: var(--transition-fast);
}

.salary-input:focus {
  outline: none;
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px rgb(59 130 246 / 0.1);
}

.salary-separator {
  color: var(--gray-400);
  font-weight: 500;
}

/* Main Content */
.main-content {
  flex: 1;
  padding: var(--spacing-6);
  overflow-y: auto;
  background: var(--gray-50);
}

/* Statistics Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-5);
  margin-bottom: var(--spacing-8);
}

.stat-card {
  background: var(--white);
  border-radius: var(--radius-xl);
  padding: var(--spacing-6);
  box-shadow: var(--shadow-md);
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
  transition: var(--transition-normal);
  border: 1px solid var(--gray-200);
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.stat-icon {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-card-primary .stat-icon {
  background: var(--primary-50);
  color: var(--primary-600);
}

.stat-card-success .stat-icon {
  background: var(--success-50);
  color: var(--success-600);
}

.stat-card-info .stat-icon {
  background: var(--primary-50);
  color: var(--primary-600);
}

.stat-card-warning .stat-icon {
  background: var(--warning-50);
  color: var(--warning-600);
}

.stat-content {
  flex: 1;
}

.stat-number {
  font-size: var(--font-size-3xl);
  font-weight: 700;
  color: var(--gray-900);
  margin-bottom: var(--spacing-1);
}

.stat-label {
  font-size: var(--font-size-sm);
  color: var(--gray-500);
  font-weight: 500;
}

/* Table Controls */
.table-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-5);
  padding: var(--spacing-4);
  background: var(--white);
  border-radius: var(--radius-lg);
  border: 1px solid var(--gray-200);
}

.table-controls-left {
  display: flex;
  align-items: center;
  gap: var(--spacing-4);
}

.bulk-actions {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  padding: var(--spacing-2) var(--spacing-4);
  background: var(--primary-50);
  border-radius: var(--radius-md);
  border: 1px solid var(--primary-200);
}

.bulk-selected {
  font-size: var(--font-size-sm);
  color: var(--primary-700);
  font-weight: 500;
}

.results-info {
  font-size: var(--font-size-sm);
  color: var(--gray-600);
  font-weight: 500;
}

.items-per-page {
  padding: var(--spacing-2) var(--spacing-3);
  border: 1px solid var(--gray-300);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  background: var(--white);
}

/* Table */
.table-container {
  background: var(--white);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--gray-200);
  margin-bottom: var(--spacing-6);
}

.table-wrapper {
  overflow-x: auto;
}

.employee-table {
  width: 100%;
  border-collapse: collapse;
}

.employee-table th,
.employee-table td {
  padding: var(--spacing-4) var(--spacing-5);
  text-align: left;
  border-bottom: 1px solid var(--gray-200);
}

.employee-table th {
  background: var(--gray-50);
  font-weight: 600;
  color: var(--gray-700);
  font-size: var(--font-size-sm);
  white-space: nowrap;
}

.employee-table th.sortable {
  cursor: pointer;
  user-select: none;
  transition: var(--transition-fast);
  position: relative;
}

.employee-table th.sortable:hover {
  background: var(--gray-100);
  color: var(--primary-600);
}

.sort-indicator {
  margin-left: var(--spacing-2);
  opacity: 0.5;
  font-size: var(--font-size-xs);
}

.employee-table th.sorted-asc .sort-indicator::after {
  content: "↑";
  opacity: 1;
  color: var(--primary-600);
}

.employee-table th.sorted-desc .sort-indicator::after {
  content: "↓";
  opacity: 1;
  color: var(--primary-600);
}

.employee-table tbody tr {
  transition: var(--transition-fast);
}

.employee-table tbody tr:hover {
  background: var(--gray-50);
}

.employee-table td {
  font-size: var(--font-size-sm);
  color: var(--gray-700);
}

.checkbox-column,
.actions-column {
  width: 1%;
  white-space: nowrap;
}

.checkbox {
  width: 16px;
  height: 16px;
  accent-color: var(--primary-600);
}

.employee-name {
  font-weight: 600;
  color: var(--gray-900);
}

.employee-email {
  color: var(--primary-600);
}

.employee-salary::before {
  content: "$";
}

.status-badge {
  display: inline-flex;
  align-items: center;
  padding: var(--spacing-1) var(--spacing-3);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.status-badge.active {
  background: var(--success-50);
  color: var(--success-700);
}

.status-badge.inactive {
  background: var(--danger-50);
  color: var(--danger-700);
}

.action-buttons {
  display: flex;
  gap: var(--spacing-2);
}

.action-btn {
  padding: var(--spacing-2);
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: var(--transition-fast);
  font-size: var(--font-size-sm);
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-btn.edit {
  background: var(--primary-50);
  color: var(--primary-600);
}

.action-btn.edit:hover {
  background: var(--primary-100);
}

.action-btn.delete {
  background: var(--danger-50);
  color: var(--danger-600);
}

.action-btn.delete:hover {
  background: var(--danger-100);
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: var(--spacing-12) var(--spacing-6);
  color: var(--gray-500);
}

.empty-state svg {
  margin-bottom: var(--spacing-4);
  opacity: 0.5;
}

.empty-state h3 {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--gray-700);
  margin-bottom: var(--spacing-2);
}

/* Pagination */
.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: var(--spacing-6);
}

.pagination {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
}

.pagination-btn {
  padding: var(--spacing-2) var(--spacing-4);
  border: 1px solid var(--gray-300);
  background: var(--white);
  color: var(--gray-600);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: var(--transition-fast);
  font-size: var(--font-size-sm);
  min-width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination-btn:hover:not(:disabled) {
  background: var(--gray-50);
  border-color: var(--primary-500);
  color: var(--primary-600);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-btn.active {
  background: var(--primary-600);
  border-color: var(--primary-600);
  color: var(--white);
}

.pagination-info {
  margin: 0 var(--spacing-4);
  font-size: var(--font-size-sm);
  color: var(--gray-600);
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-2);
  padding: var(--spacing-3) var(--spacing-5);
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition-fast);
  text-decoration: none;
  white-space: nowrap;
  position: relative;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background: var(--primary-600);
  color: var(--white);
}

.btn-primary:hover:not(:disabled) {
  background: var(--primary-700);
}

.btn-secondary {
  background: var(--gray-100);
  color: var(--gray-700);
  border-color: var(--gray-300);
}

.btn-secondary:hover:not(:disabled) {
  background: var(--gray-200);
}

.btn-outline {
  background: transparent;
  color: var(--gray-700);
  border-color: var(--gray-300);
}

.btn-outline:hover:not(:disabled) {
  background: var(--gray-50);
  border-color: var(--primary-500);
  color: var(--primary-600);
}

.btn-danger {
  background: var(--danger-600);
  color: var(--white);
}

.btn-danger:hover:not(:disabled) {
  background: var(--danger-700);
}

.btn-sm {
  padding: var(--spacing-2) var(--spacing-3);
  font-size: var(--font-size-xs);
}

.btn-full {
  width: 100%;
}

.btn-loading {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: none;
}

.modal.show {
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal-dialog {
  position: relative;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  animation: modalSlideIn var(--transition-normal);
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.modal-content {
  background: var(--white);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-xl);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-6);
  border-bottom: 1px solid var(--gray-200);
}

.modal-title {
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--gray-900);
}

.modal-close {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--gray-400);
  padding: var(--spacing-2);
  border-radius: var(--radius-sm);
  transition: var(--transition-fast);
}

.modal-close:hover {
  background: var(--gray-100);
  color: var(--gray-600);
}

.modal-body {
  padding: var(--spacing-6);
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-3);
  padding: var(--spacing-6);
  border-top: 1px solid var(--gray-200);
  background: var(--gray-50);
}

/* Form Elements */
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-5);
}

.form-group {
  margin-bottom: var(--spacing-5);
}

.form-label {
  display: block;
  margin-bottom: var(--spacing-2);
  font-weight: 500;
  color: var(--gray-700);
  font-size: var(--font-size-sm);
}

.form-input,
.form-select {
  width: 100%;
  padding: var(--spacing-3) var(--spacing-4);
  border: 1px solid var(--gray-300);
  border-radius: var(--radius-md);
  font-size: var(--font-size-sm);
  transition: var(--transition-fast);
  background: var(--white);
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px rgb(59 130 246 / 0.1);
}

.form-error {
  display: block;
  margin-top: var(--spacing-1);
  font-size: var(--font-size-xs);
  color: var(--danger-600);
  min-height: 1.25rem;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .sidebar {
    position: fixed;
    top: var(--header-height);
    left: 0;
    height: calc(100vh - var(--header-height));
    z-index: 200;
    transform: translateX(-100%);
  }

  .sidebar.open {
    transform: translateX(0);
  }

  .sidebar-toggle {
    display: flex;
  }

  .main-content {
    width: 100%;
  }

  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}

@media (max-width: 768px) {
  .header-content {
    padding: 0 var(--spacing-4);
  }

  .header-title {
    font-size: var(--font-size-lg);
  }

  .header-actions {
    flex-direction: column;
    gap: var(--spacing-2);
  }

  .main-content {
    padding: var(--spacing-4);
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .table-controls {
    flex-direction: column;
    gap: var(--spacing-3);
    align-items: stretch;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .modal-dialog {
    width: 95%;
    margin: var(--spacing-4);
  }

  .modal-header,
  .modal-body,
  .modal-footer {
    padding: var(--spacing-4);
  }
}

@media (max-width: 480px) {
  .sidebar-content {
    padding: var(--spacing-4);
  }

  .stat-card {
    flex-direction: column;
    text-align: center;
    padding: var(--spacing-4);
  }

  .stat-icon {
    margin-bottom: var(--spacing-2);
  }

  .pagination {
    flex-wrap: wrap;
  }

  .pagination-info {
    order: -1;
    width: 100%;
    text-align: center;
    margin-bottom: var(--spacing-3);
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

.btn:focus-visible,
.form-input:focus-visible,
.form-select:focus-visible,
.sortable:focus-visible,
.action-btn:focus-visible {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
}

/* Print Styles */
@media print {
  .sidebar,
  .header-actions,
  .table-controls,
  .pagination-container,
  .action-buttons {
    display: none !important;
  }

  .main-layout {
    display: block;
  }

  .main-content {
    padding: 0;
  }

  .table-container {
    box-shadow: none;
    border: 1px solid var(--gray-300);
  }
}
