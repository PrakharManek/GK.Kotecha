// Global variables
let currentData = {
    blogPosts: [],
    events: [],
    jobs: []
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    loadInitialData();
    
    // Initialize page-specific functionality
    const currentPage = getCurrentPage();
    switch(currentPage) {
        case 'index':
            initializeHomePage();
            break;
        case 'blog':
            initializeBlogPage();
            break;
        case 'events':
            initializeEventsPage();
            break;
        case 'recruitment':
            initializeRecruitmentPage();
            break;
        case 'admin':
            initializeAdminGate();
            break;
    }
});

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Get current page name
function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop().split('.')[0];
    return page === '' ? 'index' : page;
}

// Load initial data
function loadInitialData() {
    // Load blog posts
    const blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [
        {
            id: 1,
            title: 'Understanding Corporate Governance in 2024',
            excerpt: 'Explore the latest trends and regulations in corporate governance that every company secretary should know.',
            content: 'Corporate governance continues to evolve rapidly in 2024. This comprehensive guide covers the latest regulatory changes, best practices, and emerging trends that company secretaries need to understand to ensure their organizations remain compliant and well-governed.',
            author: 'GK Kotecha',
            date: '2024-01-15',
            category: 'Governance',
            image: 'https://via.placeholder.com/400x200/3498db/ffffff?text=Corporate+Governance'
        },
        {
            id: 2,
            title: 'Digital Transformation in Company Secretarial Services',
            excerpt: 'How technology is revolutionizing the way we handle corporate compliance and documentation.',
            content: 'The digital transformation of company secretarial services is not just a trend—it\'s a necessity. From automated compliance monitoring to digital board portals, technology is reshaping how we manage corporate governance.',
            author: 'GK Kotecha',
            date: '2024-01-10',
            category: 'Technology',
            image: 'https://via.placeholder.com/400x200/2ecc71/ffffff?text=Digital+Transformation'
        },
        {
            id: 3,
            title: 'ESG Reporting Requirements for 2024',
            excerpt: 'A detailed look at the new Environmental, Social, and Governance reporting requirements.',
            content: 'ESG reporting has become a critical component of corporate governance. This article outlines the key requirements, frameworks, and best practices for implementing effective ESG reporting systems.',
            author: 'GK Kotecha',
            date: '2024-01-05',
            category: 'Compliance',
            image: 'https://via.placeholder.com/400x200/e74c3c/ffffff?text=ESG+Reporting'
        }
    ];
    
    // Load events
    const events = JSON.parse(localStorage.getItem('events')) || [
        {
            id: 1,
            title: 'Annual Corporate Governance Conference 2024',
            date: '2024-03-15',
            location: 'Convention Center, Business District',
            description: 'Join industry experts for a comprehensive discussion on the latest developments in corporate governance, regulatory changes, and best practices.',
            type: 'Conference',
            status: 'upcoming'
        },
        {
            id: 2,
            title: 'Company Secretaries Networking Event',
            date: '2024-02-20',
            location: 'Grand Hotel, Corporate City',
            description: 'An evening of networking and knowledge sharing among company secretaries and corporate governance professionals.',
            type: 'Networking',
            status: 'upcoming'
        },
        {
            id: 3,
            title: 'Digital Compliance Workshop',
            date: '2024-01-25',
            location: 'Tech Hub, Innovation Center',
            description: 'Hands-on workshop covering digital tools and technologies for modern compliance management.',
            type: 'Workshop',
            status: 'past'
        }
    ];
    
    // Load jobs
    const jobs = JSON.parse(localStorage.getItem('jobs')) || [
        {
            id: 1,
            title: 'Senior Company Secretary',
            location: 'Corporate City',
            type: 'Full-time',
            department: 'Legal & Compliance',
            description: 'We are seeking an experienced company secretary to join our team and provide comprehensive corporate governance support.',
            requirements: [
                'Qualified company secretary with 5+ years experience',
                'Strong knowledge of corporate law and regulations',
                'Excellent communication and organizational skills',
                'Experience with board management and compliance'
            ],
            salary: 'Competitive',
            posted: '2024-01-10',
            status: 'active'
        },
        {
            id: 2,
            title: 'Compliance Officer',
            location: 'Business District',
            type: 'Full-time',
            department: 'Legal & Compliance',
            description: 'Join our compliance team to ensure our organization meets all regulatory requirements and maintains high standards of corporate governance.',
            requirements: [
                'Degree in law or related field',
                '3+ years experience in compliance',
                'Knowledge of regulatory frameworks',
                'Attention to detail and analytical skills'
            ],
            salary: 'Competitive',
            posted: '2024-01-08',
            status: 'active'
        }
    ];
    
    currentData.blogPosts = blogPosts;
    currentData.events = events;
    currentData.jobs = jobs;
    
    // Save to localStorage
    localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
    localStorage.setItem('events', JSON.stringify(events));
    localStorage.setItem('jobs', JSON.stringify(jobs));
}

// Home page functionality
function initializeHomePage() {
    loadBlogPreview();
    initializeContactForm();
}

function loadBlogPreview() {
    const blogPreview = document.getElementById('blog-preview');
    if (!blogPreview) return;
    
    const recentPosts = currentData.blogPosts.slice(0, 3);
    
    blogPreview.innerHTML = recentPosts.map(post => `
        <div class="blog-card">
            <img src="${post.image}" alt="${post.title}">
            <div class="blog-card-content">
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
                <div class="blog-meta">
                    <span>${post.author}</span>
                    <span>${formatDate(post.date)}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const contactData = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
            timestamp: new Date().toISOString()
        };
        
        // Save contact form submission
        const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        contacts.push(contactData);
        localStorage.setItem('contacts', JSON.stringify(contacts));
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Blog page functionality
function initializeBlogPage() {
    loadBlogPosts();
    initializeBlogFilters();
}

function loadBlogPosts(category = 'all') {
    const blogContainer = document.getElementById('blog-posts');
    if (!blogContainer) return;
    
    let posts = currentData.blogPosts;
    if (category !== 'all') {
        posts = posts.filter(post => post.category === category);
    }
    
    blogContainer.innerHTML = posts.map(post => `
        <div class="blog-card">
            <img src="${post.image}" alt="${post.title}">
            <div class="blog-card-content">
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
                <div class="blog-meta">
                    <span>${post.author}</span>
                    <span>${formatDate(post.date)}</span>
                    <span class="category">${post.category}</span>
                </div>
                <button onclick="viewBlogPost(${post.id})" class="btn btn-primary">Read More</button>
            </div>
        </div>
    `).join('');
}

function initializeBlogFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.dataset.category;
            loadBlogPosts(category);
        });
    });
}

function viewBlogPost(id) {
    const post = currentData.blogPosts.find(p => p.id === id);
    if (!post) return;
    
    // Create modal for blog post
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>${post.title}</h2>
                <span class="close">&times;</span>
            </div>
            <div class="modal-body">
                <img src="${post.image}" alt="${post.title}" style="width: 100%; margin-bottom: 20px;">
                <div class="blog-meta" style="margin-bottom: 20px;">
                    <span>By ${post.author}</span>
                    <span>${formatDate(post.date)}</span>
                    <span class="category">${post.category}</span>
                </div>
                <div class="post-content">
                    ${post.content}
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'block';
    
    // Close modal functionality
    modal.querySelector('.close').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Events page functionality
function initializeEventsPage() {
    loadEvents();
    initializeEventFilters();
}

function loadEvents(filter = 'all') {
    const eventsContainer = document.getElementById('events-container');
    if (!eventsContainer) return;
    
    let events = currentData.events;
    if (filter !== 'all') {
        events = events.filter(event => event.status === filter);
    }
    
    eventsContainer.innerHTML = events.map(event => `
        <div class="event-card">
            <div class="event-date">
                <span class="day">${new Date(event.date).getDate()}</span>
                <span class="month">${new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}</span>
            </div>
            <div class="event-details">
                <h3>${event.title}</h3>
                <p class="location"><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                <p class="description">${event.description}</p>
                <div class="event-meta">
                    <span class="event-type">${event.type}</span>
                    <span class="event-status ${event.status}">${event.status}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function initializeEventFilters() {
    const filterButtons = document.querySelectorAll('.event-filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            loadEvents(filter);
        });
    });
}

// Recruitment page functionality
function initializeRecruitmentPage() {
    loadJobs();
    initializeJobFilters();
}

function loadJobs(filter = 'all') {
    const jobsContainer = document.getElementById('jobs-container');
    if (!jobsContainer) return;
    
    let jobs = currentData.jobs;
    if (filter !== 'all') {
        jobs = jobs.filter(job => job.status === filter);
    }
    
    jobsContainer.innerHTML = jobs.map(job => `
        <div class="job-card">
            <div class="job-header">
                <div>
                    <h3 class="job-title">${job.title}</h3>
                    <p class="job-location"><i class="fas fa-map-marker-alt"></i> ${job.location}</p>
                </div>
                <span class="job-type">${job.type}</span>
            </div>
            <div class="job-description">
                <p>${job.description}</p>
            </div>
            <div class="job-requirements">
                <h4>Requirements:</h4>
                <ul>
                    ${job.requirements.map(req => `<li>${req}</li>`).join('')}
                </ul>
            </div>
            <div class="job-footer">
                <p><strong>Department:</strong> ${job.department}</p>
                <p><strong>Salary:</strong> ${job.salary}</p>
                <p><strong>Posted:</strong> ${formatDate(job.posted)}</p>
                <button onclick="applyForJob(${job.id})" class="btn btn-primary">Apply Now</button>
            </div>
        </div>
    `).join('');
}

function initializeJobFilters() {
    const filterButtons = document.querySelectorAll('.job-filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            loadJobs(filter);
        });
    });
}

function applyForJob(jobId) {
    const job = currentData.jobs.find(j => j.id === jobId);
    if (!job) return;
    
    // Create application modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Apply for ${job.title}</h2>
                <span class="close">&times;</span>
            </div>
            <form class="admin-form" id="job-application-form">
                <input type="text" name="name" placeholder="Full Name" required>
                <input type="email" name="email" placeholder="Email Address" required>
                <input type="tel" name="phone" placeholder="Phone Number" required>
                <textarea name="coverLetter" placeholder="Cover Letter" required></textarea>
                <input type="file" name="resume" accept=".pdf,.doc,.docx" required>
                <button type="submit" class="btn btn-primary">Submit Application</button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'block';
    
    // Close modal functionality
    modal.querySelector('.close').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    // Handle form submission
    const form = modal.querySelector('#job-application-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const application = {
            jobId: jobId,
            jobTitle: job.title,
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            coverLetter: formData.get('coverLetter'),
            resume: formData.get('resume').name,
            timestamp: new Date().toISOString()
        };
        
        // Save application
        const applications = JSON.parse(localStorage.getItem('jobApplications')) || [];
        applications.push(application);
        localStorage.setItem('jobApplications', JSON.stringify(applications));
        
        alert('Application submitted successfully! We will contact you soon.');
        document.body.removeChild(modal);
    });
}

// Admin page functionality
function initializeAdminGate() {
    const authBox = document.getElementById('admin-auth');
    const adminContainer = document.getElementById('admin-container');
    if (!authBox || !adminContainer) return;

    // If already unlocked in this session, skip prompt
    if (sessionStorage.getItem('adminUnlocked') === 'true') {
        authBox.style.display = 'none';
        adminContainer.style.display = '';
        initializeAdminPage();
        return;
    }

    const form = document.getElementById('admin-auth-form');
    const passwordInput = document.getElementById('admin-password');
    const errorEl = document.getElementById('admin-auth-error');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const value = (passwordInput.value || '').trim();
        if (value === 'Prakhar@2006') {
            sessionStorage.setItem('adminUnlocked', 'true');
            authBox.style.display = 'none';
            adminContainer.style.display = '';
            initializeAdminPage();
        } else {
            errorEl.style.display = 'block';
        }
    });
}

function initializeAdminPage() {
    initializeAdminNavigation();
    loadAdminContent('blog');
    updateAdminStats();
}

function initializeAdminNavigation() {
    const adminNavButtons = document.querySelectorAll('.admin-nav button');
    
    adminNavButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            adminNavButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const section = this.dataset.section;
            loadAdminContent(section);
        });
    });
}

function loadAdminContent(section) {
    const adminContent = document.getElementById('admin-content');
    if (!adminContent) return;
    
    switch(section) {
        case 'blog':
            loadAdminBlog();
            break;
        case 'events':
            loadAdminEvents();
            break;
        case 'jobs':
            loadAdminJobs();
            break;
        case 'applications':
            loadAdminApplications();
            break;
    }
}

function loadAdminBlog() {
    const adminContent = document.getElementById('admin-content');
    adminContent.innerHTML = `
        <div class="admin-section">
            <h3>Add New Blog Post</h3>
            <form class="admin-form" id="blog-form">
                <input type="text" name="title" placeholder="Post Title" required>
                <input type="text" name="author" placeholder="Author Name" required>
                <select name="category" required>
                    <option value="">Select Category</option>
                    <option value="Governance">Governance</option>
                    <option value="Compliance">Compliance</option>
                    <option value="Technology">Technology</option>
                    <option value="Industry News">Industry News</option>
                </select>
                <input type="url" name="image" placeholder="Image URL">
                <textarea name="excerpt" placeholder="Post Excerpt" required></textarea>
                <textarea name="content" placeholder="Post Content" required></textarea>
                <button type="submit" class="btn btn-primary">Add Post</button>
            </form>
        </div>
        <div class="admin-section">
            <h3>Manage Blog Posts</h3>
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="blog-table-body">
                    ${currentData.blogPosts.map(post => `
                        <tr>
                            <td>${post.title}</td>
                            <td>${post.author}</td>
                            <td>${post.category}</td>
                            <td>${formatDate(post.date)}</td>
                            <td class="admin-actions">
                                <button class="btn-edit" onclick="editBlogPost(${post.id})">Edit</button>
                                <button class="btn-delete" onclick="deleteBlogPost(${post.id})">Delete</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
    
    // Handle blog form submission
    const blogForm = document.getElementById('blog-form');
    blogForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(blogForm);
        const newPost = {
            id: Date.now(),
            title: formData.get('title'),
            author: formData.get('author'),
            category: formData.get('category'),
            image: formData.get('image') || 'https://via.placeholder.com/400x200/3498db/ffffff?text=Blog+Post',
            excerpt: formData.get('excerpt'),
            content: formData.get('content'),
            date: new Date().toISOString().split('T')[0]
        };
        
        currentData.blogPosts.unshift(newPost);
        localStorage.setItem('blogPosts', JSON.stringify(currentData.blogPosts));
        
        alert('Blog post added successfully!');
        blogForm.reset();
        loadAdminBlog();
    });
}

function loadAdminEvents() {
    const adminContent = document.getElementById('admin-content');
    adminContent.innerHTML = `
        <div class="admin-section">
            <h3>Add New Event</h3>
            <form class="admin-form" id="event-form">
                <input type="text" name="title" placeholder="Event Title" required>
                <input type="date" name="date" required>
                <input type="text" name="location" placeholder="Location" required>
                <select name="type" required>
                    <option value="">Select Type</option>
                    <option value="Conference">Conference</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Networking">Networking</option>
                    <option value="Seminar">Seminar</option>
                </select>
                <textarea name="description" placeholder="Event Description" required></textarea>
                <button type="submit" class="btn btn-primary">Add Event</button>
            </form>
        </div>
        <div class="admin-section">
            <h3>Manage Events</h3>
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Location</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="events-table-body">
                    ${currentData.events.map(event => `
                        <tr>
                            <td>${event.title}</td>
                            <td>${formatDate(event.date)}</td>
                            <td>${event.location}</td>
                            <td>${event.type}</td>
                            <td>${event.status}</td>
                            <td class="admin-actions">
                                <button class="btn-edit" onclick="editEvent(${event.id})">Edit</button>
                                <button class="btn-delete" onclick="deleteEvent(${event.id})">Delete</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
    
    // Handle event form submission
    const eventForm = document.getElementById('event-form');
    eventForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(eventForm);
        const eventDate = new Date(formData.get('date'));
        const today = new Date();
        const status = eventDate >= today ? 'upcoming' : 'past';
        
        const newEvent = {
            id: Date.now(),
            title: formData.get('title'),
            date: formData.get('date'),
            location: formData.get('location'),
            type: formData.get('type'),
            description: formData.get('description'),
            status: status
        };
        
        currentData.events.unshift(newEvent);
        localStorage.setItem('events', JSON.stringify(currentData.events));
        
        alert('Event added successfully!');
        eventForm.reset();
        loadAdminEvents();
    });
}

function loadAdminJobs() {
    const adminContent = document.getElementById('admin-content');
    adminContent.innerHTML = `
        <div class="admin-section">
            <h3>Add New Job</h3>
            <form class="admin-form" id="job-form">
                <input type="text" name="title" placeholder="Job Title" required>
                <input type="text" name="location" placeholder="Location" required>
                <select name="type" required>
                    <option value="">Select Type</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                </select>
                <input type="text" name="department" placeholder="Department" required>
                <input type="text" name="salary" placeholder="Salary" required>
                <textarea name="description" placeholder="Job Description" required></textarea>
                <textarea name="requirements" placeholder="Requirements (one per line)" required></textarea>
                <button type="submit" class="btn btn-primary">Add Job</button>
            </form>
        </div>
        <div class="admin-section">
            <h3>Manage Jobs</h3>
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Location</th>
                        <th>Type</th>
                        <th>Department</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody id="jobs-table-body">
                    ${currentData.jobs.map(job => `
                        <tr>
                            <td>${job.title}</td>
                            <td>${job.location}</td>
                            <td>${job.type}</td>
                            <td>${job.department}</td>
                            <td>${job.status}</td>
                            <td class="admin-actions">
                                <button class="btn-edit" onclick="editJob(${job.id})">Edit</button>
                                <button class="btn-delete" onclick="deleteJob(${job.id})">Delete</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
    
    // Handle job form submission
    const jobForm = document.getElementById('job-form');
    jobForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(jobForm);
        const requirements = formData.get('requirements').split('\n').filter(req => req.trim());
        
        const newJob = {
            id: Date.now(),
            title: formData.get('title'),
            location: formData.get('location'),
            type: formData.get('type'),
            department: formData.get('department'),
            salary: formData.get('salary'),
            description: formData.get('description'),
            requirements: requirements,
            posted: new Date().toISOString().split('T')[0],
            status: 'active'
        };
        
        currentData.jobs.unshift(newJob);
        localStorage.setItem('jobs', JSON.stringify(currentData.jobs));
        
        alert('Job posted successfully!');
        jobForm.reset();
        loadAdminJobs();
    });
}

function loadAdminApplications() {
    const applications = JSON.parse(localStorage.getItem('jobApplications')) || [];
    const adminContent = document.getElementById('admin-content');
    
    adminContent.innerHTML = `
        <div class="admin-section">
            <h3>Job Applications</h3>
            ${applications.length === 0 ? 
                '<p>No applications received yet.</p>' :
                `<table class="admin-table">
                    <thead>
                        <tr>
                            <th>Job Title</th>
                            <th>Applicant Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Applied Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${applications.map(app => `
                            <tr>
                                <td>${app.jobTitle}</td>
                                <td>${app.name}</td>
                                <td>${app.email}</td>
                                <td>${app.phone}</td>
                                <td>${formatDate(app.timestamp)}</td>
                                <td class="admin-actions">
                                    <button class="btn-edit" onclick="viewApplication('${app.timestamp}')">View</button>
                                    <button class="btn-delete" onclick="deleteApplication('${app.timestamp}')">Delete</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>`
            }
        </div>
    `;
}

// Admin CRUD operations
function deleteBlogPost(id) {
    if (confirm('Are you sure you want to delete this blog post?')) {
        currentData.blogPosts = currentData.blogPosts.filter(post => post.id !== id);
        localStorage.setItem('blogPosts', JSON.stringify(currentData.blogPosts));
        loadAdminBlog();
    }
}

function deleteEvent(id) {
    if (confirm('Are you sure you want to delete this event?')) {
        currentData.events = currentData.events.filter(event => event.id !== id);
        localStorage.setItem('events', JSON.stringify(currentData.events));
        loadAdminEvents();
    }
}

function deleteJob(id) {
    if (confirm('Are you sure you want to delete this job?')) {
        currentData.jobs = currentData.jobs.filter(job => job.id !== id);
        localStorage.setItem('jobs', JSON.stringify(currentData.jobs));
        loadAdminJobs();
    }
}

function deleteApplication(timestamp) {
    if (confirm('Are you sure you want to delete this application?')) {
        const applications = JSON.parse(localStorage.getItem('jobApplications')) || [];
        const updatedApplications = applications.filter(app => app.timestamp !== timestamp);
        localStorage.setItem('jobApplications', JSON.stringify(updatedApplications));
        loadAdminApplications();
    }
}

function viewApplication(timestamp) {
    const applications = JSON.parse(localStorage.getItem('jobApplications')) || [];
    const application = applications.find(app => app.timestamp === timestamp);
    
    if (!application) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Application Details</h2>
                <span class="close">&times;</span>
            </div>
            <div class="modal-body">
                <p><strong>Job:</strong> ${application.jobTitle}</p>
                <p><strong>Name:</strong> ${application.name}</p>
                <p><strong>Email:</strong> ${application.email}</p>
                <p><strong>Phone:</strong> ${application.phone}</p>
                <p><strong>Applied:</strong> ${formatDate(application.timestamp)}</p>
                <p><strong>Cover Letter:</strong></p>
                <p>${application.coverLetter}</p>
                <p><strong>Resume:</strong> ${application.resume}</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'block';
    
    modal.querySelector('.close').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Additional functionality for new features

// Newsletter subscription
function initializeNewsletterForm() {
    const newsletterForm = document.getElementById('newsletter-form');
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(newsletterForm);
        const subscriber = {
            email: formData.get('email'),
            timestamp: new Date().toISOString()
        };
        
        // Save subscriber
        const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers')) || [];
        if (!subscribers.find(sub => sub.email === subscriber.email)) {
            subscribers.push(subscriber);
            localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
            alert('Thank you for subscribing to our newsletter!');
        } else {
            alert('You are already subscribed to our newsletter.');
        }
        
        newsletterForm.reset();
    });
}

// Event registration form
function initializeEventRegistrationForm() {
    const eventRegistrationForm = document.getElementById('event-registration-form');
    if (!eventRegistrationForm) return;
    
    eventRegistrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(eventRegistrationForm);
        const registration = {
            name: formData.get('name'),
            email: formData.get('email'),
            interests: formData.get('interests'),
            timestamp: new Date().toISOString()
        };
        
        // Save registration
        const registrations = JSON.parse(localStorage.getItem('eventRegistrations')) || [];
        registrations.push(registration);
        localStorage.setItem('eventRegistrations', JSON.stringify(registrations));
        
        alert('Thank you for registering! We will keep you updated on relevant events.');
        eventRegistrationForm.reset();
    });
}

// General application form
function openGeneralApplication() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>General Application</h2>
                <span class="close">&times;</span>
            </div>
            <form class="admin-form" id="general-application-form">
                <input type="text" name="name" placeholder="Full Name" required>
                <input type="email" name="email" placeholder="Email Address" required>
                <input type="tel" name="phone" placeholder="Phone Number" required>
                <input type="text" name="position" placeholder="Desired Position">
                <select name="experience" required>
                    <option value="">Years of Experience</option>
                    <option value="0-1">0-1 years</option>
                    <option value="2-5">2-5 years</option>
                    <option value="6-10">6-10 years</option>
                    <option value="10+">10+ years</option>
                </select>
                <textarea name="coverLetter" placeholder="Cover Letter" required></textarea>
                <input type="file" name="resume" accept=".pdf,.doc,.docx" required>
                <button type="submit" class="btn btn-primary">Submit Application</button>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'block';
    
    // Close modal functionality
    modal.querySelector('.close').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    // Handle form submission
    const form = modal.querySelector('#general-application-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const application = {
            type: 'general',
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            position: formData.get('position'),
            experience: formData.get('experience'),
            coverLetter: formData.get('coverLetter'),
            resume: formData.get('resume').name,
            timestamp: new Date().toISOString()
        };
        
        // Save application
        const applications = JSON.parse(localStorage.getItem('generalApplications')) || [];
        applications.push(application);
        localStorage.setItem('generalApplications', JSON.stringify(applications));
        
        alert('General application submitted successfully! We will contact you if a suitable position becomes available.');
        document.body.removeChild(modal);
    });
}

// Calendar functionality
function initializeCalendar() {
    const calendarGrid = document.getElementById('calendar-grid');
    if (!calendarGrid) return;
    
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const currentMonthSpan = document.getElementById('current-month');
    
    let currentDate = new Date();
    
    function updateCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        // Update month display
        currentMonthSpan.textContent = currentDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long'
        });
        
        // Clear calendar
        calendarGrid.innerHTML = '';
        
        // Add day headers
        const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayHeaders.forEach(day => {
            const header = document.createElement('div');
            header.className = 'calendar-day-header';
            header.textContent = day;
            calendarGrid.appendChild(header);
        });
        
        // Get first day of month and number of days
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();
        
        // Add empty cells for days before month starts
        for (let i = 0; i < startingDayOfWeek; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day other-month';
            const prevMonth = new Date(year, month, 0);
            emptyDay.textContent = prevMonth.getDate() - startingDayOfWeek + i + 1;
            calendarGrid.appendChild(emptyDay);
        }
        
        // Add days of current month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = day;
            
            // Check if this day has an event
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const hasEvent = currentData.events.some(event => event.date === dateStr);
            
            if (hasEvent) {
                dayElement.classList.add('has-event');
                dayElement.title = 'Has event on this day';
            }
            
            calendarGrid.appendChild(dayElement);
        }
        
        // Add empty cells for days after month ends
        const remainingCells = 42 - (startingDayOfWeek + daysInMonth); // 42 = 6 rows * 7 days
        for (let i = 1; i <= remainingCells; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day other-month';
            emptyDay.textContent = i;
            calendarGrid.appendChild(emptyDay);
        }
    }
    
    // Event listeners for navigation
    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        updateCalendar();
    });
    
    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        updateCalendar();
    });
    
    // Initialize calendar
    updateCalendar();
}

// Admin additional functionality
function loadAdminContacts() {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const adminContent = document.getElementById('admin-content');
    
    adminContent.innerHTML = `
        <div class="admin-section">
            <h3>Contact Messages</h3>
            ${contacts.length === 0 ? 
                '<p>No contact messages received yet.</p>' :
                `<table class="admin-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Message</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${contacts.map(contact => `
                            <tr>
                                <td>${contact.name}</td>
                                <td>${contact.email}</td>
                                <td>${contact.message.substring(0, 50)}...</td>
                                <td>${formatDate(contact.timestamp)}</td>
                                <td class="admin-actions">
                                    <button class="btn-edit" onclick="viewContact('${contact.timestamp}')">View</button>
                                    <button class="btn-delete" onclick="deleteContact('${contact.timestamp}')">Delete</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>`
            }
        </div>
    `;
}

function loadAdminNewsletter() {
    const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers')) || [];
    const adminContent = document.getElementById('admin-content');
    
    adminContent.innerHTML = `
        <div class="admin-section">
            <h3>Newsletter Subscribers</h3>
            ${subscribers.length === 0 ? 
                '<p>No newsletter subscribers yet.</p>' :
                `<table class="admin-table">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Subscribed Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${subscribers.map(subscriber => `
                            <tr>
                                <td>${subscriber.email}</td>
                                <td>${formatDate(subscriber.timestamp)}</td>
                                <td class="admin-actions">
                                    <button class="btn-delete" onclick="deleteSubscriber('${subscriber.timestamp}')">Delete</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>`
            }
        </div>
    `;
}

function viewContact(timestamp) {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const contact = contacts.find(c => c.timestamp === timestamp);
    
    if (!contact) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Contact Message</h2>
                <span class="close">&times;</span>
            </div>
            <div class="modal-body">
                <p><strong>Name:</strong> ${contact.name}</p>
                <p><strong>Email:</strong> ${contact.email}</p>
                <p><strong>Date:</strong> ${formatDate(contact.timestamp)}</p>
                <p><strong>Message:</strong></p>
                <p>${contact.message}</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'block';
    
    modal.querySelector('.close').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

function deleteContact(timestamp) {
    if (confirm('Are you sure you want to delete this contact message?')) {
        const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        const updatedContacts = contacts.filter(contact => contact.timestamp !== timestamp);
        localStorage.setItem('contacts', JSON.stringify(updatedContacts));
        loadAdminContacts();
    }
}

function deleteSubscriber(timestamp) {
    if (confirm('Are you sure you want to delete this subscriber?')) {
        const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers')) || [];
        const updatedSubscribers = subscribers.filter(subscriber => subscriber.timestamp !== timestamp);
        localStorage.setItem('newsletterSubscribers', JSON.stringify(updatedSubscribers));
        loadAdminNewsletter();
    }
}

function updateAdminStats() {
    const blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
    const applications = JSON.parse(localStorage.getItem('jobApplications')) || [];
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers')) || [];
    
    document.getElementById('total-blog-posts').textContent = blogPosts.length;
    document.getElementById('total-events').textContent = events.length;
    document.getElementById('total-jobs').textContent = jobs.length;
    document.getElementById('total-applications').textContent = applications.length;
    document.getElementById('total-contacts').textContent = contacts.length;
    document.getElementById('total-newsletter').textContent = subscribers.length;
}

// Update initializeAdminPage function
// (moved into initializeAdminPage above)

// Update loadAdminContent function
function loadAdminContent(section) {
    const adminContent = document.getElementById('admin-content');
    if (!adminContent) return;
    
    switch(section) {
        case 'blog':
            loadAdminBlog();
            break;
        case 'events':
            loadAdminEvents();
            break;
        case 'jobs':
            loadAdminJobs();
            break;
        case 'applications':
            loadAdminApplications();
            break;
        case 'contacts':
            loadAdminContacts();
            break;
        case 'newsletter':
            loadAdminNewsletter();
            break;
    }
}

// Update page initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    loadInitialData();
    
    // Initialize page-specific functionality
    const currentPage = getCurrentPage();
    switch(currentPage) {
        case 'index':
            initializeHomePage();
            break;
        case 'blog':
            initializeBlogPage();
            initializeNewsletterForm();
            break;
        case 'events':
            initializeEventsPage();
            initializeCalendar();
            initializeEventRegistrationForm();
            break;
        case 'recruitment':
            initializeRecruitmentPage();
            break;
        case 'admin':
            initializeAdminPage();
            break;
    }
});

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
