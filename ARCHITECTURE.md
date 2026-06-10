# 📐 Architecture & Flow Diagrams - LocalBazaar

## 🏗️ Application Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      LocalBazaar App                         │
│                     (Single Page App)                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                         App.tsx                              │
│                   (Main Application)                         │
│                                                              │
│  ┌────────────┐  ┌────────────┐  ┌────────────────┐        │
│  │ Auth State │  │ Cart State │  │  Order State   │        │
│  └────────────┘  └────────────┘  └────────────────┘        │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │              Global Header                         │    │
│  │  [Logo] [City] [Orders] [Cart] [Logout]           │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │           View Router (Conditional)                │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                              │
            ┌─────────────────┼─────────────────┐
            ▼                 ▼                 ▼
    ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
    │   Customer   │  │    Vendor    │  │   Delivery   │
    │     Flow     │  │     Flow     │  │     Flow     │
    └──────────────┘  └──────────────┘  └──────────────┘
```

---

## 👤 Customer Flow Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Customer Journey                         │
└─────────────────────────────────────────────────────────────┘
          │
          ▼
┌──────────────────┐
│  LoginScreen     │  → Phone auth + User type selection
└──────────────────┘
          │
          ▼
┌──────────────────┐
│ CitySelection    │  → Choose city from list
└──────────────────┘
          │
          ▼
┌──────────────────┐
│   HomePage       │  → Browse vendors by category
│                  │  → Search & Filter
│                  │  → Add to Favorites
└──────────────────┘
          │
          ▼
┌──────────────────┐
│ VendorDetails    │  → View products
│                  │  → Add to cart
│                  │  → Chat with vendor
└──────────────────┘
          │
          ▼
┌──────────────────┐
│     Cart         │  → Review items
│                  │  → Adjust quantities
│                  │  → Checkout form
└──────────────────┘
          │
          ▼
┌──────────────────┐
│ OrderTracking    │  → Live order status
│                  │  → Delivery partner info
│                  │  → Rate & Reorder
└──────────────────┘
```

---

## 🏪 Vendor Flow Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Vendor Journey                          │
└─────────────────────────────────────────────────────────────┘
          │
          ▼
┌──────────────────┐
│  LoginScreen     │  → Select "Vendor"
└──────────────────┘
          │
          ▼
┌──────────────────────────────────────────────────────────────┐
│              VendorDashboard                                  │
│                                                               │
│  ┌───────────────────────────────────────────────────────┐  │
│  │           Statistics Cards                            │  │
│  │  [Revenue] [Orders] [Customers] [Growth]              │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                               │
│  ┌──────────────────────┐  ┌──────────────────────────┐    │
│  │  Add Product Form    │  │   Recent Orders List     │    │
│  │                      │  │                          │    │
│  │  - Name              │  │  - Order ID              │    │
│  │  - Price             │  │  - Customer              │    │
│  │  - Description       │  │  - Status                │    │
│  │  - Stock             │  │  - Actions               │    │
│  │  [Submit]            │  │                          │    │
│  └──────────────────────┘  └──────────────────────────┘    │
│                                                               │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Benefits Section                         │  │
│  └───────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

---

## 🛵 Delivery Partner Flow Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                 Delivery Partner Journey                     │
└─────────────────────────────────────────────────────────────┘
          │
          ▼
┌──────────────────┐
│  LoginScreen     │  → Select "Delivery Partner"
└──────────────────┘
          │
          ▼
┌──────────────────────────────────────────────────────────────┐
│          DeliveryPartnerDashboard                             │
│                                                               │
│  ┌───────────────────────────────────────────────────────┐  │
│  │           Statistics Cards                            │  │
│  │  [Earnings] [Deliveries] [Active] [Rating]            │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                               │
│  ┌──────────────────────┐  ┌──────────────────────────┐    │
│  │ Available Orders     │  │  Active Deliveries       │    │
│  │                      │  │                          │    │
│  │  Order Card          │  │  Delivery Card           │    │
│  │  - Pickup location   │  │  - Customer info         │    │
│  │  - Delivery address  │  │  - Call button           │    │
│  │  - Earning: ₹40      │  │  - Navigate button       │    │
│  │  [Accept Order]      │  │  [Mark Delivered]        │    │
│  └──────────────────────┘  └──────────────────────────┘    │
│                                                               │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Benefits Section                         │  │
│  └───────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

---

## 🗄️ State Management

```
┌─────────────────────────────────────────────────────────────┐
│                   App.tsx State                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Authentication State                                        │
│  ├── isLoggedIn: boolean                                    │
│  ├── userType: 'customer' | 'vendor' | 'delivery'           │
│  └── selectedCity: string                                   │
│                                                              │
│  Shopping State                                              │
│  ├── cartItems: CartItem[]                                  │
│  ├── orders: Order[]                                        │
│  └── favorites: string[]                                    │
│                                                              │
│  UI State                                                    │
│  ├── currentView: 'home' | 'vendor' | 'cart' | ...          │
│  ├── selectedVendor: Vendor | null                          │
│  ├── showChat: boolean                                      │
│  └── chatVendor: Vendor | null                              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
         │
         │ Props passed down to child components
         ▼
┌─────────────────────────────────────────────────────────────┐
│                 Child Components                             │
│                                                              │
│  - Receive state via props                                   │
│  - Call handler functions to update state                    │
│  - No direct state modification                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛒 Shopping Cart Flow

```
                    Add Product to Cart
                           │
                           ▼
    ┌──────────────────────────────────────────────┐
    │   Check if product exists in cart            │
    └──────────────────────────────────────────────┘
                           │
            ┌──────────────┴──────────────┐
            ▼                              ▼
    ┌──────────────┐              ┌──────────────┐
    │   Exists     │              │  New Item    │
    └──────────────┘              └──────────────┘
            │                              │
            ▼                              ▼
    ┌──────────────┐              ┌──────────────┐
    │ Increment    │              │  Add with    │
    │  Quantity    │              │ quantity: 1  │
    └──────────────┘              └──────────────┘
            │                              │
            └──────────────┬───────────────┘
                           ▼
                  ┌──────────────────┐
                  │  Update Cart     │
                  │     State        │
                  └──────────────────┘
                           │
                           ▼
                  ┌──────────────────┐
                  │   Re-render      │
                  │  Cart Counter    │
                  └──────────────────┘
```

---

## 📦 Order Processing Flow

```
Customer Places Order
        │
        ▼
┌────────────────┐
│  Create Order  │
│   Object       │
└────────────────┘
        │
        ▼
┌────────────────────────────────────┐
│  Order Status Progression          │
├────────────────────────────────────┤
│                                    │
│  1. pending                        │
│         │                          │
│         ▼                          │
│  2. confirmed ← Order created      │
│         │                          │
│         ▼                          │
│  3. preparing ← Vendor accepts     │
│         │                          │
│         ▼                          │
│  4. ready_for_pickup               │
│         │                          │
│         ▼                          │
│  5. out_for_delivery               │
│         │    ← Delivery partner    │
│         │       picks up           │
│         ▼                          │
│  6. delivered ← Customer receives  │
│                                    │
└────────────────────────────────────┘
        │
        ▼
┌────────────────┐
│  Rate Order    │
│  (Optional)    │
└────────────────┘
```

---

## 💬 Chat System Flow

```
Customer Opens Chat
        │
        ▼
┌────────────────┐
│  ChatWindow    │
│   Component    │
└────────────────┘
        │
        ▼
┌────────────────────────────┐
│  Initialize with           │
│  INITIAL_MESSAGES          │
│  (Vendor greeting)         │
└────────────────────────────┘
        │
        ▼
┌────────────────────────────┐
│  Customer Types Message    │
└────────────────────────────┘
        │
        ▼
┌────────────────────────────┐
│  Add to messages array     │
│  (sender: 'customer')      │
└────────────────────────────┘
        │
        ▼
┌────────────────────────────┐
│  Simulate Response         │
│  (1 second delay)          │
└────────────────────────────┘
        │
        ▼
┌────────────────────────────┐
│  Add vendor response       │
│  (sender: 'vendor')        │
└────────────────────────────┘
        │
        ▼
┌────────────────────────────┐
│  Display in chat UI        │
└────────────────────────────┘
```

---

## 🔍 Search & Filter Flow

```
User Enters Search Query
        │
        ▼
┌─────────────────────────────────────────┐
│  Filter MOCK_VENDORS Array              │
├─────────────────────────────────────────┤
│                                         │
│  Conditions:                            │
│  1. Category Match                      │
│     (if not "all")                      │
│                                         │
│  2. Search Query Match                  │
│     - Vendor name                       │
│     - Category name                     │
│     (case insensitive)                  │
│                                         │
│  3. Favorites Filter                    │
│     (if enabled)                        │
│                                         │
└─────────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────┐
│  Update filteredVendors                 │
└─────────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────┐
│  Re-render Vendor Grid                  │
│  with filtered results                  │
└─────────────────────────────────────────┘
```

---

## 📱 Component Communication

```
┌─────────────────────────────────────────────────────────────┐
│                        App.tsx                               │
│                   (Parent Component)                         │
└─────────────────────────────────────────────────────────────┘
                    │
    ┌───────────────┼───────────────┐
    ▼               ▼               ▼
┌────────┐    ┌────────┐     ┌────────┐
│HomePage│    │  Cart  │     │Tracking│
└────────┘    └────────┘     └────────┘
    │               │               │
    │  Props ↓      │  Props ↓      │  Props ↓
    │  Events ↑     │  Events ↑     │  Events ↑
    │               │               │
    └───────────────┴───────────────┘
                    │
            State flows down
            Events flow up
```

### Props Flow (Downward)
- Parent → Child: Data, State, Functions
- Example: `onVendorClick={handleVendorClick}`

### Event Flow (Upward)
- Child → Parent: User actions trigger callbacks
- Example: `onClick={() => onVendorClick(vendor)}`

---

## 🎨 UI Component Hierarchy

```
App.tsx
├── Header
│   ├── Logo
│   ├── City Badge
│   ├── Orders Button
│   ├── Cart Button (with badge)
│   └── Logout Button
│
└── Main Content (Conditional)
    │
    ├── LoginScreen
    │   ├── User Type Cards
    │   └── Phone Input Form
    │
    ├── CitySelection
    │   ├── Search Input
    │   └── City Grid
    │
    ├── HomePage
    │   ├── Search Bar
    │   ├── Category Pills
    │   ├── Offers Banner
    │   ├── Featured Banner
    │   └── Vendor Grid
    │       └── Vendor Card (×7)
    │
    ├── VendorDetails
    │   ├── Vendor Header
    │   ├── Action Buttons
    │   └── Product Grid
    │       └── Product Card (×N)
    │
    ├── Cart
    │   ├── Cart Items List
    │   ├── Order Summary
    │   └── Checkout Form (conditional)
    │
    ├── OrderTracking
    │   ├── Progress Steps
    │   ├── Delivery Partner Card
    │   ├── Order Items
    │   └── Actions (Reorder, Rate)
    │
    ├── VendorDashboard
    │   ├── Stats Cards (×4)
    │   ├── Add Product Form
    │   ├── Recent Orders
    │   └── Benefits Banner
    │
    └── DeliveryPartnerDashboard
        ├── Stats Cards (×4)
        ├── Available Orders
        ├── Active Deliveries
        └── Benefits Banner

ChatWindow (Overlay)
├── Header (Vendor info)
├── Messages List
└── Input + Send Button
```

---

## 🔄 Data Flow Diagram

```
┌─────────────┐
│  User Input │
└─────────────┘
      │
      ▼
┌─────────────┐
│   Event     │
│  Handler    │
└─────────────┘
      │
      ▼
┌─────────────┐
│  setState   │
│   Call      │
└─────────────┘
      │
      ▼
┌─────────────┐
│   State     │
│  Updated    │
└─────────────┘
      │
      ▼
┌─────────────┐
│ Re-render   │
│ Components  │
└─────────────┘
      │
      ▼
┌─────────────┐
│   Updated   │
│     UI      │
└─────────────┘
```

---

## 📊 Type System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                  TypeScript Interfaces                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Product                                                     │
│  ├── id: string                                             │
│  ├── name: string                                           │
│  ├── price: number                                          │
│  ├── image: string                                          │
│  ├── description: string                                    │
│  ├── stock: number                                          │
│  └── vendorId: string                                       │
│                                                              │
│  Vendor                                                      │
│  ├── id: string                                             │
│  ├── name: string                                           │
│  ├── category: string                                       │
│  ├── image: string                                          │
│  ├── rating: number                                         │
│  ├── reviewCount: number                                    │
│  ├── deliveryTime: string                                   │
│  ├── location: string                                       │
│  ├── description: string                                    │
│  ├── products: Product[]                                    │
│  ├── phone: string                                          │
│  └── isFavorite?: boolean                                   │
│                                                              │
│  CartItem                                                    │
│  ├── product: Product                                       │
│  ├── quantity: number                                       │
│  └── vendor: Vendor                                         │
│                                                              │
│  Order                                                       │
│  ├── id: string                                             │
│  ├── items: CartItem[]                                      │
│  ├── total: number                                          │
│  ├── status: OrderStatus                                    │
│  ├── deliveryPerson?: DeliveryPerson                        │
│  ├── vendor: Vendor                                         │
│  ├── deliveryAddress: string                                │
│  ├── paymentMethod: 'online' | 'cod'                        │
│  ├── timestamp: Date                                        │
│  └── customerPhone: string                                  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🏗️ Build Process

```
Source Code
    │
    ▼
┌──────────────────┐
│  TypeScript      │
│  Compilation     │
└──────────────────┘
    │
    ▼
┌──────────────────┐
│   Vite Build     │
│   Process        │
├──────────────────┤
│  - Bundle JS     │
│  - Process CSS   │
│  - Optimize imgs │
│  - Tree shake    │
│  - Minify        │
└──────────────────┘
    │
    ▼
┌──────────────────┐
│   dist/ folder   │
├──────────────────┤
│  - index.html    │
│  - assets/       │
│    - main.js     │
│    - main.css    │
│    - images      │
└──────────────────┘
    │
    ▼
┌──────────────────┐
│   Deployment     │
│   Platform       │
└──────────────────┘
```

---

## 🔐 Authentication Flow

```
User Opens App
    │
    ▼
┌──────────────────┐
│  Check Login     │
│     State        │
└──────────────────┘
    │
    ├─ Not Logged In ────────────┐
    │                             ▼
    │                    ┌──────────────────┐
    │                    │  LoginScreen     │
    │                    │  Component       │
    │                    └──────────────────┘
    │                             │
    │                    ┌────────┴────────┐
    │                    ▼                 ▼
    │            ┌──────────────┐  ┌──────────────┐
    │            │   Customer   │  │   Vendor /   │
    │            │              │  │   Delivery   │
    │            └──────────────┘  └──────────────┘
    │                    │                 │
    │                    ├─────────────────┘
    │                    ▼
    │            ┌──────────────────┐
    │            │  Set User Type   │
    │            │  & Login Status  │
    │            └──────────────────┘
    │                    │
    └────────────────────┤
                         ▼
                ┌──────────────────┐
                │   Logged In      │
                │   State = true   │
                └──────────────────┘
                         │
        ┌────────────────┼────────────────┐
        ▼                ▼                ▼
   ┌────────┐      ┌────────┐      ┌────────┐
   │Customer│      │ Vendor │      │Delivery│
   │  Flow  │      │  Flow  │      │  Flow  │
   └────────┘      └────────┘      └────────┘
```

---

## 📈 Performance Optimization

```
Development Mode
├── Hot Module Replacement
├── Fast Refresh
├── Source Maps
└── Dev Server

Production Build
├── Code Splitting
├── Tree Shaking
├── Minification
├── CSS Optimization
└── Asset Compression

Runtime Optimization
├── React.memo (if needed)
├── useMemo (if needed)
├── useCallback (if needed)
└── Lazy Loading (future)
```

---

## 🎯 Decision Tree: User Type

```
                    App Loads
                        │
                        ▼
                ┌───────────────┐
                │  User Logged  │
                │      In?      │
                └───────────────┘
                        │
            ┌───────────┴───────────┐
            │                       │
          No│                       │Yes
            ▼                       ▼
    ┌──────────────┐       ┌──────────────┐
    │ LoginScreen  │       │ Check Type   │
    └──────────────┘       └──────────────┘
                                   │
                    ┌──────────────┼──────────────┐
                    ▼              ▼              ▼
            ┌─────────────┐ ┌──────────┐ ┌──────────┐
            │  Customer?  │ │ Vendor?  │ │Delivery? │
            └─────────────┘ └──────────┘ └──────────┘
                    │              │              │
                    ▼              ▼              ▼
            ┌─────────────┐ ┌──────────┐ ┌──────────┐
            │ City Select │ │  Vendor  │ │ Delivery │
            │ + Customer  │ │ Dashboard│ │ Dashboard│
            │    Flow     │ │          │ │          │
            └─────────────┘ └──────────┘ └──────────┘
```

---

## 🌐 Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Source Code                             │
│                   (GitHub Repository)                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    CI/CD Pipeline                            │
│                (Vercel / Netlify / GitHub Actions)           │
│                                                              │
│  1. Clone Repository                                         │
│  2. Install Dependencies (npm install)                       │
│  3. Run Build (npm run build)                                │
│  4. Deploy to CDN                                            │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                         CDN                                  │
│              (Content Delivery Network)                      │
│                                                              │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐       │
│  │  USA    │  │  Europe │  │  Asia   │  │ India   │       │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘       │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌────────────────┐
                    │  End Users     │
                    │  (Browsers)    │
                    └────────────────┘
```

---

## 🎨 Styling Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                   Tailwind CSS v4                            │
└─────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
    ┌────────────────┐ ┌──────────┐ ┌────────────────┐
    │  Base Styles   │ │ Components│ │   Utilities    │
    └────────────────┘ └──────────┘ └────────────────┘
              │               │               │
              └───────────────┼───────────────┘
                              ▼
                    ┌────────────────┐
                    │ globals.css    │
                    ├────────────────┤
                    │ - CSS Vars     │
                    │ - Typography   │
                    │ - Theme Colors │
                    └────────────────┘
                              │
                              ▼
                    ┌────────────────┐
                    │  Components    │
                    │  (Inline)      │
                    └────────────────┘
```

---

This comprehensive diagram guide shows all the major flows and architecture of the LocalBazaar application. Use it as a reference when understanding or modifying the codebase!
