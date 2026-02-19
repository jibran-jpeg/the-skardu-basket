# The Skardu Basket - Complete Web Application Documentation

## 🎯 Project Overview

**Project Name:** The Skardu Basket  
**Tagline:** Pure Gold from the Mountains  
**Type:** E-commerce Platform for Premium Organic Products from Skardu, Pakistan  
**Tech Stack:** React + Vite, TailwindCSS, Supabase (Backend), React Router, Lucide Icons

---

## 🏗️ Technical Architecture

### **Core Technologies**
- **Frontend Framework:** React 19.2.0 with Vite
- **Routing:** React Router DOM v7.13.0
- **Styling:** TailwindCSS 3.4.17 with custom configuration
- **Backend:** Supabase (PostgreSQL database + Authentication)
- **Icons:** Lucide React
- **Deployment:** Netlify (with GitHub Pages support)

### **Key Dependencies**
```json
{
  "@supabase/supabase-js": "^2.93.3",
  "canvas-confetti": "^1.9.4",
  "lucide-react": "^0.563.0",
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "react-helmet-async": "^2.0.5",
  "react-router-dom": "^7.13.0"
}
```

---

## 🎨 Design System & Branding

### **Color Palette**
- **Primary Color:** `#0B0C10` (Deep Midnight Blue)
- **Secondary Color:** `#1F2833` (Metallic Blue)
- **Accent Color:** `#FFD700` (Gold - representing premium mountain products)
- **Text Color:** `#C5C6C7` (Silver/Light Grey)
- **Background:** Gradient from white to `#ECEBE4` (light mode), `#0B0C10` to `#1A1D23` (dark mode)

### **Typography**
- **Headings:** Serif font family (elegant, premium feel)
- **Body:** Sans-serif font family
- **Special Elements:** Script font for "Basket" in logo

### **Design Philosophy**
- **Premium & Organic:** Reflects the high-quality, natural products from Skardu mountains
- **Dark Mode Support:** Full light/dark theme toggle throughout the app
- **Glassmorphism:** Backdrop blur effects on navbar and cards
- **Smooth Animations:** Fade-ins, scale transforms, and micro-interactions
- **Responsive:** Mobile-first design with tablet and desktop breakpoints

---

## 📱 Application Structure

### **Context Providers (State Management)**
The app uses React Context API for global state:

1. **ThemeContext** - Light/Dark mode toggle
2. **AuthContext** - User authentication (Supabase Auth with Google OAuth)
3. **ProductContext** - Products and categories from Supabase
4. **CartContext** - Shopping cart management
5. **WishlistContext** - User wishlist
6. **OrderContext** - Order creation and management
7. **ToastContext** - Global notifications
8. **QuickViewContext** - Product quick view modal

---

## 🗂️ Page-by-Page Breakdown

### **1. HOME PAGE (`/`)**

**Purpose:** Main landing page showcasing the brand, products, and seasonal offerings

**Sections:**
1. **Hero Section**
   - Full-screen hero image with mountain backdrop
   - Brand name and tagline
   - Call-to-action button

2. **Announcement Bar**
   - Promotional messages
   - Seasonal announcements

3. **Features Strip**
   - Free shipping info
   - Organic certification
   - Quality guarantees

4. **Category Cards (4 Main Categories)**
   - **Seasonal Fruits** - Fresh, seasonal delights
   - **Dry Fruits** - Premium sun-dried fruits
   - **Shilajit** - The gold of the mountains
   - **Jams, Oils & Green Tea** - Organic essentials
   - Each card has image, description, and "Explore" button
   - Horizontal scroll on mobile, grid on desktop

5. **"Harvesting Now" Section**
   - Featured carousel of currently available seasonal fruits
   - Shows products with `seasonalStatus: "harvesting-now"` or `"ending-soon"`
   - Desktop: Large image carousel with navigation arrows
   - Mobile: Horizontal scroll cards
   - Each product shows:
     - Product image
     - Name and description
     - Price
     - Seasonal status badge (Harvesting Now / Ending Soon / Starting Soon)
     - "View Details" button

6. **Best Seller Section**
   - Highlights top-rated products
   - Product cards with ratings and reviews

7. **Story Section**
   - Brand story and mission
   - Connection to Skardu region

8. **Reviews Section**
   - Customer testimonials
   - Star ratings

9. **Company Info**
   - About the company
   - Contact information

**Key Features:**
- Auto-rotating carousel for seasonal fruits (5-second intervals)
- Intersection Observer for mobile category card tracking
- Smooth scroll to "Harvesting Now" section from navbar

---

### **2. PRODUCTS PAGE (`/products`)**

**Purpose:** Browse all products with filtering and search

**Features:**
- **Category Filter:** Filter by Seasonal Fruits, Dry Fruits, Shilajit, Organic Essentials
- **Search Functionality:** Search products by name
- **Product Grid:** Responsive grid layout
- **Product Cards:** Each shows:
  - Product image
  - Name
  - Price
  - Rating and review count
  - Badges (New, Best Seller, Seasonal Status)
  - Quick View button
  - Add to Cart button
  - Add to Wishlist button

**URL Parameters:**
- `?search=query` - Search filter
- `?category=categoryId` - Category filter

---

### **3. PRODUCT DETAILS PAGE (`/product/:id`)**

**Purpose:** Detailed view of a single product

**Sections:**
1. **Product Image Gallery**
   - Main product image
   - Variant images (if available)
   - Zoom on hover (desktop)

2. **Product Information**
   - Product name
   - Price
   - Rating and reviews
   - Origin location
   - Seasonal status (if applicable)
   - Harvest date (for seasonal items)
   - Detailed description

3. **Highlights**
   - Key features (e.g., "100% Pure & Organic", "Lab Tested")
   - Displayed as badge list

4. **Variants Selection**
   - Weight options (e.g., 15g, 30g, 50g)
   - Price updates based on selection

5. **Actions**
   - Quantity selector
   - Add to Cart button
   - Add to Wishlist button
   - Share button

6. **Product Reviews**
   - Customer reviews with ratings
   - Review submission form (for logged-in users)

7. **Related Products**
   - Products from the same category
   - Horizontal scroll carousel

---

### **4. CHECKOUT PAGE (`/checkout`)**

**Purpose:** Complete purchase with shipping and payment details

**Sections:**
1. **Cart Summary**
   - List of items in cart
   - Quantity adjustment
   - Remove item option
   - Subtotal, shipping, tax, total

2. **Shipping Information Form**
   - Full name
   - Email
   - Phone number
   - Address (street, city, province, postal code)
   - Country (Pakistan)

3. **Payment Method Selection**
   - Cash on Delivery (COD)
   - Bank Transfer
   - JazzCash/EasyPaisa (future)

4. **Order Notes**
   - Optional delivery instructions

5. **Place Order Button**
   - Creates order in Supabase
   - Redirects to Order Confirmation page

**Validation:**
- All fields required
- Email format validation
- Phone number format validation

---

### **5. ORDER CONFIRMATION PAGE (`/order-confirmation/:orderNumber`)**

**Purpose:** Show order success and details

**Sections:**
1. **Success Message**
   - Confetti animation
   - Order number display
   - Thank you message

2. **Order Details**
   - Order date and time
   - Shipping address
   - Payment method
   - Order items with quantities and prices
   - Total amount

3. **Next Steps**
   - Estimated delivery time
   - Tracking information (if available)
   - Contact support link

4. **Actions**
   - Continue Shopping button
   - View Profile/Orders button

---

### **6. ABOUT US PAGE (`/about`)**

**Purpose:** Tell the brand story and mission

**Sections:**
1. **Hero Section**
   - Large background image of Skardu mountains
   - Brand story headline

2. **Our Story**
   - Detailed narrative about the company
   - Connection to Skardu region
   - Commitment to organic farming

3. **Our Mission**
   - Quality commitment
   - Sustainability practices
   - Community support

4. **Our Values**
   - Authenticity
   - Purity
   - Tradition

5. **Team Section** (if applicable)
   - Founders and key team members

6. **Certifications**
   - Organic certifications
   - Quality badges

---

### **7. OUR ORCHARDS PAGE (`/our-orchards`)**

**Purpose:** Showcase the farms and orchards in Skardu

**Sections:**
1. **Hero Section**
   - Panoramic orchard images
   - Location information

2. **Orchard Locations**
   - Shigar Valley Orchards
   - Kachura Lake Farms
   - Khaplu Village
   - Deosai Plains Border
   - Each with:
     - Location image
     - Description
     - Products grown there
     - Altitude and climate info

3. **Farming Practices**
   - Organic methods
   - Traditional techniques
   - Sustainability

4. **Seasonal Calendar**
   - Harvest times for different fruits
   - Best visiting seasons

---

### **8. CONTACT PAGE (`/contact`)**

**Purpose:** Customer support and inquiries

**Sections:**
1. **Contact Form**
   - Name
   - Email
   - Subject
   - Message
   - Submit button

2. **Contact Information**
   - Email: hello@skarduorganics.com
   - Phone: +92 300 1234567
   - Address (if applicable)

3. **Social Media Links**
   - Facebook
   - Instagram
   - WhatsApp

4. **FAQ Link**
   - Quick link to FAQ page

---

### **9. FAQ PAGE (`/faq`)**

**Purpose:** Answer common customer questions

**Categories:**
1. **Ordering & Payment**
   - How to place an order
   - Payment methods
   - Order modifications

2. **Shipping & Delivery**
   - Delivery areas
   - Shipping costs
   - Delivery times
   - Tracking orders

3. **Products**
   - Product authenticity
   - Storage instructions
   - Shelf life

4. **Returns & Refunds**
   - Return policy
   - Refund process
   - Quality guarantees

**Format:**
- Accordion-style expandable questions
- Search functionality

---

### **10. PROFILE PAGE (`/profile`)**

**Purpose:** User account management

**Requires:** User must be logged in (redirects to login if not)

**Sections:**
1. **User Information**
   - Profile picture (from Google OAuth)
   - Name
   - Email
   - Edit profile button

2. **Order History**
   - List of past orders
   - Order number, date, status, total
   - View order details button

3. **Saved Addresses**
   - Shipping addresses
   - Add/Edit/Delete addresses

4. **Wishlist**
   - Quick link to wishlist page

5. **Account Settings**
   - Change password (if email/password auth)
   - Email preferences
   - Logout button

---

### **11. WISHLIST PAGE (`/wishlist`)**

**Purpose:** View and manage saved products

**Features:**
- Grid of wishlisted products
- Remove from wishlist button
- Add to Cart button
- Empty state message if no items

---

### **12. LOGIN PAGE (`/login`)**

**Purpose:** User authentication

**Options:**
1. **Google Sign-In**
   - OAuth integration via Supabase
   - One-click login

2. **Email/Password Login**
   - Email input
   - Password input
   - "Remember me" checkbox
   - Forgot password link

3. **Sign Up Link**
   - Redirect to Sign Up page

**Features:**
- Form validation
- Error messages
- Loading states
- Redirect to previous page after login

---

### **13. SIGN UP PAGE (`/signup`)**

**Purpose:** Create new user account

**Options:**
1. **Google Sign-Up**
   - OAuth integration

2. **Email/Password Sign-Up**
   - Full name
   - Email
   - Password
   - Confirm password
   - Terms & Conditions checkbox

**Features:**
- Password strength indicator
- Email format validation
- Terms of Service link
- Redirect to login after successful signup

---

### **14. LEGAL PAGES**

#### **Privacy Policy (`/privacy-policy`)**
- Data collection practices
- Cookie usage
- User rights
- Contact for privacy concerns

#### **Terms of Service (`/terms-of-service`)**
- User agreement
- Prohibited activities
- Liability limitations
- Dispute resolution

#### **Shipping Info (`/shipping-info`)**
- Shipping methods
- Delivery areas
- Shipping costs
- Estimated delivery times
- Packaging details

**Component:** All use `LegalPage.jsx` with `type` prop

---

### **15. 404 NOT FOUND PAGE (`*`)**

**Purpose:** Handle invalid URLs

**Features:**
- Friendly error message
- "Page not found" illustration
- Back to Home button
- Search bar
- Popular pages links

---

## 🔧 ADMIN PANEL

**Base Route:** `/admin`

### **Admin Login (`/admin`)**
- Separate admin authentication
- Email/Password only (no OAuth)
- Admin role verification

### **Admin Layout**
- Sidebar navigation
- Logo
- Menu items:
  - Dashboard
  - Orders
  - Products
  - Inventory
  - Reviews
  - Settings
- Logout button

---

### **Admin Pages:**

#### **1. Dashboard (`/admin/dashboard`)**
- **Key Metrics:**
  - Total revenue
  - Total orders
  - Total products
  - Total customers
- **Charts:**
  - Sales over time
  - Top-selling products
  - Order status distribution
- **Recent Orders Table**
- **Low Stock Alerts**

#### **2. Orders (`/admin/orders`)**
- **Order List Table:**
  - Order number
  - Customer name
  - Date
  - Status (Pending, Processing, Shipped, Delivered, Cancelled)
  - Total amount
  - Actions (View, Update Status)
- **Filters:**
  - By status
  - By date range
  - Search by order number or customer
- **Order Details Modal:**
  - Full order information
  - Customer details
  - Items ordered
  - Update status button

#### **3. Products (`/admin/products`)**
- **Product List:**
  - Desktop: Table view with columns (Image, Name, Category, Price, Stock, Status)
  - Mobile: Card view
- **Actions:**
  - Add New Product
  - Edit Product
  - Delete Product
  - Toggle Active/Inactive
- **Add/Edit Product Modal:**
  - Product name
  - Category selection
  - Price
  - Description
  - Image upload (with compression to ~200KB)
  - Stock quantity
  - Variants (weight options with prices)
  - Highlights/Features
  - Origin location
  - Seasonal status
  - Harvest date
  - Active/Inactive toggle

#### **4. Inventory Management (`/admin/inventory`)**
- **Stock Overview:**
  - Product name
  - Current stock
  - Low stock threshold
  - Status (In Stock, Low Stock, Out of Stock)
- **Bulk Update:**
  - Update multiple product stocks
- **Stock History:**
  - Stock changes log

#### **5. Review Management (`/admin/reviews`)**
- **Review List:**
  - Product name
  - Customer name
  - Rating
  - Review text
  - Date
  - Status (Pending, Approved, Rejected)
- **Actions:**
  - Approve review
  - Reject review
  - Delete review
  - Reply to review

#### **6. Settings (`/admin/settings`)**
- **Store Settings:**
  - Store name
  - Store description
  - Contact email
  - Contact phone
  - Currency
- **Shipping Settings:**
  - Shipping methods
  - Shipping costs
  - Delivery areas
- **Payment Settings:**
  - Enable/Disable payment methods
- **Email Settings:**
  - Order confirmation emails
  - Shipping notification emails
- **Theme Settings:**
  - Primary color
  - Secondary color
  - Logo upload

---

## 🧩 Key Components

### **Navigation Components**

#### **Navbar**
- Fixed top navigation
- Transparent on hero pages, solid on scroll
- Logo (clickable to home)
- Desktop menu: Shop, About Us, Orchards, "Harvesting Now" button
- Icons: Search, Wishlist, User, Dark Mode Toggle, Cart
- Search bar with live product suggestions
- Responsive: hamburger menu on mobile

#### **MobileMenu**
- Slide-in drawer from left
- Same menu items as desktop
- User profile section
- Close button

#### **Footer**
- **Columns:**
  - About Us
  - Quick Links (Shop, Orchards, Contact, FAQ)
  - Customer Service (Shipping Info, Returns, Privacy Policy, Terms)
  - Contact Info
- Social media icons
- Newsletter signup
- Copyright notice

---

### **Product Components**

#### **ProductCard**
- Product image
- Product name
- Price
- Rating stars
- Badges (New, Best Seller, Seasonal)
- Quick View button
- Add to Cart button
- Add to Wishlist icon
- Hover effects

#### **ProductGrid**
- Responsive grid layout
- Loading skeleton
- Empty state

#### **QuickViewModal**
- Popup modal with product details
- Image
- Name, price, rating
- Short description
- Variant selector
- Quantity selector
- Add to Cart button
- "View Full Details" link

#### **RelatedProducts**
- Horizontal scroll carousel
- Shows products from same category
- Navigation arrows

---

### **Cart Components**

#### **CartDrawer**
- Slide-in drawer from right
- Cart items list with:
  - Product image
  - Name
  - Price
  - Quantity controls
  - Remove button
- Subtotal
- "View Cart" button
- "Checkout" button
- Empty cart message

#### **StickyCart**
- Fixed bottom bar on mobile
- Shows cart item count
- Quick access to cart

---

### **Utility Components**

#### **SEO**
- React Helmet for meta tags
- Dynamic title and description per page
- Open Graph tags for social sharing

#### **ScrollToTop**
- Automatically scrolls to top on route change

#### **ScrollToTopButton**
- Fixed button in bottom-right
- Appears after scrolling down
- Smooth scroll to top

#### **Toast**
- Global notification system
- Success, error, info, warning types
- Auto-dismiss after 3 seconds
- Positioned top-right

#### **ErrorBoundary**
- Catches React errors
- Shows friendly error message
- Prevents app crash

---

## 📦 Product Data Structure

### **Categories**
```javascript
{
  id: "seasonal-fruits",
  name: "Seasonal Fruits",
  image: "/images/category_seasonal_fruits.png",
  description: "Freshly picked seasonal delights."
}
```

### **Products**
```javascript
{
  id: 1,
  name: "Gold Grade Shilajit Resin",
  categoryId: "shilajeet",
  price: 2500,
  image: "/images/products/shilajit_main.png",
  description: "Harvested from the highest altitudes...",
  rating: 4.9,
  reviews: 342,
  isNew: false,
  badge: "Best Seller",
  origin: "Skardu Valley (16,000ft)",
  seasonalStatus: "harvesting-now", // or "ending-soon", "starting-soon"
  harvestDate: "July 20, 2026",
  highlights: [
    "100% Pure & Organic",
    "Rich in Fulvic Acid",
    "Natural Energy Booster",
    "Lab Tested for Purity"
  ],
  variants: [
    { weight: "15g", price: 2500, image: "/images/products/shilajit_15g.png" },
    { weight: "30g", price: 4500, image: "/images/products/shilajit_30g.png" }
  ]
}
```

### **Sample Products:**
1. **Gold Grade Shilajit Resin** (Shilajit category, Best Seller)
2. **Golden Skardu Apricots** (Seasonal Fruits, Harvesting Now)
3. **Royal Black Cherries** (Seasonal Fruits, Starting Soon)
4. **Himalayan White Mulberries** (Seasonal Fruits, Ending Soon)
5. **Organic Sun-Dried Apricots** (Dry Fruits)
6. **Wild Cherry Jam** (Organic Essentials, New)

---

## 🗄️ Database Schema (Supabase)

### **Tables:**

#### **products**
- id (uuid, primary key)
- name (text)
- category_id (text)
- price (numeric)
- image (text, URL)
- description (text)
- rating (numeric)
- reviews (integer)
- is_new (boolean)
- badge (text)
- origin (text)
- seasonal_status (text)
- harvest_date (date)
- highlights (jsonb, array)
- variants (jsonb, array)
- stock (integer)
- is_active (boolean)
- created_at (timestamp)
- updated_at (timestamp)

#### **categories**
- id (text, primary key)
- name (text)
- image (text, URL)
- description (text)
- created_at (timestamp)

#### **orders**
- id (uuid, primary key)
- order_number (text, unique)
- user_id (uuid, foreign key to auth.users)
- customer_name (text)
- customer_email (text)
- customer_phone (text)
- shipping_address (jsonb)
- payment_method (text)
- order_notes (text)
- subtotal (numeric)
- shipping_cost (numeric)
- tax (numeric)
- total (numeric)
- status (text: pending, processing, shipped, delivered, cancelled)
- created_at (timestamp)
- updated_at (timestamp)

#### **order_items**
- id (uuid, primary key)
- order_id (uuid, foreign key to orders)
- product_id (uuid, foreign key to products)
- product_name (text)
- product_image (text)
- variant (text)
- quantity (integer)
- price (numeric)
- subtotal (numeric)
- created_at (timestamp)

#### **reviews**
- id (uuid, primary key)
- product_id (uuid, foreign key to products)
- user_id (uuid, foreign key to auth.users)
- user_name (text)
- rating (integer, 1-5)
- review_text (text)
- status (text: pending, approved, rejected)
- created_at (timestamp)
- updated_at (timestamp)

#### **wishlist**
- id (uuid, primary key)
- user_id (uuid, foreign key to auth.users)
- product_id (uuid, foreign key to products)
- created_at (timestamp)

---

## 🔐 Authentication Flow

### **User Authentication (Supabase Auth)**
1. **Google OAuth:**
   - Click "Sign in with Google"
   - Redirected to Google consent screen
   - After approval, redirected back to app
   - User session created
   - User data stored in Supabase auth.users

2. **Email/Password:**
   - User enters email and password
   - Supabase validates credentials
   - Session created
   - JWT token stored in localStorage

### **Protected Routes:**
- `/profile` - Requires login
- `/checkout` - Requires login (optional, can checkout as guest)
- All `/admin/*` routes - Requires admin role

### **Admin Authentication:**
- Separate admin login page
- Admin role stored in user metadata
- Role checked on admin route access

---

## 🎨 Animations & Interactions

### **Page Transitions:**
- Fade-in on page load
- Smooth scroll between sections

### **Component Animations:**
- **Category Cards:** Fade-in-up with staggered delay
- **Product Cards:** Scale on hover
- **Buttons:** Scale down on click (active:scale-95)
- **Images:** Zoom on hover (group-hover:scale-105)
- **Carousel:** Slide transition with fade

### **Micro-interactions:**
- **Add to Cart:** Button shake animation
- **Wishlist:** Heart fill animation
- **Toast Notifications:** Slide-in from top-right
- **Loading States:** Spinner with brand colors
- **Confetti:** On order confirmation

---

## 🌐 SEO & Performance

### **SEO Optimization:**
- Dynamic meta tags per page
- Semantic HTML structure
- Alt text for all images
- Structured data (JSON-LD) for products
- Sitemap generation
- Robots.txt

### **Performance:**
- Lazy loading for pages (React.lazy)
- Image optimization (compression to ~200KB)
- Code splitting
- Minification in production build
- CDN for static assets

---

## 📱 Responsive Breakpoints

- **Mobile:** < 768px
- **Tablet:** 768px - 1024px
- **Desktop:** > 1024px

### **Mobile-Specific Features:**
- Hamburger menu
- Horizontal scroll for categories and products
- Sticky cart button
- Touch-friendly buttons (larger tap targets)
- Simplified forms

---

## 🚀 Deployment

### **Build Command:**
```bash
npm run build
```

### **Deployment Platforms:**
- **Netlify** (primary)
  - Auto-deploy from GitHub
  - Environment variables configured
  - Redirects for SPA routing

- **GitHub Pages** (secondary)
  - Manual deploy with `npm run deploy`
  - Base path: `/the-skardu-basket`

---

## 🎯 Key User Flows

### **1. Browse and Purchase Flow:**
1. User lands on Home page
2. Browses categories or "Harvesting Now" section
3. Clicks on product to view details
4. Selects variant and quantity
5. Adds to cart
6. Continues shopping or proceeds to checkout
7. Fills shipping information
8. Selects payment method
9. Places order
10. Redirected to order confirmation

### **2. Search Flow:**
1. User clicks search icon in navbar
2. Types product name
3. Sees live suggestions dropdown
4. Clicks on product or presses Enter
5. Redirected to product details or search results

### **3. Wishlist Flow:**
1. User clicks heart icon on product card
2. Product added to wishlist (toast notification)
3. Heart icon fills with color
4. User can view wishlist from navbar
5. Can add to cart or remove from wishlist

### **4. Authentication Flow:**
1. User clicks "Login" or "Profile" in navbar
2. Redirected to login page
3. Chooses Google or email/password
4. After successful login, redirected to previous page
5. Can access profile and order history

---

## 🎨 Design Recommendations for Redesign

### **Current Strengths:**
- Premium, elegant aesthetic
- Strong brand identity with mountain/organic theme
- Excellent dark mode implementation
- Smooth animations and transitions
- Clear information hierarchy

### **Areas for Improvement:**
1. **Visual Hierarchy:**
   - Make CTAs more prominent
   - Increase contrast for better readability
   - Larger product images on mobile

2. **User Experience:**
   - Simplify checkout process (fewer steps)
   - Add guest checkout option
   - Improve mobile navigation (bottom tab bar)
   - Add product comparison feature

3. **Trust Signals:**
   - Add customer review badges on homepage
   - Display security badges on checkout
   - Show real-time stock availability
   - Add "Recently Viewed" section

4. **Conversion Optimization:**
   - Add urgency indicators (limited stock, seasonal countdown)
   - Show "Customers also bought" on product page
   - Add exit-intent popup with discount offer
   - Implement abandoned cart recovery

5. **Content:**
   - Add video content (farm tours, product stories)
   - Include blog section for SEO
   - Add recipe ideas for products
   - Show farmer profiles

---

## 🛠️ Technical Improvements Needed

1. **Image Optimization:**
   - Implement WebP format
   - Lazy loading for images
   - Responsive images with srcset

2. **Performance:**
   - Reduce bundle size
   - Implement service worker for offline support
   - Add skeleton loaders

3. **Accessibility:**
   - ARIA labels for all interactive elements
   - Keyboard navigation support
   - Screen reader optimization
   - Color contrast improvements

4. **Analytics:**
   - Google Analytics integration
   - Conversion tracking
   - Heatmap analysis

---

## 📝 Content Strategy

### **Brand Voice:**
- **Tone:** Warm, authentic, premium
- **Language:** Simple, clear, storytelling
- **Focus:** Quality, tradition, sustainability

### **Key Messages:**
- Pure, organic products from Skardu mountains
- Traditional farming methods
- Direct from farm to table
- Supporting local communities
- Seasonal, limited availability creates urgency

---

## 🎁 Unique Selling Points (USPs)

1. **Authenticity:** Products directly from Skardu region
2. **Purity:** 100% organic, no preservatives
3. **Seasonality:** Limited-time offerings create exclusivity
4. **Altitude Advantage:** High-altitude farming (16,000ft)
5. **Traditional Methods:** Sun-drying, copper pot cooking
6. **Lab Tested:** Quality assurance for Shilajit
7. **Community Support:** Supporting local farmers

---

## 🌟 Future Feature Ideas

1. **Subscription Service:** Monthly boxes of seasonal products
2. **Gift Boxes:** Curated gift sets
3. **Loyalty Program:** Points for purchases
4. **Referral Program:** Discount for referring friends
5. **Live Chat:** Customer support
6. **AR Product Preview:** View products in 3D
7. **Recipe Section:** How to use products
8. **Blog:** Stories from Skardu, health benefits
9. **Mobile App:** Native iOS/Android app
10. **International Shipping:** Expand beyond Pakistan

---

## 📞 Contact & Support

- **Email:** hello@skarduorganics.com
- **Phone:** +92 300 1234567
- **Support Hours:** 9 AM - 6 PM PKT (Monday - Saturday)

---

## 🎨 PROMPT FOR AI REDESIGN

**Use this comprehensive documentation to redesign the frontend of "The Skardu Basket" e-commerce platform. The redesign should:**

1. **Maintain the premium, organic brand identity** while modernizing the visual design
2. **Improve user experience** with clearer navigation, better mobile responsiveness, and streamlined checkout
3. **Enhance conversion rates** with strategic placement of CTAs, trust signals, and urgency indicators
4. **Optimize performance** with faster load times, better image handling, and smooth animations
5. **Ensure accessibility** with WCAG 2.1 AA compliance
6. **Keep the dark mode** functionality and improve the theme toggle experience
7. **Preserve all existing features** (authentication, cart, wishlist, admin panel, etc.)
8. **Add modern design trends** like glassmorphism, neumorphism, or other contemporary styles that fit the brand
9. **Focus on storytelling** - make the connection to Skardu mountains and organic farming more prominent
10. **Mobile-first approach** - ensure the mobile experience is exceptional

**Design deliverables should include:**
- Updated component designs (Figma/Sketch files or code)
- Color palette refinements
- Typography system
- Spacing and layout guidelines
- Animation specifications
- Responsive breakpoints
- Accessibility notes

**Technical requirements:**
- Must work with existing React + Vite + TailwindCSS stack
- Maintain Supabase integration
- Keep all existing routes and functionality
- Ensure backward compatibility with current database schema

---

**END OF DOCUMENTATION**
