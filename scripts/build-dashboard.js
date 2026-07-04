const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const { globSync } = require('glob');

// Root of the LLD repository
const REPO_ROOT = path.resolve(__dirname, '..');
const OUTPUT_FILE = path.join(REPO_ROOT, 'dashboard.html');

console.log('Scanning for Markdown files in:', REPO_ROOT);

// Find all .md files, ignoring node_modules, .git, and the scripts directory
const mdFiles = globSync('**/*.md', {
    cwd: REPO_ROOT,
    ignore: ['node_modules/**', '.git/**', 'scripts/**']
});

console.log(`Found ${mdFiles.length} Markdown files.`);

// 1. Build a nested tree structure from the file paths
const tree = {};
mdFiles.forEach(file => {
    const parts = file.split('/');
    let current = tree;
    for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (i === parts.length - 1) {
            current[part] = file; // Store full path at leaf
        } else {
            if (!current[part]) current[part] = {};
            current = current[part];
        }
    }
});

let sidebarHtml = '';
let contentHtml = '';
let globalIndex = 0;
let isFirstFile = true;

// 2. Generate the nested HTML recursively
function generateTreeHtml(node, depth = 0) {
    let html = '';
    const keys = Object.keys(node).sort((a, b) => {
        // Sort folders first, then files
        const aIsObj = typeof node[a] === 'object';
        const bIsObj = typeof node[b] === 'object';
        if (aIsObj && !bIsObj) return -1;
        if (!aIsObj && bIsObj) return 1;
        return a.localeCompare(b);
    });

    keys.forEach(key => {
        const isFolder = typeof node[key] === 'object';
        const indent = depth * 15;
        
        if (isFolder) {
            // It's a folder, render a collapsible header
            // Default to expanding the first level folder if depth === 0
            const folderId = 'folder-' + Math.random().toString(36).substr(2, 9);
            const isExpanded = depth === 0;
            const display = isExpanded ? 'block' : 'none';
            const iconClass = isExpanded ? 'fa-chevron-down' : 'fa-chevron-right';

            html += `
                <div class="sidebar-folder">
                    <div class="folder-header" onclick="toggleFolder('${folderId}')" style="padding-left: ${20 + indent}px;">
                        <i class="fas ${iconClass} folder-chevron" id="icon-${folderId}"></i> 
                        <i class="fas fa-folder folder-icon-color"></i> ${key}
                    </div>
                    <div class="folder-content" id="${folderId}" style="display: ${display};">
                        ${generateTreeHtml(node[key], depth + 1)}
                    </div>
                </div>
            `;
        } else {
            // It's a file, render the content block and the link
            const fullPath = path.join(REPO_ROOT, node[key]);
            const content = fs.readFileSync(fullPath, 'utf8');
            const htmlContent = marked(content);
            const safeId = 'doc-' + globalIndex;
            const displayName = key;

            // Add to sidebar
            html += `
                <a href="#" class="sidebar-link ${isFirstFile ? 'active' : ''}" data-target="${safeId}" style="padding-left: ${20 + indent + 22}px;">
                    <i class="fas fa-file-alt file-icon-color"></i> ${displayName}
                </a>
            `;

            // Add to content area
            contentHtml += `
                <div id="${safeId}" class="doc-content" style="display: ${isFirstFile ? 'block' : 'none'};">
                    <div class="breadcrumb">📄 ${node[key]}</div>
                    ${htmlContent}
                </div>
            `;
            
            isFirstFile = false;
            globalIndex++;
        }
    });
    return html;
}

sidebarHtml = generateTreeHtml(tree);

// Build the final HTML template
const dashboardHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LLD Practice Dashboard</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --bg-dark: #1e1e1e;
            --bg-sidebar: #252526;
            --bg-content: #1e1e1e;
            --text-main: #d4d4d4;
            --text-muted: #858585;
            --accent: #3794ff;
            --accent-hover: #1f6fd0;
            --border: #333333;
            --code-bg: #2d2d2d;
        }

        body {
            margin: 0;
            padding: 0;
            font-family: 'Inter', sans-serif;
            background-color: var(--bg-dark);
            color: var(--text-main);
            display: flex;
            height: 100vh;
            overflow: hidden;
        }

        /* Sidebar Styling */
        .sidebar {
            width: 340px;
            background-color: var(--bg-sidebar);
            border-right: 1px solid var(--border);
            display: flex;
            flex-direction: column;
            height: 100%;
        }

        .sidebar-header {
            padding: 24px 20px;
            border-bottom: 1px solid var(--border);
            background-color: var(--bg-sidebar);
        }

        .sidebar-header h1 {
            margin: 0;
            font-size: 1.2rem;
            color: var(--text-main);
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .sidebar-header h1 i {
            color: var(--accent);
        }

        .sidebar-nav {
            flex: 1;
            overflow-y: auto;
            padding: 12px 0;
        }

        .folder-header {
            padding: 10px 20px;
            color: var(--text-main);
            cursor: pointer;
            font-size: 0.9rem;
            font-weight: 600;
            transition: background 0.2s;
            display: flex;
            align-items: center;
            gap: 8px;
            user-select: none;
        }

        .folder-header:hover {
            background-color: rgba(255, 255, 255, 0.05);
        }

        .folder-chevron {
            font-size: 0.75rem;
            width: 14px;
            color: var(--text-muted);
        }

        .folder-icon-color {
            color: #eab308; /* Yellow folder */
        }

        .file-icon-color {
            color: var(--accent); /* Blue file */
        }

        .sidebar-link {
            display: block;
            padding: 8px 20px 8px 40px; /* Base padding, inline style overrides for depth */
            color: var(--text-muted);
            text-decoration: none;
            font-size: 0.9rem;
            transition: all 0.2s ease;
            border-left: 3px solid transparent;
            word-break: break-all;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .sidebar-link i {
            width: 20px;
            color: var(--border);
            transition: color 0.2s ease;
        }

        .sidebar-link:hover {
            background-color: rgba(56, 189, 248, 0.05);
            color: var(--text-main);
        }

        .sidebar-link.active {
            background-color: rgba(56, 189, 248, 0.1);
            color: var(--accent);
            border-left-color: var(--accent);
            font-weight: 600;
        }

        .sidebar-link.active i {
            color: var(--accent);
        }

        /* Scrollbar for sidebar */
        .sidebar-nav::-webkit-scrollbar { width: 6px; }
        .sidebar-nav::-webkit-scrollbar-track { background: transparent; }
        .sidebar-nav::-webkit-scrollbar-thumb { background: var(--border); border-radius: 4px; }

        /* Main Content Styling */
        .main-content {
            flex: 1;
            height: 100%;
            overflow-y: auto;
            background-color: var(--bg-content);
            position: relative;
        }

        .doc-content {
            padding: 40px 60px 80px 60px;
            max-width: 900px;
            margin: 0 auto;
            animation: fadeIn 0.3s ease-in-out;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .breadcrumb {
            font-size: 0.85rem;
            color: var(--accent);
            margin-bottom: 30px;
            padding-bottom: 15px;
            border-bottom: 1px solid var(--border);
            font-family: monospace;
            letter-spacing: 0.5px;
        }

        /* Typography & Markdown Styles */
        h1, h2, h3, h4, h5 {
            color: var(--text-main);
            margin-top: 1.5em;
            margin-bottom: 0.5em;
            font-weight: 600;
        }

        h1 { font-size: 2.2rem; border-bottom: 2px solid var(--border); padding-bottom: 10px; }
        h2 { font-size: 1.7rem; border-bottom: 1px solid var(--border); padding-bottom: 8px; }
        h3 { font-size: 1.3rem; }

        p, li {
            line-height: 1.7;
            color: var(--text-muted);
            font-size: 1.05rem;
        }

        a {
            color: var(--accent);
            text-decoration: none;
            transition: color 0.2s ease;
        }

        a:hover {
            color: var(--accent-hover);
            text-decoration: underline;
        }

        code {
            background-color: var(--code-bg);
            color: #e2e8f0;
            padding: 3px 6px;
            border-radius: 4px;
            font-family: 'Fira Code', Consolas, monospace;
            font-size: 0.9em;
            border: 1px solid var(--border);
        }

        pre {
            background-color: var(--code-bg);
            padding: 20px;
            border-radius: 8px;
            overflow-x: auto;
            border: 1px solid var(--border);
            margin: 20px 0;
            box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);
        }

        pre code {
            background-color: transparent;
            padding: 0;
            border: none;
            color: #cbd5e1;
        }

        blockquote {
            border-left: 4px solid var(--accent);
            margin: 0;
            padding: 10px 20px;
            background-color: rgba(56, 189, 248, 0.05);
            border-radius: 0 8px 8px 0;
            color: var(--text-main);
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }

        th, td {
            border: 1px solid var(--border);
            padding: 12px;
            text-align: left;
        }

        th {
            background-color: var(--bg-sidebar);
            font-weight: 600;
        }

        /* Checkboxes in markdown tasks */
        input[type="checkbox"] {
            accent-color: var(--accent);
            width: 16px;
            height: 16px;
            margin-right: 8px;
            vertical-align: middle;
        }

    </style>
</head>
<body>

    <div class="sidebar">
        <div class="sidebar-header">
            <h1><i class="fas fa-layer-group"></i> LLD Specs</h1>
        </div>
        <div class="sidebar-nav" id="sidebar-nav">
            ${sidebarHtml}
        </div>
    </div>

    <div class="main-content">
        ${contentHtml}
    </div>

    <script>
        // Toggle Folders in Sidebar
        function toggleFolder(id) {
            const el = document.getElementById(id);
            const icon = document.getElementById('icon-' + id);
            if (el.style.display === 'none') {
                el.style.display = 'block';
                icon.classList.remove('fa-chevron-right');
                icon.classList.add('fa-chevron-down');
            } else {
                el.style.display = 'none';
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-right');
            }
        }

        document.addEventListener('DOMContentLoaded', () => {
            const links = document.querySelectorAll('.sidebar-link');
            const contents = document.querySelectorAll('.doc-content');

            links.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    // Remove active class from all links
                    links.forEach(l => l.classList.remove('active'));
                    
                    // Add active class to clicked link
                    link.classList.add('active');

                    // Hide all content
                    contents.forEach(c => c.style.display = 'none');

                    // Show target content
                    const targetId = link.getAttribute('data-target');
                    document.getElementById(targetId).style.display = 'block';
                    
                    // Scroll to top
                    document.querySelector('.main-content').scrollTop = 0;
                });
            });
        });
    </script>
</body>
</html>
`;

fs.writeFileSync(OUTPUT_FILE, dashboardHtml);
console.log('✅ Dashboard successfully built at:', OUTPUT_FILE);
