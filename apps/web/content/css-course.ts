import type { Course, Step } from "@/lib/lesson-ir";

/** Course 2 — Learn CSS by Building a Jeepney Route Card. */

let n = 0;

const HTML = `<div class="card">
  <h1 class="route">Cubao to Katipunan</h1>
  <p class="fare">Fare: 13 pesos</p>
  <ul class="stops">
    <li>Aurora Boulevard</li>
    <li>Anonas</li>
    <li>Katipunan</li>
  </ul>
</div>`;

const RECEIPT_HTML = `<article class="receipt">
  <h1>Aling Nena's Receipt</h1>
  <p>Rice</p>
  <p class="total">Total: PHP 58</p>
</article>`;

const MEAL_HTML = `<article class="meal">
  <span>Chicken adobo</span>
  <span class="price">PHP 85</span>
</article>`;

const NOTICE_HTML = `<aside class="notice">
  <h1>Water service notice</h1>
  <p>Water returns at 5 PM.</p>
</aside>`;

const STALLS_HTML = `<section class="stalls">
  <article class="stall">Tomatoes</article>
  <article class="stall">Eggplant</article>
  <article class="stall">Okra</article>
</section>`;

const HELP_HTML = `<a class="help-link" href="tel:117">Call emergency help: 117</a>`;

const FORM_HTML = `<form class="request-form">
  <label>Name <input type="text" /></label>
  <label>Request <textarea></textarea></label>
  <button>Send request</button>
</form>`;

const SERVICES_HTML = `<section class="services">
  <article class="service">Health desk</article>
  <article class="service">Permit desk</article>
  <article class="service">Help desk</article>
</section>`;

const PRICES_HTML = `<dl class="prices">
  <div class="price-row"><dt>Rice</dt><dd>58</dd></div>
  <div class="price-row"><dt>Eggs</dt><dd>96</dd></div>
</dl>`;

const THEME_HTML = `<aside class="holiday-note">
  <h1>Barangay holiday</h1>
  <p>Office is closed on Monday.</p>
</aside>`;

const ALERT_HTML = `<article class="alert-card">
  <h1>Flood alert</h1>
  <p>Keep clear of the river path.</p>
</article>`;

const HEADING_HTML = `<header class="announcement">
  <p>Community update</p>
  <h1>Barangay assembly this Saturday</h1>
</header>`;

const ANNOUNCEMENT_LINK_HTML = `<a class="announcement-link" href="#details">Read the full notice</a>`;
const ORDER_BUTTON_HTML = `<button class="order-button">Order a meal</button>`;
const STATUS_HTML = `<span class="status"><span class="status-dot" aria-hidden="true"></span>Open now</span>`;
const FOCUS_LINK_HTML = `<a class="focus-link" href="#hours">Check office hours</a>`;
const PRINT_NOTICE_HTML = `<article class="print-notice"><h2>Water service notice</h2><p>Water returns at 5 PM.</p><button class="print-help">Print this notice</button></article>`;
const NIGHT_NOTICE_HTML = `<article class="night-notice"><h2>Night desk</h2><p>Open until 8 PM.</p></article>`;

const css = (body: string) => body;

interface StepReference {
  estimatedMinutes: number;
  solution: Record<string, string>;
}

const solved = (styles: string): Record<string, string> => ({
  "index.html": HTML,
  "styles.css": css(styles),
});
const solvedReceipt = (styles: string): Record<string, string> => ({ "index.html": RECEIPT_HTML, "styles.css": css(styles) });
const solvedMeal = (styles: string): Record<string, string> => ({ "index.html": MEAL_HTML, "styles.css": css(styles) });
const solvedNotice = (styles: string): Record<string, string> => ({ "index.html": NOTICE_HTML, "styles.css": css(styles) });
const solvedStalls = (styles: string): Record<string, string> => ({ "index.html": STALLS_HTML, "styles.css": css(styles) });
const solvedHelp = (styles: string): Record<string, string> => ({ "index.html": HELP_HTML, "styles.css": css(styles) });
const solvedForm = (styles: string): Record<string, string> => ({ "index.html": FORM_HTML, "styles.css": css(styles) });
const solvedServices = (styles: string): Record<string, string> => ({ "index.html": SERVICES_HTML, "styles.css": css(styles) });
const solvedPrices = (styles: string): Record<string, string> => ({ "index.html": PRICES_HTML, "styles.css": css(styles) });
const solvedTheme = (styles: string): Record<string, string> => ({ "index.html": THEME_HTML, "styles.css": css(styles) });
const solvedAlert = (styles: string): Record<string, string> => ({ "index.html": ALERT_HTML, "styles.css": css(styles) });
const solvedHeading = (styles: string): Record<string, string> => ({ "index.html": HEADING_HTML, "styles.css": css(styles) });
const solvedAnnouncementLink = (styles: string): Record<string, string> => ({ "index.html": ANNOUNCEMENT_LINK_HTML, "styles.css": css(styles) });
const solvedOrderButton = (styles: string): Record<string, string> => ({ "index.html": ORDER_BUTTON_HTML, "styles.css": css(styles) });
const solvedStatus = (styles: string): Record<string, string> => ({ "index.html": STATUS_HTML, "styles.css": css(styles) });
const solvedFocusLink = (styles: string): Record<string, string> => ({ "index.html": FOCUS_LINK_HTML, "styles.css": css(styles) });
const solvedPrintNotice = (styles: string): Record<string, string> => ({ "index.html": PRINT_NOTICE_HTML, "styles.css": css(styles) });
const solvedNightNotice = (styles: string): Record<string, string> => ({ "index.html": NIGHT_NOTICE_HTML, "styles.css": css(styles) });

/* css-topic: box-spacing */
const SARI_STORE_HTML = `<article class="info-card">
  <h2>Sari-Sari Store Credit Reminder</h2>
  <p>Your credit balance is low.</p>
  <p class="info-detail">Please pay at your earliest convenience.</p>
</article>`;
const solvedSariStore = (styles: string): Record<string, string> => ({ "index.html": SARI_STORE_HTML, "styles.css": css(styles) });

/* css-topic: borders */
const CURFEW_NOTICE_HTML = `<aside class="notice-banner">
  <h2>Notice</h2>
  <p>Curfew Time: 7 PM - 6 AM</p>
</aside>`;
const solvedCurfewNotice = (styles: string): Record<string, string> => ({ "index.html": CURFEW_NOTICE_HTML, "styles.css": css(styles) });

/* css-topic: typography */
const TERMINAL_TIMETABLE_HTML = `<article class="info-card">
  <h2>Jeepney Timetable</h2>
  <p>Time: 7:30AM</p>
  <p class="info-detail">Destination: Mandaluyong</p>
</article>`;
const solvedTerminalTimetable = (styles: string): Record<string, string> => ({ "index.html": TERMINAL_TIMETABLE_HTML, "styles.css": css(styles) });

/* css-topic: flex-row */
const STORE_PRICE_HTML = `<div class="price-row">
  <span class="price-name">Product</span>
  <span class="price-amount">Price</span>
</div>`;
const solvedStorePrice = (styles: string): Record<string, string> => ({ "index.html": STORE_PRICE_HTML, "styles.css": css(styles) });

/* css-topic: flex-column */
const HEALTH_CENTRE_HTML = `<section class="item-list">
  <h2>Health Tips</h2>
  <ul>
    <li>Vaccines Available</li>
    <li>Free Consultation</li>
    <li>Healthy Eating</li>
  </ul>
</section>`;
const solvedHealthCentre = (styles: string): Record<string, string> => ({ "index.html": HEALTH_CENTRE_HTML, "styles.css": css(styles) });

/* css-topic: grid */
const ROUTE_BOARD_HTML = `<section class="stall-grid">
  <article class="stall-cell">Bulacan</article>
  <article class="stall-cell">Nueva Ecija</article>
  <article class="stall-cell">Tarlac</article>
  <article class="stall-cell">Pampanga</article>
</section>`;
const solvedRouteBoard = (styles: string): Record<string, string> => ({ "index.html": ROUTE_BOARD_HTML, "styles.css": css(styles) });

/* css-topic: responsive */
const FISH_STALL_HTML = `<article class="info-card">
  <h2>Fresh Fish</h2>
  <p>PHP 85 per kg</p>
  <p class="info-detail">Catch of the Day</p>
</article>`;
const solvedFishStall = (styles: string): Record<string, string> => ({ "index.html": FISH_STALL_HTML, "styles.css": css(styles) });

/* css-topic: shadow-depth */
const TURO_MENU_HTML = `<article class="info-card">
  <h2>Card Style</h2>
  <p>Lifted Card Effect</p>
  <p class="info-detail">Turo-turo Menu</p>
</article>`;
const solvedTuroMenu = (styles: string): Record<string, string> => ({ "index.html": TURO_MENU_HTML, "styles.css": css(styles) });

/* css-topic: alignment */
const BASKETBALL_LEAGUE_HTML = `<aside class="notice-banner">
  <h2>Barangay Basketball League</h2>
  <p>Schedule Centered</p>
</aside>`;
const solvedBasketballLeague = (styles: string): Record<string, string> => ({ "index.html": BASKETBALL_LEAGUE_HTML, "styles.css": css(styles) });

/* css-topic: overflow-text */
const SUPPLY_LIST_HTML = `<div class="price-row">
  <span class="price-name">Item</span>
  <span class="price-amount">Quantity</span>
</div>`;
const solvedSupplyList = (styles: string): Record<string, string> => ({ "index.html": SUPPLY_LIST_HTML, "styles.css": css(styles) });

/* css-topic: position */
const FARE_TABLE_HTML = `<aside class="notice-banner">
  <h2>Badge</h2>
  <p>Pinned to corner</p>
</aside>`;
const solvedFareTable = (styles: string): Record<string, string> => ({ "index.html": FARE_TABLE_HTML, "styles.css": css(styles) });

/* css-topic: custom-properties */
const ORDER_SLIP_HTML = `<article class="info-card">
  <h2>Bakery Order Slip</h2>
  <p>Customer Name: John Doe</p>
  <p class="info-detail">Order No.: #123456</p>
</article>`;
const solvedOrderSlip = (styles: string): Record<string, string> => ({ "index.html": ORDER_SLIP_HTML, "styles.css": css(styles) });

/* css-topic: grid */
const REFILL_STATION_HTML = `<section class="stall-grid">
  <article class="stall-cell">Water Refill Station</article>
  <article class="stall-cell">Location: Main Bldg, Ground Floor</article>
  <article class="stall-cell">Hours: 9 AM - 6 PM</article>
  <article class="stall-cell">Prices: PHP 85 per gallon</article>
</section>`;
const solvedRefillStation = (styles: string): Record<string, string> => ({ "index.html": REFILL_STATION_HTML, "styles.css": css(styles) });

/* css-topic: responsive */
const CLEAN_UP_HTML = `<article class="info-card">
  <h2>Barangay Clean-Up Alert</h2>
  <p>Join us for a cleaner neighborhood!</p>
  <p class="info-detail">Help remove trash, plant trees</p>
</article>`;
const solvedCleanUp = (styles: string): Record<string, string> => ({ "index.html": CLEAN_UP_HTML, "styles.css": css(styles) });

/* css-topic: shadow-depth */
const SHOP_RATE_HTML = `<article class="info-card">
  <h2>Lifted Card</h2>
  <p>PHP 85/hr</p>
  <p class="info-detail">Repair & Maintenance</p>
</article>`;
const solvedShopRate = (styles: string): Record<string, string> => ({ "index.html": SHOP_RATE_HTML, "styles.css": css(styles) });

/* css-topic: alignment */
const PROGRAMME_ALIGNMENT_HTML = `<aside class="notice-banner">
  <h2>Welcome to Fiesta</h2>
  <p>Enjoy the Culture</p>
</aside>`;
const solvedProgrammeAlignment = (styles: string): Record<string, string> => ({ "index.html": PROGRAMME_ALIGNMENT_HTML, "styles.css": css(styles) });

/* css-topic: overflow-text */
const RETAILER_PRICE_HTML = `<div class="price-row">
  <span class="price-name">Price List</span>
  <span class="price-amount">PHP 85</span>
</div>`;
const solvedRetailerPrice = (styles: string): Record<string, string> => ({ "index.html": RETAILER_PRICE_HTML, "styles.css": css(styles) });

/* css-topic: position */
const SHOP_RECEIPT_HTML = `<aside class="notice-banner">
  <h2>Laundry Special</h2>
  <p>PHP 85 per kg</p>
</aside>`;
const solvedShopReceipt = (styles: string): Record<string, string> => ({ "index.html": SHOP_RECEIPT_HTML, "styles.css": css(styles) });

/* css-topic: custom-properties */
const STOCK_LIST_HTML = `<article class="info-card">
  <h2>Pharmacy Stock List</h2>
  <p>Medicine Name: Paracetamol</p>
  <p class="info-detail">Price: PHP 85</p>
</article>`;
const solvedStockList = (styles: string): Record<string, string> => ({ "index.html": STOCK_LIST_HTML, "styles.css": css(styles) });

/* css-topic: box-spacing */
const ID_APPLICATION_HTML = `<article class="info-card">
  <h2>Card Spacing</h2>
  <p>Padding Inside Card</p>
  <p class="info-detail">Adjust for Barangay ID</p>
</article>`;
const solvedIdApplication = (styles: string): Record<string, string> => ({ "index.html": ID_APPLICATION_HTML, "styles.css": css(styles) });

/* css-topic: borders */
const STORE_CREDIT_HTML = `<aside class="notice-banner">
  <h2>Credit Needed</h2>
  <p>Please pay by PHP 85</p>
</aside>`;
const solvedStoreCredit = (styles: string): Record<string, string> => ({ "index.html": STORE_CREDIT_HTML, "styles.css": css(styles) });

/* css-topic: typography */
const NOTICE_TYPOGRAPHY_HTML = `<article class="info-card">
  <h2>Notice</h2>
  <p>Barangay Curfew</p>
  <p class="info-detail">From 9 PM to 6 AM</p>
</article>`;
const solvedNoticeTypography = (styles: string): Record<string, string> => ({ "index.html": NOTICE_TYPOGRAPHY_HTML, "styles.css": css(styles) });

/* css-topic: flex-row */
const FLEX_ROW_HTML = `<div class="price-row">
  <span class="price-name">Route</span>
  <span class="price-amount">Cost</span>
</div>`;
const solvedFlexRow = (styles: string): Record<string, string> => ({ "index.html": FLEX_ROW_HTML, "styles.css": css(styles) });

/* css-topic: flex-column */
const PRICE_LIST_HTML = `<section class="item-list">
  <h2>Sari-Sari Store Price List</h2>
  <ul>
    <li>Item A - PHP 85</li>
    <li>Item B - PHP 90</li>
    <li>Item C - PHP 75</li>
  </ul>
</section>`;
const solvedPriceList = (styles: string): Record<string, string> => ({ "index.html": PRICE_LIST_HTML, "styles.css": css(styles) });

/* css-topic: grid */
const CENTRE_NOTICE_HTML = `<section class="stall-grid">
  <article class="stall-cell">Vaccination Schedule</article>
  <article class="stall-cell">Deworming Camp</article>
  <article class="stall-cell">Health Checks</article>
  <article class="stall-cell">Free Consultation</article>
</section>`;
const solvedCentreNotice = (styles: string): Record<string, string> => ({ "index.html": CENTRE_NOTICE_HTML, "styles.css": css(styles) });

/* css-topic: responsive */
const BOARD_RESPONSIVE_HTML = `<article class="info-card">
  <h2>Travel Deals</h2>
  <p>Phone Card Offers</p>
  <p class="info-detail">PHP 85 and below</p>
</article>`;
const solvedBoardResponsive = (styles: string): Record<string, string> => ({ "index.html": BOARD_RESPONSIVE_HTML, "styles.css": css(styles) });

/* css-topic: shadow-depth */
const STALL_SIGN_HTML = `<article class="info-card">
  <h2>Fresh Catch</h2>
  <p>PHP 85 per kg</p>
  <p class="info-detail">Fresh tilapia, carp, and eels</p>
</article>`;
const solvedStallSign = (styles: string): Record<string, string> => ({ "index.html": STALL_SIGN_HTML, "styles.css": css(styles) });

/* css-topic: alignment */
const MENU_ALIGNMENT_HTML = `<aside class="notice-banner">
  <h2>center text</h2>
  <p>turo-turo style</p>
</aside>`;
const solvedMenuAlignment = (styles: string): Record<string, string> => ({ "index.html": MENU_ALIGNMENT_HTML, "styles.css": css(styles) });

/* css-topic: overflow-text */
const LEAGUE_SCHEDULE_HTML = `<div class="price-row">
  <span class="price-name">Schedule</span>
  <span class="price-amount">Details</span>
</div>`;
const solvedLeagueSchedule = (styles: string): Record<string, string> => ({ "index.html": LEAGUE_SCHEDULE_HTML, "styles.css": css(styles) });

/* css-topic: position */
const LIST_POSITION_HTML = `<aside class="notice-banner">
  <h2>Badge for Sale</h2>
  <p>PHP 85</p>
</aside>`;
const solvedListPosition = (styles: string): Record<string, string> => ({ "index.html": LIST_POSITION_HTML, "styles.css": css(styles) });

/* css-topic: custom-properties */
const CUSTOM_PROPERTIES_HTML = `<article class="info-card">
  <h2>Color Scheme</h2>
  <p>Red for Bicycles</p>
  <p class="info-detail">Green for Trikes</p>
</article>`;
const solvedCustomProperties = (styles: string): Record<string, string> => ({ "index.html": CUSTOM_PROPERTIES_HTML, "styles.css": css(styles) });

/* css-topic: box-spacing */
const BOX_SPACING_HTML = `<article class="info-card">
  <h2>Bakery Order Slip</h2>
  <p>Card Spacing: 2cm</p>
  <p class="info-detail">Price: PHP 85</p>
</article>`;
const solvedBoxSpacing = (styles: string): Record<string, string> => ({ "index.html": BOX_SPACING_HTML, "styles.css": css(styles) });

/* css-topic: borders */
const STATION_NOTICE_HTML = `<aside class="notice-banner">
  <h2>Notice</h2>
  <p>Refill now, save big! PHP 85</p>
</aside>`;
const solvedStationNotice = (styles: string): Record<string, string> => ({ "index.html": STATION_NOTICE_HTML, "styles.css": css(styles) });

/* css-topic: typography */
const UP_ANNOUNCEMENT_HTML = `<article class="info-card">
  <h2>Barangay Clean-Up Drive</h2>
  <p>Join us in cleaning our neighborhood!</p>
  <p class="info-detail">PHP 85 donation needed per family.</p>
</article>`;
const solvedUpAnnouncement = (styles: string): Record<string, string> => ({ "index.html": UP_ANNOUNCEMENT_HTML, "styles.css": css(styles) });

/* css-topic: flex-row */
const RATE_CARD_HTML = `<div class="price-row">
  <span class="price-name">Service</span>
  <span class="price-amount">Cost</span>
</div>`;
const solvedRateCard = (styles: string): Record<string, string> => ({ "index.html": RATE_CARD_HTML, "styles.css": css(styles) });

/* css-topic: flex-column */
const FLEX_COLUMN_HTML = `<section class="item-list">
  <h2>Welcome to Fiesta Fiesta</h2>
  <ul>
    <li>Enjoy Traditional Delights</li>
    <li>Live Music and Dance Shows</li>
    <li>Visit Our Colorful Attractions</li>
  </ul>
</section>`;
const solvedFlexColumn = (styles: string): Record<string, string> => ({ "index.html": FLEX_COLUMN_HTML, "styles.css": css(styles) });

/* css-topic: backgrounds */
const PRICE_BOARD_HTML = `<aside class="notice-banner">
  <h2>Fresh Rice</h2>
  <p>PHP 85 per kg</p>
</aside>`;
const solvedPriceBoard = (styles: string): Record<string, string> => ({ "index.html": PRICE_BOARD_HTML, "styles.css": css(styles) });

/* css-topic: units */
const RECEIPT_UNITS_HTML = `<article class="info-card">
  <h2>Size Options</h2>
  <p>Small: PHP 85</p>
  <p class="info-detail">Medium: PHP 100</p>
</article>`;
const solvedReceiptUnits = (styles: string): Record<string, string> => ({ "index.html": RECEIPT_UNITS_HTML, "styles.css": css(styles) });

/* css-topic: list-styling */
const LIST_STYLING_HTML = `<section class="item-list">
  <h2>Medicine List</h2>
  <ul>
    <li>Paracetamol 500mg</li>
    <li>Ibuprofen 400mg</li>
    <li>Amoxicillin capsules</li>
  </ul>
</section>`;
const solvedListStyling = (styles: string): Record<string, string> => ({ "index.html": LIST_STYLING_HTML, "styles.css": css(styles) });

/* css-topic: hover-state */
const APPLICATION_NOTICE_HTML = `<div class="price-row">
  <span class="price-name">Barangay ID</span>
  <span class="price-amount">Fee</span>
</div>`;
const solvedApplicationNotice = (styles: string): Record<string, string> => ({ "index.html": APPLICATION_NOTICE_HTML, "styles.css": css(styles) });

/* css-topic: grid-repeat */
const CREDIT_REMINDER_HTML = `<section class="stall-grid">
  <article class="stall-cell">Item Name</article>
  <article class="stall-cell">Price per unit</article>
  <article class="stall-cell">Quantity</article>
  <article class="stall-cell">Subtotal</article>
</section>`;
const solvedCreditReminder = (styles: string): Record<string, string> => ({ "index.html": CREDIT_REMINDER_HTML, "styles.css": css(styles) });

/* css-topic: opacity-layer */
const OPACITY_LAYER_HTML = `<aside class="notice-banner">
  <h2>Barangay Curfew Notice</h2>
  <p>All residents must stay inside from 9 PM to 6 AM.</p>
</aside>`;
const solvedOpacityLayer = (styles: string): Record<string, string> => ({ "index.html": OPACITY_LAYER_HTML, "styles.css": css(styles) });

/* css-topic: text-detail */
const TEXT_DETAIL_HTML = `<article class="info-card">
  <h2>JEPPNEY TIMETABLE</h2>
  <p>DAILY ROUTES</p>
  <p class="info-detail">TIMES & FEES</p>
</article>`;
const solvedTextDetail = (styles: string): Record<string, string> => ({ "index.html": TEXT_DETAIL_HTML, "styles.css": css(styles) });

/* css-topic: sizing-limits */
const SIZING_LIMITS_HTML = `<article class="info-card">
  <h2>Sari-sari Store</h2>
  <p>Priced Cards</p>
  <p class="info-detail">Size: A4</p>
</article>`;
const solvedSizingLimits = (styles: string): Record<string, string> => ({ "index.html": SIZING_LIMITS_HTML, "styles.css": css(styles) });

/* css-topic: backgrounds */
const CENTRE_BACKGROUNDS_HTML = `<aside class="notice-banner">
  <h2>Vaccines Available</h2>
  <p>Book now at Barangay Health Center</p>
</aside>`;
const solvedCentreBackgrounds = (styles: string): Record<string, string> => ({ "index.html": CENTRE_BACKGROUNDS_HTML, "styles.css": css(styles) });

/* css-topic: units */
const BOARD_UNITS_HTML = `<article class="info-card">
  <h2>Jeepney Route Board</h2>
  <p>City to Suburb</p>
  <p class="info-detail">PHP 85 per ride</p>
</article>`;
const solvedBoardUnits = (styles: string): Record<string, string> => ({ "index.html": BOARD_UNITS_HTML, "styles.css": css(styles) });

/* css-topic: list-styling */
const STALL_2_HTML = `<section class="item-list">
  <h2>Fresh Fish Specials</h2>
  <ul>
    <li>Pangasianad - PHP 85</li>
    <li>Tilapia - PHP 75</li>
    <li>Mangrove Prawns - PHP 90</li>
  </ul>
</section>`;
const solvedStall2 = (styles: string): Record<string, string> => ({ "index.html": STALL_2_HTML, "styles.css": css(styles) });

/* css-topic: hover-state */
const HOVER_STATE_HTML = `<div class="price-row">
  <span class="price-name">Click Me</span>
  <span class="price-amount">PHP 99</span>
</div>`;
const solvedHoverState = (styles: string): Record<string, string> => ({ "index.html": HOVER_STATE_HTML, "styles.css": css(styles) });

/* css-topic: grid-repeat */
const GRID_REPEAT_HTML = `<section class="stall-grid">
  <article class="stall-cell">Game Time</article>
  <article class="stall-cell">Team A</article>
  <article class="stall-cell">Team B</article>
  <article class="stall-cell">Venue</article>
</section>`;
const solvedGridRepeat = (styles: string): Record<string, string> => ({ "index.html": GRID_REPEAT_HTML, "styles.css": css(styles) });

/* css-topic: opacity-layer */
const LIST_2_HTML = `<aside class="notice-banner">
  <h2>Backpack Special</h2>
  <p>Get yours now! Save PHP 85.</p>
</aside>`;
const solvedList2 = (styles: string): Record<string, string> => ({ "index.html": LIST_2_HTML, "styles.css": css(styles) });

/* css-topic: text-detail */
const TABLE_2_HTML = `<article class="info-card">
  <h2>Tricycle Fare Table</h2>
  <p>Route A: City Center to Airport</p>
  <p class="info-detail">Route B: City Center to University</p>
</article>`;
const solvedTable2 = (styles: string): Record<string, string> => ({ "index.html": TABLE_2_HTML, "styles.css": css(styles) });

/** Authored proof for every step. Missing entries stop the course from loading. */
const references = {
  "first-rule": {
    estimatedMinutes: 5,
    solution: solved("body {\n  background-color: #f4f4f5;\n}"),
  },
  "class-selector": {
    estimatedMinutes: 5,
    solution: solved(
      "body {\n  background-color: #f4f4f5;\n}\n\n.card {\n  background-color: white;\n}",
    ),
  },
  padding: {
    estimatedMinutes: 4,
    solution: solved(
      "body {\n  background-color: #f4f4f5;\n}\n\n.card {\n  background-color: white;\n  padding: 24px;\n}",
    ),
  },
  "radius-shadow": {
    estimatedMinutes: 4,
    solution: solved(
      "body {\n  background-color: #f4f4f5;\n}\n\n.card {\n  background-color: white;\n  padding: 24px;\n  border-radius: 12px;\n}",
    ),
  },
  "font-size": {
    estimatedMinutes: 4,
    solution: solved(
      ".card {\n  background-color: white;\n  padding: 24px;\n  border-radius: 12px;\n}\n\n.route {\n  font-size: 32px;\n}",
    ),
  },
  colour: {
    estimatedMinutes: 4,
    solution: solved(
      ".card {\n  background-color: white;\n  padding: 24px;\n}\n\n.route {\n  font-size: 32px;\n}\n\n.fare {\n  color: teal;\n}",
    ),
  },
  "font-weight": {
    estimatedMinutes: 4,
    solution: solved(
      ".card {\n  padding: 24px;\n}\n\n.route {\n  font-size: 32px;\n}\n\n.fare {\n  color: teal;\n  font-weight: bold;\n}",
    ),
  },
  "max-width-centre": {
    estimatedMinutes: 4,
    solution: solved(
      ".card {\n  background-color: white;\n  padding: 24px;\n  border-radius: 12px;\n  max-width: 360px;\n}",
    ),
  },
  "list-style": {
    estimatedMinutes: 4,
    solution: solved(
      ".card {\n  padding: 24px;\n}\n\n.stops {\n  list-style-type: none;\n}",
    ),
  },
  "flex-row": {
    estimatedMinutes: 5,
    solution: solved(
      ".card {\n  padding: 24px;\n}\n\n.stops {\n  list-style-type: none;\n  display: flex;\n}",
    ),
  },
  gap: {
    estimatedMinutes: 4,
    solution: solved(
      ".stops {\n  list-style-type: none;\n  display: flex;\n  gap: 12px;\n}",
    ),
  },
  hover: {
    estimatedMinutes: 6,
    solution: solved(
      ".card {\n  background-color: white;\n  padding: 24px;\n  border-radius: 12px;\n  border: 2px solid transparent;\n}\n\n.card:hover {\n  border: 2px solid teal;\n}",
    ),
  },
  "receipt-background": { estimatedMinutes: 4, solution: solvedReceipt(".receipt {\n  background-color: white;\n}") },
  "receipt-padding": { estimatedMinutes: 4, solution: solvedReceipt(".receipt {\n  background-color: white;\n  padding: 16px;\n}") },
  "receipt-border": { estimatedMinutes: 4, solution: solvedReceipt(".receipt {\n  background-color: white;\n  padding: 16px;\n  border: 1px solid #d4d4d8;\n}") },
  "receipt-total": { estimatedMinutes: 4, solution: solvedReceipt(".total {\n  font-weight: bold;\n}") },
  "receipt-width": { estimatedMinutes: 4, solution: solvedReceipt(".receipt {\n  background-color: white;\n  padding: 16px;\n  border: 1px solid #d4d4d8;\n  max-width: 360px;\n}") },
  "receipt-centre": { estimatedMinutes: 5, solution: solvedReceipt(".receipt {\n  background-color: white;\n  padding: 16px;\n  border: 1px solid #d4d4d8;\n  max-width: 360px;\n  margin: 0 auto;\n}") },
  "receipt-title-colour": { estimatedMinutes: 4, solution: solvedReceipt("h1 {\n  color: teal;\n}") },
  "meal-flex": { estimatedMinutes: 5, solution: solvedMeal(".meal {\n  display: flex;\n}") },
  "meal-spread": { estimatedMinutes: 5, solution: solvedMeal(".meal {\n  display: flex;\n  justify-content: space-between;\n}") },
  "meal-align": { estimatedMinutes: 5, solution: solvedMeal(".meal {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}") },
  "meal-padding": { estimatedMinutes: 4, solution: solvedMeal(".meal {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 12px;\n}") },
  "meal-border": { estimatedMinutes: 4, solution: solvedMeal(".meal {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 12px;\n  border-bottom: 1px solid #d4d4d8;\n}") },
  "meal-price-weight": { estimatedMinutes: 4, solution: solvedMeal(".price {\n  font-weight: bold;\n}") },
  "notice-background": { estimatedMinutes: 4, solution: solvedNotice(".notice {\n  background-color: #0f766e;\n}") },
  "notice-colour": { estimatedMinutes: 4, solution: solvedNotice(".notice {\n  background-color: #0f766e;\n  color: white;\n}") },
  "notice-padding": { estimatedMinutes: 4, solution: solvedNotice(".notice {\n  background-color: #0f766e;\n  color: white;\n  padding: 16px;\n}") },
  "notice-line-height": { estimatedMinutes: 5, solution: solvedNotice(".notice {\n  background-color: #0f766e;\n  color: white;\n  padding: 16px;\n  line-height: 1.5;\n}") },
  "notice-radius": { estimatedMinutes: 4, solution: solvedNotice(".notice {\n  background-color: #0f766e;\n  color: white;\n  padding: 16px;\n  line-height: 1.5;\n  border-radius: 8px;\n}") },
  "stalls-grid": { estimatedMinutes: 5, solution: solvedStalls(".stalls {\n  display: grid;\n}") },
  "stalls-columns": { estimatedMinutes: 5, solution: solvedStalls(".stalls {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n}") },
  "stalls-gap": { estimatedMinutes: 4, solution: solvedStalls(".stalls {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 12px;\n}") },
  "stall-background": { estimatedMinutes: 4, solution: solvedStalls(".stall {\n  background-color: white;\n}") },
  "stall-padding": { estimatedMinutes: 4, solution: solvedStalls(".stall {\n  background-color: white;\n  padding: 12px;\n}") },
  "stalls-wide-columns": { estimatedMinutes: 6, solution: solvedStalls(".stalls {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n}\n\n@media (min-width: 640px) {\n  .stalls {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}") },
  "help-inline-block": { estimatedMinutes: 5, solution: solvedHelp(".help-link {\n  display: inline-block;\n}") },
  "help-background": { estimatedMinutes: 4, solution: solvedHelp(".help-link {\n  display: inline-block;\n  background-color: #b91c1c;\n}") },
  "help-colour": { estimatedMinutes: 4, solution: solvedHelp(".help-link {\n  display: inline-block;\n  background-color: #b91c1c;\n  color: white;\n}") },
  "help-padding": { estimatedMinutes: 4, solution: solvedHelp(".help-link {\n  display: inline-block;\n  background-color: #b91c1c;\n  color: white;\n  padding: 12px;\n}") },
  "help-focus": { estimatedMinutes: 6, solution: solvedHelp(".help-link {\n  display: inline-block;\n  background-color: #b91c1c;\n  color: white;\n  padding: 12px;\n}\n\n.help-link:focus-visible {\n  outline: 3px solid #111827;\n}") },
  "form-width": { estimatedMinutes: 4, solution: solvedForm(".request-form {\n  max-width: 360px;\n}") },
  "field-width": { estimatedMinutes: 4, solution: solvedForm("input,\ntextarea {\n  width: 100%;\n}") },
  "field-box-sizing": { estimatedMinutes: 5, solution: solvedForm("input,\ntextarea {\n  width: 100%;\n  box-sizing: border-box;\n}") },
  "field-padding": { estimatedMinutes: 4, solution: solvedForm("input,\ntextarea {\n  width: 100%;\n  box-sizing: border-box;\n  padding: 8px;\n}") },
  "field-border": { estimatedMinutes: 4, solution: solvedForm("input,\ntextarea {\n  width: 100%;\n  box-sizing: border-box;\n  padding: 8px;\n  border: 1px solid #71717a;\n}") },
  "services-flex": { estimatedMinutes: 5, solution: solvedServices(".services {\n  display: flex;\n}") },
  "services-gap": { estimatedMinutes: 4, solution: solvedServices(".services {\n  display: flex;\n  gap: 12px;\n}") },
  "services-wrap": { estimatedMinutes: 5, solution: solvedServices(".services {\n  display: flex;\n  gap: 12px;\n  flex-wrap: wrap;\n}") },
  "service-grow": { estimatedMinutes: 5, solution: solvedServices(".service {\n  flex: 1;\n}") },
  "service-min-width": { estimatedMinutes: 4, solution: solvedServices(".service {\n  flex: 1;\n  min-width: 160px;\n}") },
  "service-surface": { estimatedMinutes: 4, solution: solvedServices(".service {\n  flex: 1;\n  min-width: 160px;\n  padding: 12px;\n  background-color: white;\n}") },
  "price-row-flex": { estimatedMinutes: 5, solution: solvedPrices(".price-row {\n  display: flex;\n}") },
  "price-row-between": { estimatedMinutes: 4, solution: solvedPrices(".price-row {\n  display: flex;\n  justify-content: space-between;\n}") },
  "price-row-padding": { estimatedMinutes: 4, solution: solvedPrices(".price-row {\n  display: flex;\n  justify-content: space-between;\n  padding: 8px 0;\n}") },
  "price-align": { estimatedMinutes: 5, solution: solvedPrices("dd {\n  text-align: right;\n}") },
  "price-numbers": { estimatedMinutes: 5, solution: solvedPrices("dd {\n  text-align: right;\n  font-variant-numeric: tabular-nums;\n}") },
  "theme-value": { estimatedMinutes: 5, solution: solvedTheme(":root {\n  --barangay-teal: #0f766e;\n}") },
  "theme-colour": { estimatedMinutes: 5, solution: solvedTheme(":root {\n  --barangay-teal: #0f766e;\n}\n\n.holiday-note {\n  color: var(--barangay-teal);\n}") },
  "theme-border": { estimatedMinutes: 4, solution: solvedTheme(":root {\n  --barangay-teal: #0f766e;\n}\n\n.holiday-note {\n  color: var(--barangay-teal);\n  border-left: 4px solid var(--barangay-teal);\n}") },
  "theme-padding": { estimatedMinutes: 4, solution: solvedTheme(":root {\n  --barangay-teal: #0f766e;\n}\n\n.holiday-note {\n  color: var(--barangay-teal);\n  border-left: 4px solid var(--barangay-teal);\n  padding-left: 12px;\n}") },
  "theme-background": { estimatedMinutes: 4, solution: solvedTheme(".holiday-note {\n  background-color: #f0fdfa;\n}") },
  "alert-surface": { estimatedMinutes: 4, solution: solvedAlert(".alert-card {\n  background-color: white;\n  padding: 16px;\n}") },
  "alert-transition": { estimatedMinutes: 5, solution: solvedAlert(".alert-card {\n  background-color: white;\n  padding: 16px;\n  transition: transform 150ms;\n}") },
  "alert-hover": { estimatedMinutes: 5, solution: solvedAlert(".alert-card {\n  transition: transform 150ms;\n}\n\n.alert-card:hover {\n  transform: translateY(-2px);\n}") },
  "alert-reduced-motion": { estimatedMinutes: 6, solution: solvedAlert(".alert-card {\n  transition: transform 150ms;\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .alert-card {\n    transition: none;\n  }\n}") },
  "alert-border": { estimatedMinutes: 4, solution: solvedAlert(".alert-card {\n  border-left: 4px solid #b91c1c;\n}") },
  "heading-case": { estimatedMinutes: 4, solution: solvedHeading(".announcement p {\n  text-transform: uppercase;\n}") },
  "heading-spacing": { estimatedMinutes: 5, solution: solvedHeading(".announcement p {\n  text-transform: uppercase;\n  letter-spacing: 0.08em;\n}") },
  "heading-size": { estimatedMinutes: 6, solution: solvedHeading("h1 {\n  font-size: clamp(24px, 5vw, 48px);\n}") },
  "heading-height": { estimatedMinutes: 4, solution: solvedHeading("h1 {\n  font-size: clamp(24px, 5vw, 48px);\n  line-height: 1.1;\n}") },
  "heading-length": { estimatedMinutes: 5, solution: solvedHeading("h1 {\n  font-size: clamp(24px, 5vw, 48px);\n  line-height: 1.1;\n  max-width: 20ch;\n}") },
  "link-colour": { estimatedMinutes: 4, solution: solvedAnnouncementLink(".announcement-link {\n  color: #0f766e;\n}") },
  "link-weight": { estimatedMinutes: 4, solution: solvedAnnouncementLink(".announcement-link {\n  color: #0f766e;\n  font-weight: 600;\n}") },
  "link-thickness": { estimatedMinutes: 5, solution: solvedAnnouncementLink(".announcement-link {\n  color: #0f766e;\n  font-weight: 600;\n  text-decoration-thickness: 2px;\n}") },
  "link-offset": { estimatedMinutes: 5, solution: solvedAnnouncementLink(".announcement-link {\n  color: #0f766e;\n  font-weight: 600;\n  text-decoration-thickness: 2px;\n  text-underline-offset: 4px;\n}") },
  "link-hover": { estimatedMinutes: 5, solution: solvedAnnouncementLink(".announcement-link {\n  color: #0f766e;\n  font-weight: 600;\n  text-decoration-thickness: 2px;\n  text-underline-offset: 4px;\n}\n\n.announcement-link:hover {\n  color: #115e59;\n}") },
  "button-background": { estimatedMinutes: 4, solution: solvedOrderButton(".order-button {\n  background-color: #0f766e;\n}") },
  "button-colour": { estimatedMinutes: 4, solution: solvedOrderButton(".order-button {\n  background-color: #0f766e;\n  color: white;\n}") },
  "button-padding": { estimatedMinutes: 5, solution: solvedOrderButton(".order-button {\n  background-color: #0f766e;\n  color: white;\n  padding: 12px 16px;\n}") },
  "button-radius": { estimatedMinutes: 4, solution: solvedOrderButton(".order-button {\n  background-color: #0f766e;\n  color: white;\n  padding: 12px 16px;\n  border-radius: 8px;\n}") },
  "button-cursor": { estimatedMinutes: 4, solution: solvedOrderButton(".order-button {\n  background-color: #0f766e;\n  color: white;\n  padding: 12px 16px;\n  border-radius: 8px;\n  cursor: pointer;\n}") },
  "button-hover": { estimatedMinutes: 5, solution: solvedOrderButton(".order-button {\n  background-color: #0f766e;\n  color: white;\n  padding: 12px 16px;\n  border-radius: 8px;\n  cursor: pointer;\n}\n\n.order-button:hover {\n  background-color: #115e59;\n}") },
  "status-inline-flex": { estimatedMinutes: 5, solution: solvedStatus(".status {\n  display: inline-flex;\n}") },
  "status-align": { estimatedMinutes: 4, solution: solvedStatus(".status {\n  display: inline-flex;\n  align-items: center;\n}") },
  "status-gap": { estimatedMinutes: 4, solution: solvedStatus(".status {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n}") },
  "status-dot-width": { estimatedMinutes: 4, solution: solvedStatus(".status {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n}\n\n.status-dot {\n  width: 8px;\n}") },
  "status-dot-height": { estimatedMinutes: 4, solution: solvedStatus(".status {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n}\n\n.status-dot {\n  width: 8px;\n  height: 8px;\n}") },
  "status-dot-colour": { estimatedMinutes: 4, solution: solvedStatus(".status {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n}\n\n.status-dot {\n  width: 8px;\n  height: 8px;\n  background-color: #16a34a;\n}") },
  "status-dot-round": { estimatedMinutes: 4, solution: solvedStatus(".status {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n}\n\n.status-dot {\n  width: 8px;\n  height: 8px;\n  background-color: #16a34a;\n  border-radius: 50%;\n}") },
  "focus-link-colour": { estimatedMinutes: 4, solution: solvedFocusLink(".focus-link {\n  color: #0f766e;\n}") },
  "focus-link-outline": { estimatedMinutes: 5, solution: solvedFocusLink(".focus-link {\n  color: #0f766e;\n}\n\n.focus-link:focus-visible {\n  outline: 3px solid #111827;\n}") },
  "focus-link-offset": { estimatedMinutes: 4, solution: solvedFocusLink(".focus-link {\n  color: #0f766e;\n}\n\n.focus-link:focus-visible {\n  outline: 3px solid #111827;\n  outline-offset: 4px;\n}") },
  "focus-link-weight": { estimatedMinutes: 4, solution: solvedFocusLink(".focus-link {\n  color: #0f766e;\n  font-weight: 600;\n}\n\n.focus-link:focus-visible {\n  outline: 3px solid #111827;\n  outline-offset: 4px;\n}") },
  "focus-link-underline": { estimatedMinutes: 4, solution: solvedFocusLink(".focus-link {\n  color: #0f766e;\n  font-weight: 600;\n  text-decoration-thickness: 2px;\n}\n\n.focus-link:focus-visible {\n  outline: 3px solid #111827;\n  outline-offset: 4px;\n}") },
  "print-notice-colour": { estimatedMinutes: 4, solution: solvedPrintNotice(".print-notice {\n  color: #111827;\n}") },
  "print-notice-padding": { estimatedMinutes: 4, solution: solvedPrintNotice(".print-notice {\n  color: #111827;\n  padding: 16px;\n}") },
  "print-notice-print-colour": { estimatedMinutes: 5, solution: solvedPrintNotice(".print-notice {\n  color: #111827;\n  padding: 16px;\n}\n\n@media print {\n  .print-notice {\n    color: #000;\n  }\n}") },
  "print-notice-hide-button": { estimatedMinutes: 4, solution: solvedPrintNotice(".print-notice {\n  color: #111827;\n  padding: 16px;\n}\n\n@media print {\n  .print-notice {\n    color: #000;\n  }\n\n  .print-help {\n    display: none;\n  }\n}") },
  "print-page-margin": { estimatedMinutes: 5, solution: solvedPrintNotice(".print-notice {\n  color: #111827;\n  padding: 16px;\n}\n\n@media print {\n  .print-notice {\n    color: #000;\n  }\n\n  .print-help {\n    display: none;\n  }\n}\n\n@page {\n  margin: 16mm;\n}") },
  "night-notice-background": { estimatedMinutes: 4, solution: solvedNightNotice(".night-notice {\n  background-color: #f8fafc;\n}") },
  "night-notice-colour": { estimatedMinutes: 4, solution: solvedNightNotice(".night-notice {\n  background-color: #f8fafc;\n  color: #111827;\n}") },
  "night-notice-dark-background": { estimatedMinutes: 5, solution: solvedNightNotice(".night-notice {\n  background-color: #f8fafc;\n  color: #111827;\n}\n\n@media (prefers-color-scheme: dark) {\n  .night-notice {\n    background-color: #111827;\n  }\n}") },
  "night-notice-dark-colour": { estimatedMinutes: 4, solution: solvedNightNotice(".night-notice {\n  background-color: #f8fafc;\n  color: #111827;\n}\n\n@media (prefers-color-scheme: dark) {\n  .night-notice {\n    background-color: #111827;\n    color: #f8fafc;\n  }\n}") },
  "night-notice-colour-scheme": { estimatedMinutes: 5, solution: solvedNightNotice(".night-notice {\n  background-color: #f8fafc;\n  color: #111827;\n}\n\n@media (prefers-color-scheme: dark) {\n  .night-notice {\n    background-color: #111827;\n    color: #f8fafc;\n    color-scheme: dark;\n  }\n}") },
  "sari-store-padding": { estimatedMinutes: 4, solution: solvedSariStore(".info-card {\n  padding: 16px;\n}") },
  "sari-store-background-color": { estimatedMinutes: 4, solution: solvedSariStore(".info-card {\n  padding: 16px;\n  background-color: #ffffff;\n}") },
  "sari-store-border-radius": { estimatedMinutes: 4, solution: solvedSariStore(".info-card {\n  padding: 16px;\n  background-color: #ffffff;\n  border-radius: 12px;\n}") },
  "sari-store-margin-bottom": { estimatedMinutes: 4, solution: solvedSariStore(".info-card {\n  padding: 16px;\n  background-color: #ffffff;\n  border-radius: 12px;\n  margin-bottom: 24px;\n}") },
  "sari-store-max-width": { estimatedMinutes: 4, solution: solvedSariStore(".info-card {\n  padding: 16px;\n  background-color: #ffffff;\n  border-radius: 12px;\n  margin-bottom: 24px;\n  max-width: 400px;\n}") },
  "curfew-notice-border-left-width": { estimatedMinutes: 4, solution: solvedCurfewNotice(".notice-banner {\n  border-left-width: 4px;\n}") },
  "curfew-notice-border-left-style": { estimatedMinutes: 4, solution: solvedCurfewNotice(".notice-banner {\n  border-left-width: 4px;\n  border-left-style: solid;\n}") },
  "curfew-notice-border-left-color": { estimatedMinutes: 4, solution: solvedCurfewNotice(".notice-banner {\n  border-left-width: 4px;\n  border-left-style: solid;\n  border-left-color: #b45309;\n}") },
  "curfew-notice-background-color": { estimatedMinutes: 4, solution: solvedCurfewNotice(".notice-banner {\n  border-left-width: 4px;\n  border-left-style: solid;\n  border-left-color: #b45309;\n  background-color: #fffbeb;\n}") },
  "curfew-notice-padding-left": { estimatedMinutes: 4, solution: solvedCurfewNotice(".notice-banner {\n  border-left-width: 4px;\n  border-left-style: solid;\n  border-left-color: #b45309;\n  background-color: #fffbeb;\n  padding-left: 16px;\n}") },
  "terminal-timetable-font-size": { estimatedMinutes: 4, solution: solvedTerminalTimetable(".info-card {\n  font-size: 18px;\n}") },
  "terminal-timetable-line-height": { estimatedMinutes: 4, solution: solvedTerminalTimetable(".info-card {\n  font-size: 18px;\n  line-height: 1.6;\n}") },
  "terminal-timetable-color": { estimatedMinutes: 4, solution: solvedTerminalTimetable(".info-card {\n  font-size: 18px;\n  line-height: 1.6;\n  color: #1f2937;\n}") },
  "terminal-timetable-font-weight": { estimatedMinutes: 4, solution: solvedTerminalTimetable(".info-card {\n  font-size: 18px;\n  line-height: 1.6;\n  color: #1f2937;\n  font-weight: 500;\n}") },
  "terminal-timetable-letter-spacing": { estimatedMinutes: 4, solution: solvedTerminalTimetable(".info-card {\n  font-size: 18px;\n  line-height: 1.6;\n  color: #1f2937;\n  font-weight: 500;\n  letter-spacing: 0.2px;\n}") },
  "store-price-display": { estimatedMinutes: 4, solution: solvedStorePrice(".price-row {\n  display: flex;\n}") },
  "store-price-justify-content": { estimatedMinutes: 4, solution: solvedStorePrice(".price-row {\n  display: flex;\n  justify-content: space-between;\n}") },
  "store-price-align-items": { estimatedMinutes: 4, solution: solvedStorePrice(".price-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}") },
  "store-price-gap": { estimatedMinutes: 4, solution: solvedStorePrice(".price-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n}") },
  "store-price-padding": { estimatedMinutes: 4, solution: solvedStorePrice(".price-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n  padding: 12px;\n}") },
  "health-centre-display": { estimatedMinutes: 4, solution: solvedHealthCentre(".item-list {\n  display: flex;\n}") },
  "health-centre-flex-direction": { estimatedMinutes: 4, solution: solvedHealthCentre(".item-list {\n  display: flex;\n  flex-direction: column;\n}") },
  "health-centre-gap": { estimatedMinutes: 4, solution: solvedHealthCentre(".item-list {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}") },
  "health-centre-background-color": { estimatedMinutes: 4, solution: solvedHealthCentre(".item-list {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  background-color: #f8fafc;\n}") },
  "health-centre-padding": { estimatedMinutes: 4, solution: solvedHealthCentre(".item-list {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  background-color: #f8fafc;\n  padding: 16px;\n}") },
  "route-board-display": { estimatedMinutes: 4, solution: solvedRouteBoard(".stall-grid {\n  display: grid;\n}") },
  "route-board-grid-template-columns": { estimatedMinutes: 4, solution: solvedRouteBoard(".stall-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n}") },
  "route-board-gap": { estimatedMinutes: 4, solution: solvedRouteBoard(".stall-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n}") },
  "route-board-padding": { estimatedMinutes: 4, solution: solvedRouteBoard(".stall-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n  padding: 12px;\n}") },
  "route-board-background-color": { estimatedMinutes: 4, solution: solvedRouteBoard(".stall-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n  padding: 12px;\n  background-color: #f1f5f9;\n}") },
  "fish-stall-max-width": { estimatedMinutes: 4, solution: solvedFishStall(".info-card {\n  max-width: 480px;\n}") },
  "fish-stall-width": { estimatedMinutes: 4, solution: solvedFishStall(".info-card {\n  max-width: 480px;\n  width: 100%;\n}") },
  "fish-stall-padding": { estimatedMinutes: 4, solution: solvedFishStall(".info-card {\n  max-width: 480px;\n  width: 100%;\n  padding: 16px;\n}") },
  "fish-stall-font-size": { estimatedMinutes: 4, solution: solvedFishStall(".info-card {\n  max-width: 480px;\n  width: 100%;\n  padding: 16px;\n  font-size: 16px;\n}") },
  "fish-stall-box-sizing": { estimatedMinutes: 4, solution: solvedFishStall(".info-card {\n  max-width: 480px;\n  width: 100%;\n  padding: 16px;\n  font-size: 16px;\n  box-sizing: border-box;\n}") },
  "turo-menu-background-color": { estimatedMinutes: 4, solution: solvedTuroMenu(".info-card {\n  background-color: #ffffff;\n}") },
  "turo-menu-border-radius": { estimatedMinutes: 4, solution: solvedTuroMenu(".info-card {\n  background-color: #ffffff;\n  border-radius: 10px;\n}") },
  "turo-menu-box-shadow": { estimatedMinutes: 4, solution: solvedTuroMenu(".info-card {\n  background-color: #ffffff;\n  border-radius: 10px;\n  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.2);\n}") },
  "turo-menu-padding": { estimatedMinutes: 4, solution: solvedTuroMenu(".info-card {\n  background-color: #ffffff;\n  border-radius: 10px;\n  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.2);\n  padding: 20px;\n}") },
  "turo-menu-border": { estimatedMinutes: 4, solution: solvedTuroMenu(".info-card {\n  background-color: #ffffff;\n  border-radius: 10px;\n  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.2);\n  padding: 20px;\n  border: 1px solid #e2e8f0;\n}") },
  "basketball-league-text-align": { estimatedMinutes: 4, solution: solvedBasketballLeague(".notice-banner {\n  text-align: center;\n}") },
  "basketball-league-margin-left": { estimatedMinutes: 4, solution: solvedBasketballLeague(".notice-banner {\n  text-align: center;\n  margin-left: auto;\n}") },
  "basketball-league-margin-right": { estimatedMinutes: 4, solution: solvedBasketballLeague(".notice-banner {\n  text-align: center;\n  margin-left: auto;\n  margin-right: auto;\n}") },
  "basketball-league-max-width": { estimatedMinutes: 4, solution: solvedBasketballLeague(".notice-banner {\n  text-align: center;\n  margin-left: auto;\n  margin-right: auto;\n  max-width: 360px;\n}") },
  "basketball-league-padding": { estimatedMinutes: 4, solution: solvedBasketballLeague(".notice-banner {\n  text-align: center;\n  margin-left: auto;\n  margin-right: auto;\n  max-width: 360px;\n  padding: 16px;\n}") },
  "supply-list-display": { estimatedMinutes: 4, solution: solvedSupplyList(".price-row {\n  display: flex;\n}") },
  "supply-list-overflow": { estimatedMinutes: 4, solution: solvedSupplyList(".price-row {\n  display: flex;\n  overflow: hidden;\n}") },
  "supply-list-white-space": { estimatedMinutes: 4, solution: solvedSupplyList(".price-row {\n  display: flex;\n  overflow: hidden;\n  white-space: nowrap;\n}") },
  "supply-list-text-overflow": { estimatedMinutes: 4, solution: solvedSupplyList(".price-row {\n  display: flex;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}") },
  "supply-list-gap": { estimatedMinutes: 4, solution: solvedSupplyList(".price-row {\n  display: flex;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  gap: 8px;\n}") },
  "fare-table-position": { estimatedMinutes: 4, solution: solvedFareTable(".notice-banner {\n  position: relative;\n}") },
  "fare-table-padding-top": { estimatedMinutes: 4, solution: solvedFareTable(".notice-banner {\n  position: relative;\n  padding-top: 28px;\n}") },
  "fare-table-min-height": { estimatedMinutes: 4, solution: solvedFareTable(".notice-banner {\n  position: relative;\n  padding-top: 28px;\n  min-height: 80px;\n}") },
  "fare-table-background-color": { estimatedMinutes: 4, solution: solvedFareTable(".notice-banner {\n  position: relative;\n  padding-top: 28px;\n  min-height: 80px;\n  background-color: #eff6ff;\n}") },
  "fare-table-border-radius": { estimatedMinutes: 4, solution: solvedFareTable(".notice-banner {\n  position: relative;\n  padding-top: 28px;\n  min-height: 80px;\n  background-color: #eff6ff;\n  border-radius: 8px;\n}") },
  "order-slip-var-card-ink": { estimatedMinutes: 4, solution: solvedOrderSlip(".info-card {\n  --card-ink: #0f172a;\n}") },
  "order-slip-color": { estimatedMinutes: 4, solution: solvedOrderSlip(".info-card {\n  --card-ink: #0f172a;\n  color: var(--card-ink);\n}") },
  "order-slip-var-card-pad": { estimatedMinutes: 4, solution: solvedOrderSlip(".info-card {\n  --card-ink: #0f172a;\n  color: var(--card-ink);\n  --card-pad: 18px;\n}") },
  "order-slip-padding": { estimatedMinutes: 4, solution: solvedOrderSlip(".info-card {\n  --card-ink: #0f172a;\n  color: var(--card-ink);\n  --card-pad: 18px;\n  padding: var(--card-pad);\n}") },
  "order-slip-border-radius": { estimatedMinutes: 4, solution: solvedOrderSlip(".info-card {\n  --card-ink: #0f172a;\n  color: var(--card-ink);\n  --card-pad: 18px;\n  padding: var(--card-pad);\n  border-radius: 10px;\n}") },
  "refill-station-display": { estimatedMinutes: 4, solution: solvedRefillStation(".stall-grid {\n  display: grid;\n}") },
  "refill-station-grid-template-columns": { estimatedMinutes: 4, solution: solvedRefillStation(".stall-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n}") },
  "refill-station-gap": { estimatedMinutes: 4, solution: solvedRefillStation(".stall-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n}") },
  "refill-station-padding": { estimatedMinutes: 4, solution: solvedRefillStation(".stall-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n  padding: 12px;\n}") },
  "refill-station-background-color": { estimatedMinutes: 4, solution: solvedRefillStation(".stall-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n  padding: 12px;\n  background-color: #f1f5f9;\n}") },
  "clean-up-max-width": { estimatedMinutes: 4, solution: solvedCleanUp(".info-card {\n  max-width: 480px;\n}") },
  "clean-up-width": { estimatedMinutes: 4, solution: solvedCleanUp(".info-card {\n  max-width: 480px;\n  width: 100%;\n}") },
  "clean-up-padding": { estimatedMinutes: 4, solution: solvedCleanUp(".info-card {\n  max-width: 480px;\n  width: 100%;\n  padding: 16px;\n}") },
  "clean-up-font-size": { estimatedMinutes: 4, solution: solvedCleanUp(".info-card {\n  max-width: 480px;\n  width: 100%;\n  padding: 16px;\n  font-size: 16px;\n}") },
  "clean-up-box-sizing": { estimatedMinutes: 4, solution: solvedCleanUp(".info-card {\n  max-width: 480px;\n  width: 100%;\n  padding: 16px;\n  font-size: 16px;\n  box-sizing: border-box;\n}") },
  "shop-rate-background-color": { estimatedMinutes: 4, solution: solvedShopRate(".info-card {\n  background-color: #ffffff;\n}") },
  "shop-rate-border-radius": { estimatedMinutes: 4, solution: solvedShopRate(".info-card {\n  background-color: #ffffff;\n  border-radius: 10px;\n}") },
  "shop-rate-box-shadow": { estimatedMinutes: 4, solution: solvedShopRate(".info-card {\n  background-color: #ffffff;\n  border-radius: 10px;\n  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.2);\n}") },
  "shop-rate-padding": { estimatedMinutes: 4, solution: solvedShopRate(".info-card {\n  background-color: #ffffff;\n  border-radius: 10px;\n  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.2);\n  padding: 20px;\n}") },
  "shop-rate-border": { estimatedMinutes: 4, solution: solvedShopRate(".info-card {\n  background-color: #ffffff;\n  border-radius: 10px;\n  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.2);\n  padding: 20px;\n  border: 1px solid #e2e8f0;\n}") },
  "programme-alignment-text-align": { estimatedMinutes: 4, solution: solvedProgrammeAlignment(".notice-banner {\n  text-align: center;\n}") },
  "programme-alignment-margin-left": { estimatedMinutes: 4, solution: solvedProgrammeAlignment(".notice-banner {\n  text-align: center;\n  margin-left: auto;\n}") },
  "programme-alignment-margin-right": { estimatedMinutes: 4, solution: solvedProgrammeAlignment(".notice-banner {\n  text-align: center;\n  margin-left: auto;\n  margin-right: auto;\n}") },
  "programme-alignment-max-width": { estimatedMinutes: 4, solution: solvedProgrammeAlignment(".notice-banner {\n  text-align: center;\n  margin-left: auto;\n  margin-right: auto;\n  max-width: 360px;\n}") },
  "programme-alignment-padding": { estimatedMinutes: 4, solution: solvedProgrammeAlignment(".notice-banner {\n  text-align: center;\n  margin-left: auto;\n  margin-right: auto;\n  max-width: 360px;\n  padding: 16px;\n}") },
  "retailer-price-display": { estimatedMinutes: 4, solution: solvedRetailerPrice(".price-row {\n  display: flex;\n}") },
  "retailer-price-overflow": { estimatedMinutes: 4, solution: solvedRetailerPrice(".price-row {\n  display: flex;\n  overflow: hidden;\n}") },
  "retailer-price-white-space": { estimatedMinutes: 4, solution: solvedRetailerPrice(".price-row {\n  display: flex;\n  overflow: hidden;\n  white-space: nowrap;\n}") },
  "retailer-price-text-overflow": { estimatedMinutes: 4, solution: solvedRetailerPrice(".price-row {\n  display: flex;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}") },
  "retailer-price-gap": { estimatedMinutes: 4, solution: solvedRetailerPrice(".price-row {\n  display: flex;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  gap: 8px;\n}") },
  "shop-receipt-position": { estimatedMinutes: 4, solution: solvedShopReceipt(".notice-banner {\n  position: relative;\n}") },
  "shop-receipt-padding-top": { estimatedMinutes: 4, solution: solvedShopReceipt(".notice-banner {\n  position: relative;\n  padding-top: 28px;\n}") },
  "shop-receipt-min-height": { estimatedMinutes: 4, solution: solvedShopReceipt(".notice-banner {\n  position: relative;\n  padding-top: 28px;\n  min-height: 80px;\n}") },
  "shop-receipt-background-color": { estimatedMinutes: 4, solution: solvedShopReceipt(".notice-banner {\n  position: relative;\n  padding-top: 28px;\n  min-height: 80px;\n  background-color: #eff6ff;\n}") },
  "shop-receipt-border-radius": { estimatedMinutes: 4, solution: solvedShopReceipt(".notice-banner {\n  position: relative;\n  padding-top: 28px;\n  min-height: 80px;\n  background-color: #eff6ff;\n  border-radius: 8px;\n}") },
  "stock-list-var-card-ink": { estimatedMinutes: 4, solution: solvedStockList(".info-card {\n  --card-ink: #0f172a;\n}") },
  "stock-list-color": { estimatedMinutes: 4, solution: solvedStockList(".info-card {\n  --card-ink: #0f172a;\n  color: var(--card-ink);\n}") },
  "stock-list-var-card-pad": { estimatedMinutes: 4, solution: solvedStockList(".info-card {\n  --card-ink: #0f172a;\n  color: var(--card-ink);\n  --card-pad: 18px;\n}") },
  "stock-list-padding": { estimatedMinutes: 4, solution: solvedStockList(".info-card {\n  --card-ink: #0f172a;\n  color: var(--card-ink);\n  --card-pad: 18px;\n  padding: var(--card-pad);\n}") },
  "stock-list-border-radius": { estimatedMinutes: 4, solution: solvedStockList(".info-card {\n  --card-ink: #0f172a;\n  color: var(--card-ink);\n  --card-pad: 18px;\n  padding: var(--card-pad);\n  border-radius: 10px;\n}") },
  "id-application-padding": { estimatedMinutes: 4, solution: solvedIdApplication(".info-card {\n  padding: 16px;\n}") },
  "id-application-background-color": { estimatedMinutes: 4, solution: solvedIdApplication(".info-card {\n  padding: 16px;\n  background-color: #ffffff;\n}") },
  "id-application-border-radius": { estimatedMinutes: 4, solution: solvedIdApplication(".info-card {\n  padding: 16px;\n  background-color: #ffffff;\n  border-radius: 12px;\n}") },
  "id-application-margin-bottom": { estimatedMinutes: 4, solution: solvedIdApplication(".info-card {\n  padding: 16px;\n  background-color: #ffffff;\n  border-radius: 12px;\n  margin-bottom: 24px;\n}") },
  "id-application-max-width": { estimatedMinutes: 4, solution: solvedIdApplication(".info-card {\n  padding: 16px;\n  background-color: #ffffff;\n  border-radius: 12px;\n  margin-bottom: 24px;\n  max-width: 400px;\n}") },
  "store-credit-border-left-width": { estimatedMinutes: 4, solution: solvedStoreCredit(".notice-banner {\n  border-left-width: 4px;\n}") },
  "store-credit-border-left-style": { estimatedMinutes: 4, solution: solvedStoreCredit(".notice-banner {\n  border-left-width: 4px;\n  border-left-style: solid;\n}") },
  "store-credit-border-left-color": { estimatedMinutes: 4, solution: solvedStoreCredit(".notice-banner {\n  border-left-width: 4px;\n  border-left-style: solid;\n  border-left-color: #b45309;\n}") },
  "store-credit-background-color": { estimatedMinutes: 4, solution: solvedStoreCredit(".notice-banner {\n  border-left-width: 4px;\n  border-left-style: solid;\n  border-left-color: #b45309;\n  background-color: #fffbeb;\n}") },
  "store-credit-padding-left": { estimatedMinutes: 4, solution: solvedStoreCredit(".notice-banner {\n  border-left-width: 4px;\n  border-left-style: solid;\n  border-left-color: #b45309;\n  background-color: #fffbeb;\n  padding-left: 16px;\n}") },
  "notice-typography-font-size": { estimatedMinutes: 4, solution: solvedNoticeTypography(".info-card {\n  font-size: 18px;\n}") },
  "notice-typography-line-height": { estimatedMinutes: 4, solution: solvedNoticeTypography(".info-card {\n  font-size: 18px;\n  line-height: 1.6;\n}") },
  "notice-typography-color": { estimatedMinutes: 4, solution: solvedNoticeTypography(".info-card {\n  font-size: 18px;\n  line-height: 1.6;\n  color: #1f2937;\n}") },
  "notice-typography-font-weight": { estimatedMinutes: 4, solution: solvedNoticeTypography(".info-card {\n  font-size: 18px;\n  line-height: 1.6;\n  color: #1f2937;\n  font-weight: 500;\n}") },
  "notice-typography-letter-spacing": { estimatedMinutes: 4, solution: solvedNoticeTypography(".info-card {\n  font-size: 18px;\n  line-height: 1.6;\n  color: #1f2937;\n  font-weight: 500;\n  letter-spacing: 0.2px;\n}") },
  "flex-row-display": { estimatedMinutes: 4, solution: solvedFlexRow(".price-row {\n  display: flex;\n}") },
  "flex-row-justify-content": { estimatedMinutes: 4, solution: solvedFlexRow(".price-row {\n  display: flex;\n  justify-content: space-between;\n}") },
  "flex-row-align-items": { estimatedMinutes: 4, solution: solvedFlexRow(".price-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}") },
  "flex-row-gap": { estimatedMinutes: 4, solution: solvedFlexRow(".price-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n}") },
  "flex-row-padding": { estimatedMinutes: 4, solution: solvedFlexRow(".price-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n  padding: 12px;\n}") },
  "price-list-display": { estimatedMinutes: 4, solution: solvedPriceList(".item-list {\n  display: flex;\n}") },
  "price-list-flex-direction": { estimatedMinutes: 4, solution: solvedPriceList(".item-list {\n  display: flex;\n  flex-direction: column;\n}") },
  "price-list-gap": { estimatedMinutes: 4, solution: solvedPriceList(".item-list {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}") },
  "price-list-background-color": { estimatedMinutes: 4, solution: solvedPriceList(".item-list {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  background-color: #f8fafc;\n}") },
  "price-list-padding": { estimatedMinutes: 4, solution: solvedPriceList(".item-list {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  background-color: #f8fafc;\n  padding: 16px;\n}") },
  "centre-notice-display": { estimatedMinutes: 4, solution: solvedCentreNotice(".stall-grid {\n  display: grid;\n}") },
  "centre-notice-grid-template-columns": { estimatedMinutes: 4, solution: solvedCentreNotice(".stall-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n}") },
  "centre-notice-gap": { estimatedMinutes: 4, solution: solvedCentreNotice(".stall-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n}") },
  "centre-notice-padding": { estimatedMinutes: 4, solution: solvedCentreNotice(".stall-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n  padding: 12px;\n}") },
  "centre-notice-background-color": { estimatedMinutes: 4, solution: solvedCentreNotice(".stall-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n  padding: 12px;\n  background-color: #f1f5f9;\n}") },
  "board-responsive-max-width": { estimatedMinutes: 4, solution: solvedBoardResponsive(".info-card {\n  max-width: 480px;\n}") },
  "board-responsive-width": { estimatedMinutes: 4, solution: solvedBoardResponsive(".info-card {\n  max-width: 480px;\n  width: 100%;\n}") },
  "board-responsive-padding": { estimatedMinutes: 4, solution: solvedBoardResponsive(".info-card {\n  max-width: 480px;\n  width: 100%;\n  padding: 16px;\n}") },
  "board-responsive-font-size": { estimatedMinutes: 4, solution: solvedBoardResponsive(".info-card {\n  max-width: 480px;\n  width: 100%;\n  padding: 16px;\n  font-size: 16px;\n}") },
  "board-responsive-box-sizing": { estimatedMinutes: 4, solution: solvedBoardResponsive(".info-card {\n  max-width: 480px;\n  width: 100%;\n  padding: 16px;\n  font-size: 16px;\n  box-sizing: border-box;\n}") },
  "stall-sign-background-color": { estimatedMinutes: 4, solution: solvedStallSign(".info-card {\n  background-color: #ffffff;\n}") },
  "stall-sign-border-radius": { estimatedMinutes: 4, solution: solvedStallSign(".info-card {\n  background-color: #ffffff;\n  border-radius: 10px;\n}") },
  "stall-sign-box-shadow": { estimatedMinutes: 4, solution: solvedStallSign(".info-card {\n  background-color: #ffffff;\n  border-radius: 10px;\n  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.2);\n}") },
  "stall-sign-padding": { estimatedMinutes: 4, solution: solvedStallSign(".info-card {\n  background-color: #ffffff;\n  border-radius: 10px;\n  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.2);\n  padding: 20px;\n}") },
  "stall-sign-border": { estimatedMinutes: 4, solution: solvedStallSign(".info-card {\n  background-color: #ffffff;\n  border-radius: 10px;\n  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.2);\n  padding: 20px;\n  border: 1px solid #e2e8f0;\n}") },
  "menu-alignment-text-align": { estimatedMinutes: 4, solution: solvedMenuAlignment(".notice-banner {\n  text-align: center;\n}") },
  "menu-alignment-margin-left": { estimatedMinutes: 4, solution: solvedMenuAlignment(".notice-banner {\n  text-align: center;\n  margin-left: auto;\n}") },
  "menu-alignment-margin-right": { estimatedMinutes: 4, solution: solvedMenuAlignment(".notice-banner {\n  text-align: center;\n  margin-left: auto;\n  margin-right: auto;\n}") },
  "menu-alignment-max-width": { estimatedMinutes: 4, solution: solvedMenuAlignment(".notice-banner {\n  text-align: center;\n  margin-left: auto;\n  margin-right: auto;\n  max-width: 360px;\n}") },
  "menu-alignment-padding": { estimatedMinutes: 4, solution: solvedMenuAlignment(".notice-banner {\n  text-align: center;\n  margin-left: auto;\n  margin-right: auto;\n  max-width: 360px;\n  padding: 16px;\n}") },
  "league-schedule-display": { estimatedMinutes: 4, solution: solvedLeagueSchedule(".price-row {\n  display: flex;\n}") },
  "league-schedule-overflow": { estimatedMinutes: 4, solution: solvedLeagueSchedule(".price-row {\n  display: flex;\n  overflow: hidden;\n}") },
  "league-schedule-white-space": { estimatedMinutes: 4, solution: solvedLeagueSchedule(".price-row {\n  display: flex;\n  overflow: hidden;\n  white-space: nowrap;\n}") },
  "league-schedule-text-overflow": { estimatedMinutes: 4, solution: solvedLeagueSchedule(".price-row {\n  display: flex;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}") },
  "league-schedule-gap": { estimatedMinutes: 4, solution: solvedLeagueSchedule(".price-row {\n  display: flex;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  gap: 8px;\n}") },
  "list-position-position": { estimatedMinutes: 4, solution: solvedListPosition(".notice-banner {\n  position: relative;\n}") },
  "list-position-padding-top": { estimatedMinutes: 4, solution: solvedListPosition(".notice-banner {\n  position: relative;\n  padding-top: 28px;\n}") },
  "list-position-min-height": { estimatedMinutes: 4, solution: solvedListPosition(".notice-banner {\n  position: relative;\n  padding-top: 28px;\n  min-height: 80px;\n}") },
  "list-position-background-color": { estimatedMinutes: 4, solution: solvedListPosition(".notice-banner {\n  position: relative;\n  padding-top: 28px;\n  min-height: 80px;\n  background-color: #eff6ff;\n}") },
  "list-position-border-radius": { estimatedMinutes: 4, solution: solvedListPosition(".notice-banner {\n  position: relative;\n  padding-top: 28px;\n  min-height: 80px;\n  background-color: #eff6ff;\n  border-radius: 8px;\n}") },
  "custom-properties-var-card-ink": { estimatedMinutes: 4, solution: solvedCustomProperties(".info-card {\n  --card-ink: #0f172a;\n}") },
  "custom-properties-color": { estimatedMinutes: 4, solution: solvedCustomProperties(".info-card {\n  --card-ink: #0f172a;\n  color: var(--card-ink);\n}") },
  "custom-properties-var-card-pad": { estimatedMinutes: 4, solution: solvedCustomProperties(".info-card {\n  --card-ink: #0f172a;\n  color: var(--card-ink);\n  --card-pad: 18px;\n}") },
  "custom-properties-padding": { estimatedMinutes: 4, solution: solvedCustomProperties(".info-card {\n  --card-ink: #0f172a;\n  color: var(--card-ink);\n  --card-pad: 18px;\n  padding: var(--card-pad);\n}") },
  "custom-properties-border-radius": { estimatedMinutes: 4, solution: solvedCustomProperties(".info-card {\n  --card-ink: #0f172a;\n  color: var(--card-ink);\n  --card-pad: 18px;\n  padding: var(--card-pad);\n  border-radius: 10px;\n}") },
  "box-spacing-padding": { estimatedMinutes: 4, solution: solvedBoxSpacing(".info-card {\n  padding: 16px;\n}") },
  "box-spacing-background-color": { estimatedMinutes: 4, solution: solvedBoxSpacing(".info-card {\n  padding: 16px;\n  background-color: #ffffff;\n}") },
  "box-spacing-border-radius": { estimatedMinutes: 4, solution: solvedBoxSpacing(".info-card {\n  padding: 16px;\n  background-color: #ffffff;\n  border-radius: 12px;\n}") },
  "box-spacing-margin-bottom": { estimatedMinutes: 4, solution: solvedBoxSpacing(".info-card {\n  padding: 16px;\n  background-color: #ffffff;\n  border-radius: 12px;\n  margin-bottom: 24px;\n}") },
  "box-spacing-max-width": { estimatedMinutes: 4, solution: solvedBoxSpacing(".info-card {\n  padding: 16px;\n  background-color: #ffffff;\n  border-radius: 12px;\n  margin-bottom: 24px;\n  max-width: 400px;\n}") },
  "station-notice-border-left-width": { estimatedMinutes: 4, solution: solvedStationNotice(".notice-banner {\n  border-left-width: 4px;\n}") },
  "station-notice-border-left-style": { estimatedMinutes: 4, solution: solvedStationNotice(".notice-banner {\n  border-left-width: 4px;\n  border-left-style: solid;\n}") },
  "station-notice-border-left-color": { estimatedMinutes: 4, solution: solvedStationNotice(".notice-banner {\n  border-left-width: 4px;\n  border-left-style: solid;\n  border-left-color: #b45309;\n}") },
  "station-notice-background-color": { estimatedMinutes: 4, solution: solvedStationNotice(".notice-banner {\n  border-left-width: 4px;\n  border-left-style: solid;\n  border-left-color: #b45309;\n  background-color: #fffbeb;\n}") },
  "station-notice-padding-left": { estimatedMinutes: 4, solution: solvedStationNotice(".notice-banner {\n  border-left-width: 4px;\n  border-left-style: solid;\n  border-left-color: #b45309;\n  background-color: #fffbeb;\n  padding-left: 16px;\n}") },
  "up-announcement-font-size": { estimatedMinutes: 4, solution: solvedUpAnnouncement(".info-card {\n  font-size: 18px;\n}") },
  "up-announcement-line-height": { estimatedMinutes: 4, solution: solvedUpAnnouncement(".info-card {\n  font-size: 18px;\n  line-height: 1.6;\n}") },
  "up-announcement-color": { estimatedMinutes: 4, solution: solvedUpAnnouncement(".info-card {\n  font-size: 18px;\n  line-height: 1.6;\n  color: #1f2937;\n}") },
  "up-announcement-font-weight": { estimatedMinutes: 4, solution: solvedUpAnnouncement(".info-card {\n  font-size: 18px;\n  line-height: 1.6;\n  color: #1f2937;\n  font-weight: 500;\n}") },
  "up-announcement-letter-spacing": { estimatedMinutes: 4, solution: solvedUpAnnouncement(".info-card {\n  font-size: 18px;\n  line-height: 1.6;\n  color: #1f2937;\n  font-weight: 500;\n  letter-spacing: 0.2px;\n}") },
  "rate-card-display": { estimatedMinutes: 4, solution: solvedRateCard(".price-row {\n  display: flex;\n}") },
  "rate-card-justify-content": { estimatedMinutes: 4, solution: solvedRateCard(".price-row {\n  display: flex;\n  justify-content: space-between;\n}") },
  "rate-card-align-items": { estimatedMinutes: 4, solution: solvedRateCard(".price-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}") },
  "rate-card-gap": { estimatedMinutes: 4, solution: solvedRateCard(".price-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n}") },
  "rate-card-padding": { estimatedMinutes: 4, solution: solvedRateCard(".price-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n  padding: 12px;\n}") },
  "flex-column-display": { estimatedMinutes: 4, solution: solvedFlexColumn(".item-list {\n  display: flex;\n}") },
  "flex-column-flex-direction": { estimatedMinutes: 4, solution: solvedFlexColumn(".item-list {\n  display: flex;\n  flex-direction: column;\n}") },
  "flex-column-gap": { estimatedMinutes: 4, solution: solvedFlexColumn(".item-list {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}") },
  "flex-column-background-color": { estimatedMinutes: 4, solution: solvedFlexColumn(".item-list {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  background-color: #f8fafc;\n}") },
  "flex-column-padding": { estimatedMinutes: 4, solution: solvedFlexColumn(".item-list {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  background-color: #f8fafc;\n  padding: 16px;\n}") },
  "price-board-background-color": { estimatedMinutes: 4, solution: solvedPriceBoard(".notice-banner {\n  background-color: #ecfdf5;\n}") },
  "price-board-background-image": { estimatedMinutes: 4, solution: solvedPriceBoard(".notice-banner {\n  background-color: #ecfdf5;\n  background-image: linear-gradient(#ecfdf5, #d1fae5);\n}") },
  "price-board-background-clip": { estimatedMinutes: 4, solution: solvedPriceBoard(".notice-banner {\n  background-color: #ecfdf5;\n  background-image: linear-gradient(#ecfdf5, #d1fae5);\n  background-clip: padding-box;\n}") },
  "price-board-padding": { estimatedMinutes: 4, solution: solvedPriceBoard(".notice-banner {\n  background-color: #ecfdf5;\n  background-image: linear-gradient(#ecfdf5, #d1fae5);\n  background-clip: padding-box;\n  padding: 18px;\n}") },
  "price-board-border-radius": { estimatedMinutes: 4, solution: solvedPriceBoard(".notice-banner {\n  background-color: #ecfdf5;\n  background-image: linear-gradient(#ecfdf5, #d1fae5);\n  background-clip: padding-box;\n  padding: 18px;\n  border-radius: 8px;\n}") },
  "receipt-units-font-size": { estimatedMinutes: 4, solution: solvedReceiptUnits(".info-card {\n  font-size: 1rem;\n}") },
  "receipt-units-padding": { estimatedMinutes: 4, solution: solvedReceiptUnits(".info-card {\n  font-size: 1rem;\n  padding: 1.25rem;\n}") },
  "receipt-units-max-width": { estimatedMinutes: 4, solution: solvedReceiptUnits(".info-card {\n  font-size: 1rem;\n  padding: 1.25rem;\n  max-width: 30rem;\n}") },
  "receipt-units-line-height": { estimatedMinutes: 4, solution: solvedReceiptUnits(".info-card {\n  font-size: 1rem;\n  padding: 1.25rem;\n  max-width: 30rem;\n  line-height: 1.5;\n}") },
  "receipt-units-border-radius": { estimatedMinutes: 4, solution: solvedReceiptUnits(".info-card {\n  font-size: 1rem;\n  padding: 1.25rem;\n  max-width: 30rem;\n  line-height: 1.5;\n  border-radius: 0.5rem;\n}") },
  "list-styling-list-style-type": { estimatedMinutes: 4, solution: solvedListStyling(".item-list {\n  list-style-type: none;\n}") },
  "list-styling-padding-left": { estimatedMinutes: 4, solution: solvedListStyling(".item-list {\n  list-style-type: none;\n  padding-left: 0px;\n}") },
  "list-styling-background-color": { estimatedMinutes: 4, solution: solvedListStyling(".item-list {\n  list-style-type: none;\n  padding-left: 0px;\n  background-color: #f8fafc;\n}") },
  "list-styling-border-radius": { estimatedMinutes: 4, solution: solvedListStyling(".item-list {\n  list-style-type: none;\n  padding-left: 0px;\n  background-color: #f8fafc;\n  border-radius: 8px;\n}") },
  "list-styling-padding-top": { estimatedMinutes: 4, solution: solvedListStyling(".item-list {\n  list-style-type: none;\n  padding-left: 0px;\n  background-color: #f8fafc;\n  border-radius: 8px;\n  padding-top: 12px;\n}") },
  "application-notice-padding": { estimatedMinutes: 4, solution: solvedApplicationNotice(".price-row {\n  padding: 12px;\n}") },
  "application-notice-cursor": { estimatedMinutes: 4, solution: solvedApplicationNotice(".price-row {\n  padding: 12px;\n  cursor: pointer;\n}") },
  "application-notice-transition-property": { estimatedMinutes: 4, solution: solvedApplicationNotice(".price-row {\n  padding: 12px;\n  cursor: pointer;\n  transition-property: background-color;\n}") },
  "application-notice-transition-duration": { estimatedMinutes: 4, solution: solvedApplicationNotice(".price-row {\n  padding: 12px;\n  cursor: pointer;\n  transition-property: background-color;\n  transition-duration: 150ms;\n}") },
  "application-notice-transition-timing-function": { estimatedMinutes: 4, solution: solvedApplicationNotice(".price-row {\n  padding: 12px;\n  cursor: pointer;\n  transition-property: background-color;\n  transition-duration: 150ms;\n  transition-timing-function: ease-out;\n}") },
  "credit-reminder-display": { estimatedMinutes: 4, solution: solvedCreditReminder(".stall-grid {\n  display: grid;\n}") },
  "credit-reminder-grid-template-columns": { estimatedMinutes: 4, solution: solvedCreditReminder(".stall-grid {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n}") },
  "credit-reminder-row-gap": { estimatedMinutes: 4, solution: solvedCreditReminder(".stall-grid {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  row-gap: 10px;\n}") },
  "credit-reminder-column-gap": { estimatedMinutes: 4, solution: solvedCreditReminder(".stall-grid {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  row-gap: 10px;\n  column-gap: 16px;\n}") },
  "credit-reminder-align-items": { estimatedMinutes: 4, solution: solvedCreditReminder(".stall-grid {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  row-gap: 10px;\n  column-gap: 16px;\n  align-items: stretch;\n}") },
  "opacity-layer-padding": { estimatedMinutes: 4, solution: solvedOpacityLayer(".notice-banner {\n  padding: 16px;\n}") },
  "opacity-layer-opacity": { estimatedMinutes: 4, solution: solvedOpacityLayer(".notice-banner {\n  padding: 16px;\n  opacity: 0.95;\n}") },
  "opacity-layer-z-index": { estimatedMinutes: 4, solution: solvedOpacityLayer(".notice-banner {\n  padding: 16px;\n  opacity: 0.95;\n  z-index: 10;\n}") },
  "opacity-layer-position": { estimatedMinutes: 4, solution: solvedOpacityLayer(".notice-banner {\n  padding: 16px;\n  opacity: 0.95;\n  z-index: 10;\n  position: relative;\n}") },
  "opacity-layer-background-color": { estimatedMinutes: 4, solution: solvedOpacityLayer(".notice-banner {\n  padding: 16px;\n  opacity: 0.95;\n  z-index: 10;\n  position: relative;\n  background-color: #fef2f2;\n}") },
  "text-detail-text-transform": { estimatedMinutes: 4, solution: solvedTextDetail(".info-card {\n  text-transform: uppercase;\n}") },
  "text-detail-font-style": { estimatedMinutes: 4, solution: solvedTextDetail(".info-card {\n  text-transform: uppercase;\n  font-style: normal;\n}") },
  "text-detail-text-decoration-line": { estimatedMinutes: 4, solution: solvedTextDetail(".info-card {\n  text-transform: uppercase;\n  font-style: normal;\n  text-decoration-line: underline;\n}") },
  "text-detail-text-indent": { estimatedMinutes: 4, solution: solvedTextDetail(".info-card {\n  text-transform: uppercase;\n  font-style: normal;\n  text-decoration-line: underline;\n  text-indent: 8px;\n}") },
  "text-detail-word-spacing": { estimatedMinutes: 4, solution: solvedTextDetail(".info-card {\n  text-transform: uppercase;\n  font-style: normal;\n  text-decoration-line: underline;\n  text-indent: 8px;\n  word-spacing: 1px;\n}") },
  "sizing-limits-min-width": { estimatedMinutes: 4, solution: solvedSizingLimits(".info-card {\n  min-width: 240px;\n}") },
  "sizing-limits-max-width": { estimatedMinutes: 4, solution: solvedSizingLimits(".info-card {\n  min-width: 240px;\n  max-width: 520px;\n}") },
  "sizing-limits-min-height": { estimatedMinutes: 4, solution: solvedSizingLimits(".info-card {\n  min-width: 240px;\n  max-width: 520px;\n  min-height: 120px;\n}") },
  "sizing-limits-box-sizing": { estimatedMinutes: 4, solution: solvedSizingLimits(".info-card {\n  min-width: 240px;\n  max-width: 520px;\n  min-height: 120px;\n  box-sizing: border-box;\n}") },
  "sizing-limits-padding": { estimatedMinutes: 4, solution: solvedSizingLimits(".info-card {\n  min-width: 240px;\n  max-width: 520px;\n  min-height: 120px;\n  box-sizing: border-box;\n  padding: 20px;\n}") },
  "centre-backgrounds-background-color": { estimatedMinutes: 4, solution: solvedCentreBackgrounds(".notice-banner {\n  background-color: #ecfdf5;\n}") },
  "centre-backgrounds-background-image": { estimatedMinutes: 4, solution: solvedCentreBackgrounds(".notice-banner {\n  background-color: #ecfdf5;\n  background-image: linear-gradient(#ecfdf5, #d1fae5);\n}") },
  "centre-backgrounds-background-clip": { estimatedMinutes: 4, solution: solvedCentreBackgrounds(".notice-banner {\n  background-color: #ecfdf5;\n  background-image: linear-gradient(#ecfdf5, #d1fae5);\n  background-clip: padding-box;\n}") },
  "centre-backgrounds-padding": { estimatedMinutes: 4, solution: solvedCentreBackgrounds(".notice-banner {\n  background-color: #ecfdf5;\n  background-image: linear-gradient(#ecfdf5, #d1fae5);\n  background-clip: padding-box;\n  padding: 18px;\n}") },
  "centre-backgrounds-border-radius": { estimatedMinutes: 4, solution: solvedCentreBackgrounds(".notice-banner {\n  background-color: #ecfdf5;\n  background-image: linear-gradient(#ecfdf5, #d1fae5);\n  background-clip: padding-box;\n  padding: 18px;\n  border-radius: 8px;\n}") },
  "board-units-font-size": { estimatedMinutes: 4, solution: solvedBoardUnits(".info-card {\n  font-size: 1rem;\n}") },
  "board-units-padding": { estimatedMinutes: 4, solution: solvedBoardUnits(".info-card {\n  font-size: 1rem;\n  padding: 1.25rem;\n}") },
  "board-units-max-width": { estimatedMinutes: 4, solution: solvedBoardUnits(".info-card {\n  font-size: 1rem;\n  padding: 1.25rem;\n  max-width: 30rem;\n}") },
  "board-units-line-height": { estimatedMinutes: 4, solution: solvedBoardUnits(".info-card {\n  font-size: 1rem;\n  padding: 1.25rem;\n  max-width: 30rem;\n  line-height: 1.5;\n}") },
  "board-units-border-radius": { estimatedMinutes: 4, solution: solvedBoardUnits(".info-card {\n  font-size: 1rem;\n  padding: 1.25rem;\n  max-width: 30rem;\n  line-height: 1.5;\n  border-radius: 0.5rem;\n}") },
  "stall-2-list-style-type": { estimatedMinutes: 4, solution: solvedStall2(".item-list {\n  list-style-type: none;\n}") },
  "stall-2-padding-left": { estimatedMinutes: 4, solution: solvedStall2(".item-list {\n  list-style-type: none;\n  padding-left: 0px;\n}") },
  "stall-2-background-color": { estimatedMinutes: 4, solution: solvedStall2(".item-list {\n  list-style-type: none;\n  padding-left: 0px;\n  background-color: #f8fafc;\n}") },
  "stall-2-border-radius": { estimatedMinutes: 4, solution: solvedStall2(".item-list {\n  list-style-type: none;\n  padding-left: 0px;\n  background-color: #f8fafc;\n  border-radius: 8px;\n}") },
  "stall-2-padding-top": { estimatedMinutes: 4, solution: solvedStall2(".item-list {\n  list-style-type: none;\n  padding-left: 0px;\n  background-color: #f8fafc;\n  border-radius: 8px;\n  padding-top: 12px;\n}") },
  "hover-state-padding": { estimatedMinutes: 4, solution: solvedHoverState(".price-row {\n  padding: 12px;\n}") },
  "hover-state-cursor": { estimatedMinutes: 4, solution: solvedHoverState(".price-row {\n  padding: 12px;\n  cursor: pointer;\n}") },
  "hover-state-transition-property": { estimatedMinutes: 4, solution: solvedHoverState(".price-row {\n  padding: 12px;\n  cursor: pointer;\n  transition-property: background-color;\n}") },
  "hover-state-transition-duration": { estimatedMinutes: 4, solution: solvedHoverState(".price-row {\n  padding: 12px;\n  cursor: pointer;\n  transition-property: background-color;\n  transition-duration: 150ms;\n}") },
  "hover-state-transition-timing-function": { estimatedMinutes: 4, solution: solvedHoverState(".price-row {\n  padding: 12px;\n  cursor: pointer;\n  transition-property: background-color;\n  transition-duration: 150ms;\n  transition-timing-function: ease-out;\n}") },
  "grid-repeat-display": { estimatedMinutes: 4, solution: solvedGridRepeat(".stall-grid {\n  display: grid;\n}") },
  "grid-repeat-grid-template-columns": { estimatedMinutes: 4, solution: solvedGridRepeat(".stall-grid {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n}") },
  "grid-repeat-row-gap": { estimatedMinutes: 4, solution: solvedGridRepeat(".stall-grid {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  row-gap: 10px;\n}") },
  "grid-repeat-column-gap": { estimatedMinutes: 4, solution: solvedGridRepeat(".stall-grid {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  row-gap: 10px;\n  column-gap: 16px;\n}") },
  "grid-repeat-align-items": { estimatedMinutes: 4, solution: solvedGridRepeat(".stall-grid {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  row-gap: 10px;\n  column-gap: 16px;\n  align-items: stretch;\n}") },
  "list-2-padding": { estimatedMinutes: 4, solution: solvedList2(".notice-banner {\n  padding: 16px;\n}") },
  "list-2-opacity": { estimatedMinutes: 4, solution: solvedList2(".notice-banner {\n  padding: 16px;\n  opacity: 0.95;\n}") },
  "list-2-z-index": { estimatedMinutes: 4, solution: solvedList2(".notice-banner {\n  padding: 16px;\n  opacity: 0.95;\n  z-index: 10;\n}") },
  "list-2-position": { estimatedMinutes: 4, solution: solvedList2(".notice-banner {\n  padding: 16px;\n  opacity: 0.95;\n  z-index: 10;\n  position: relative;\n}") },
  "list-2-background-color": { estimatedMinutes: 4, solution: solvedList2(".notice-banner {\n  padding: 16px;\n  opacity: 0.95;\n  z-index: 10;\n  position: relative;\n  background-color: #fef2f2;\n}") },
  "table-2-text-transform": { estimatedMinutes: 4, solution: solvedTable2(".info-card {\n  text-transform: uppercase;\n}") },
  "table-2-font-style": { estimatedMinutes: 4, solution: solvedTable2(".info-card {\n  text-transform: uppercase;\n  font-style: normal;\n}") },
  "table-2-text-decoration-line": { estimatedMinutes: 4, solution: solvedTable2(".info-card {\n  text-transform: uppercase;\n  font-style: normal;\n  text-decoration-line: underline;\n}") },
  "table-2-text-indent": { estimatedMinutes: 4, solution: solvedTable2(".info-card {\n  text-transform: uppercase;\n  font-style: normal;\n  text-decoration-line: underline;\n  text-indent: 8px;\n}") },
  "table-2-word-spacing": { estimatedMinutes: 4, solution: solvedTable2(".info-card {\n  text-transform: uppercase;\n  font-style: normal;\n  text-decoration-line: underline;\n  text-indent: 8px;\n  word-spacing: 1px;\n}") },
} satisfies Record<string, StepReference>;

const PROJECT_ID = "jeepney-route-card";
const PROJECT_2_ID = "sari-sari-receipt";
const PROJECT_3_ID = "turo-turo-order-row";
const PROJECT_4_ID = "barangay-notice-banner";
const PROJECT_5_ID = "palengke-produce-grid";
const PROJECT_6_ID = "emergency-help-link";
const PROJECT_7_ID = "barangay-request-form";
const PROJECT_8_ID = "barangay-service-cards";
const PROJECT_9_ID = "palengke-price-columns";
const PROJECT_10_ID = "barangay-holiday-theme";
const PROJECT_11_ID = "barangay-alert-motion";
const PROJECT_12_ID = "barangay-announcement-heading";
const PROJECT_13_ID = "barangay-announcement-link";
const PROJECT_14_ID = "turo-turo-order-button";
const PROJECT_15_ID = "barangay-service-status";
const PROJECT_16_ID = "barangay-focus-link";
const PROJECT_17_ID = "barangay-print-notice";
const PROJECT_18_ID = "barangay-night-notice";
const PROJECT_19_ID = "sari-sari-store";
const PROJECT_20_ID = "barangay-curfew-notice";
const PROJECT_21_ID = "jeepney-terminal-timetable";
const PROJECT_22_ID = "sari-sari-store-price";
const PROJECT_23_ID = "barangay-health-centre";
const PROJECT_24_ID = "jeepney-route-board";
const PROJECT_25_ID = "palengke-fish-stall";
const PROJECT_26_ID = "turo-turo-menu";
const PROJECT_27_ID = "barangay-basketball-league";
const PROJECT_28_ID = "school-supply-list";
const PROJECT_29_ID = "tricycle-fare-table";
const PROJECT_30_ID = "bakery-order-slip";
const PROJECT_31_ID = "water-refill-station";
const PROJECT_32_ID = "barangay-clean-up";
const PROJECT_33_ID = "computer-shop-rate";
const PROJECT_34_ID = "fiesta-programme-alignment";
const PROJECT_35_ID = "rice-retailer-price";
const PROJECT_36_ID = "laundry-shop-receipt";
const PROJECT_37_ID = "pharmacy-stock-list";
const PROJECT_38_ID = "barangay-id-application";
const PROJECT_39_ID = "sari-sari-store-credit";
const PROJECT_40_ID = "barangay-curfew-notice-typography";
const PROJECT_41_ID = "jeepney-terminal-timetable-flex-row";
const PROJECT_42_ID = "sari-sari-store-price-list";
const PROJECT_43_ID = "barangay-health-centre-notice";
const PROJECT_44_ID = "jeepney-route-board-responsive";
const PROJECT_45_ID = "palengke-fish-stall-sign";
const PROJECT_46_ID = "turo-turo-menu-alignment";
const PROJECT_47_ID = "barangay-basketball-league-schedule";
const PROJECT_48_ID = "school-supply-list-position";
const PROJECT_49_ID = "tricycle-fare-table-custom-properties";
const PROJECT_50_ID = "bakery-order-slip-box-spacing";
const PROJECT_51_ID = "water-refill-station-notice";
const PROJECT_52_ID = "barangay-clean-up-announcement";
const PROJECT_53_ID = "computer-shop-rate-card";
const PROJECT_54_ID = "fiesta-programme-flex-column";
const PROJECT_55_ID = "rice-retailer-price-board";
const PROJECT_56_ID = "laundry-shop-receipt-units";
const PROJECT_57_ID = "pharmacy-stock-list-list-styling";
const PROJECT_58_ID = "barangay-id-application-notice";
const PROJECT_59_ID = "sari-sari-store-credit-reminder";
const PROJECT_60_ID = "barangay-curfew-notice-opacity-layer";
const PROJECT_61_ID = "jeepney-terminal-timetable-text-detail";
const PROJECT_62_ID = "sari-sari-store-sizing-limits";
const PROJECT_63_ID = "barangay-health-centre-backgrounds";
const PROJECT_64_ID = "jeepney-route-board-units";
const PROJECT_65_ID = "palengke-fish-stall-2";
const PROJECT_66_ID = "turo-turo-menu-hover-state";
const PROJECT_67_ID = "barangay-basketball-league-grid-repeat";
const PROJECT_68_ID = "school-supply-list-2";
const PROJECT_69_ID = "tricycle-fare-table-2";

const s = (step: Omit<Step, "index" | "kind" | "projectId">): Step => {
  const reference = references[step.id as keyof typeof references];
  if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`);
  return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_ID };
};
const s2 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_2_ID }; };
const s3 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_3_ID }; };
const s4 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_4_ID }; };
const s5 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_5_ID }; };
const s6 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_6_ID }; };
const s7 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_7_ID }; };
const s8 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_8_ID }; };
const s9 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_9_ID }; };
const s10 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_10_ID }; };
const s11 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_11_ID }; };
const s12 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_12_ID }; };
const s13 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_13_ID }; };
const s14 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_14_ID }; };
const s15 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_15_ID }; };
const s16 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_16_ID }; };
const s17 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_17_ID }; };
const s18 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_18_ID }; };

const s19 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_19_ID }; };

const s20 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_20_ID }; };

const s21 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_21_ID }; };

const s22 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_22_ID }; };

const s23 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_23_ID }; };

const s24 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_24_ID }; };

const s25 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_25_ID }; };

const s26 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_26_ID }; };

const s27 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_27_ID }; };

const s28 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_28_ID }; };

const s29 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_29_ID }; };

const s30 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_30_ID }; };

const s31 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_31_ID }; };

const s32 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_32_ID }; };

const s33 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_33_ID }; };

const s34 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_34_ID }; };

const s35 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_35_ID }; };

const s36 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_36_ID }; };

const s37 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_37_ID }; };

const s38 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_38_ID }; };

const s39 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_39_ID }; };

const s40 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_40_ID }; };

const s41 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_41_ID }; };

const s42 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_42_ID }; };

const s43 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_43_ID }; };

const s44 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_44_ID }; };

const s45 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_45_ID }; };

const s46 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_46_ID }; };

const s47 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_47_ID }; };

const s48 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_48_ID }; };

const s49 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_49_ID }; };

const s50 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_50_ID }; };

const s51 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_51_ID }; };

const s52 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_52_ID }; };

const s53 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_53_ID }; };

const s54 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_54_ID }; };

const s55 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_55_ID }; };

const s56 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_56_ID }; };

const s57 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_57_ID }; };

const s58 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_58_ID }; };

const s59 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_59_ID }; };

const s60 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_60_ID }; };

const s61 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_61_ID }; };

const s62 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_62_ID }; };

const s63 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_63_ID }; };

const s64 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_64_ID }; };

const s65 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_65_ID }; };

const s66 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_66_ID }; };

const s67 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_67_ID }; };

const s68 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_68_ID }; };

const s69 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => { const reference = references[step.id as keyof typeof references]; if (!reference) throw new Error(`Missing reference data for CSS step: ${step.id}`); return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_69_ID }; };

export const cssCourse: Course = {
  id: "css-basics",
  order: 2,
  title: "Learn CSS by Building a Jeepney Route Card",
  project: "Jeepney Route Card",
  projects: [{ id: PROJECT_ID, title: "Jeepney Route Card" }, { id: PROJECT_2_ID, title: "Sari-Sari Receipt" }, { id: PROJECT_3_ID, title: "Turo-Turo Order Row" }, { id: PROJECT_4_ID, title: "Barangay Notice Banner" }, { id: PROJECT_5_ID, title: "Palengke Produce Grid" }, { id: PROJECT_6_ID, title: "Emergency Help Link" }, { id: PROJECT_7_ID, title: "Barangay Request Form" }, { id: PROJECT_8_ID, title: "Barangay Service Cards" }, { id: PROJECT_9_ID, title: "Palengke Price Columns" }, { id: PROJECT_10_ID, title: "Barangay Holiday Theme" }, { id: PROJECT_11_ID, title: "Barangay Alert Motion" }, { id: PROJECT_12_ID, title: "Barangay Announcement Heading" }, { id: PROJECT_13_ID, title: "Barangay Announcement Link" }, { id: PROJECT_14_ID, title: "Turo-Turo Order Button" }, { id: PROJECT_15_ID, title: "Barangay Service Status" }, { id: PROJECT_16_ID, title: "Barangay Focus Link" }, { id: PROJECT_17_ID, title: "Barangay Print Notice" }, { id: PROJECT_18_ID, title: "Barangay Night Notice" }, { id: PROJECT_19_ID, title: "Sari Sari Store" }, { id: PROJECT_20_ID, title: "Barangay Curfew Notice" }, { id: PROJECT_21_ID, title: "Jeepney Terminal Timetable" }, { id: PROJECT_22_ID, title: "Sari Sari Store Price" }, { id: PROJECT_23_ID, title: "Barangay Health Centre" }, { id: PROJECT_24_ID, title: "Jeepney Route Board" }, { id: PROJECT_25_ID, title: "Palengke Fish Stall" }, { id: PROJECT_26_ID, title: "Turo Turo Menu" }, { id: PROJECT_27_ID, title: "Barangay Basketball League" }, { id: PROJECT_28_ID, title: "School Supply List" }, { id: PROJECT_29_ID, title: "Tricycle Fare Table" }, { id: PROJECT_30_ID, title: "Bakery Order Slip" }, { id: PROJECT_31_ID, title: "Water Refill Station" }, { id: PROJECT_32_ID, title: "Barangay Clean Up" }, { id: PROJECT_33_ID, title: "Computer Shop Rate" }, { id: PROJECT_34_ID, title: "Fiesta Programme Alignment" }, { id: PROJECT_35_ID, title: "Rice Retailer Price" }, { id: PROJECT_36_ID, title: "Laundry Shop Receipt" }, { id: PROJECT_37_ID, title: "Pharmacy Stock List" }, { id: PROJECT_38_ID, title: "Barangay ID Application" }, { id: PROJECT_39_ID, title: "Sari Sari Store Credit" }, { id: PROJECT_40_ID, title: "Barangay Curfew Notice Typography" }, { id: PROJECT_41_ID, title: "Jeepney Terminal Timetable Flex Row" }, { id: PROJECT_42_ID, title: "Sari Sari Store Price List" }, { id: PROJECT_43_ID, title: "Barangay Health Centre Notice" }, { id: PROJECT_44_ID, title: "Jeepney Route Board Responsive" }, { id: PROJECT_45_ID, title: "Palengke Fish Stall Sign" }, { id: PROJECT_46_ID, title: "Turo Turo Menu Alignment" }, { id: PROJECT_47_ID, title: "Barangay Basketball League Schedule" }, { id: PROJECT_48_ID, title: "School Supply List Position" }, { id: PROJECT_49_ID, title: "Tricycle Fare Table Custom Properties" }, { id: PROJECT_50_ID, title: "Bakery Order Slip Box Spacing" }, { id: PROJECT_51_ID, title: "Water Refill Station Notice" }, { id: PROJECT_52_ID, title: "Barangay Clean Up Announcement" }, { id: PROJECT_53_ID, title: "Computer Shop Rate Card" }, { id: PROJECT_54_ID, title: "Fiesta Programme Flex Column" }, { id: PROJECT_55_ID, title: "Rice Retailer Price Board" }, { id: PROJECT_56_ID, title: "Laundry Shop Receipt Units" }, { id: PROJECT_57_ID, title: "Pharmacy Stock List List Styling" }, { id: PROJECT_58_ID, title: "Barangay ID Application Notice" }, { id: PROJECT_59_ID, title: "Sari Sari Store Credit Reminder" }, { id: PROJECT_60_ID, title: "Barangay Curfew Notice Opacity Layer" }, { id: PROJECT_61_ID, title: "Jeepney Terminal Timetable Text Detail" }, { id: PROJECT_62_ID, title: "Sari Sari Store Sizing Limits" }, { id: PROJECT_63_ID, title: "Barangay Health Centre Backgrounds" }, { id: PROJECT_64_ID, title: "Jeepney Route Board Units" }, { id: PROJECT_65_ID, title: "Palengke Fish Stall 2" }, { id: PROJECT_66_ID, title: "Turo Turo Menu Hover State" }, { id: PROJECT_67_ID, title: "Barangay Basketball League Grid Repeat" }, { id: PROJECT_68_ID, title: "School Supply List 2" }, { id: PROJECT_69_ID, title: "Tricycle Fare Table 2" }],
  kind: "web",
  requires: ["html-basics"],
  summary: "Now make it look good. Colours, spacing, fonts, and layout.",
  steps: [
    s({
      id: "first-rule",
      task: "Make the page light grey. Type #f4f4f5 after the colon.",
      inputMode: "guided",
      files: { "index.html": HTML, "styles.css": css("body {\n  background-color: ;\n}") },
      activeFile: "styles.css",
      highlightToken: "background-color: ;",
      conceptIds: ["selector"],
      tests: [
        {
          id: "body-bg",
          kind: "style",
          selector: "body",
          prop: "background-color",
          equals: "rgb(244, 244, 245)",
          readable: "light grey",
          label: "The page is light grey",
        },
      ],
      hints: [
        {
          level: 1,
          text: "A rule is: what to change, then a colon, then the value, then a semicolon.",
        },
      ],
      xp: 40,
    }),
    s({
      id: "class-selector",
      task: "Make the card white. A dot means class, so .card picks the box with class=\"card\".",
      inputMode: "guided",
      files: {
        "index.html": HTML,
        "styles.css": css("body {\n  background-color: #f4f4f5;\n}\n\n"),
      },
      activeFile: "styles.css",
      conceptIds: ["class"],
      tests: [
        {
          id: "card-bg",
          kind: "style",
          selector: ".card",
          prop: "background-color",
          equals: "rgb(255, 255, 255)",
          readable: "white",
          label: "The card is white",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Write .card then curly braces, then the rule inside.",
        },
      ],
      xp: 50,
    }),
    s({
      id: "padding",
      task: "The words are touching the edges. Push them in with 24 pixels of padding.",
      inputMode: "guided",
      files: {
        "index.html": HTML,
        "styles.css": css(
          "body {\n  background-color: #f4f4f5;\n}\n\n.card {\n  background-color: white;\n}",
        ),
      },
      activeFile: "styles.css",
      highlightToken: "background-color: white;",
      conceptIds: ["box-model"],
      tests: [
        {
          id: "card-padding",
          kind: "style",
          selector: ".card",
          prop: "padding-top",
          equals: "24px",
          readable: "24 pixels",
          label: "The card has space inside",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Padding is space inside the box. Margin is space outside it.",
        },
      ],
      xp: 50,
    }),
    s({
      id: "radius-shadow",
      task: "Round the card corners by 12 pixels.",
      inputMode: "guided",
      files: {
        "index.html": HTML,
        "styles.css": css(
          "body {\n  background-color: #f4f4f5;\n}\n\n.card {\n  background-color: white;\n  padding: 24px;\n}",
        ),
      },
      activeFile: "styles.css",
      tests: [
        {
          id: "card-radius",
          kind: "style",
          selector: ".card",
          prop: "border-radius",
          equals: "12px",
          readable: "12 pixels",
          label: "The card has round corners",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Bigger number, rounder corners.",
        },
      ],
      xp: 50,
    }),
    s({
      id: "font-size",
      task: "Make the route name big. Change 16 to 32.",
      inputMode: "guided",
      files: {
        "index.html": HTML,
        "styles.css": css(
          ".card {\n  background-color: white;\n  padding: 24px;\n  border-radius: 12px;\n}\n\n.route {\n  font-size: 16px;\n}",
        ),
      },
      activeFile: "styles.css",
      highlightToken: "16px",
      tests: [
        {
          id: "route-size",
          kind: "style",
          selector: ".route",
          prop: "font-size",
          equals: "32px",
          readable: "32 pixels",
          label: "The route name is big",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Only the number changes. Leave px alone.",
        },
      ],
      xp: 50,
    }),
    s({
      id: "colour",
      task: "Make the fare teal so it stands out. Use the colour teal.",
      inputMode: "guided",
      files: {
        "index.html": HTML,
        "styles.css": css(
          ".card {\n  background-color: white;\n  padding: 24px;\n}\n\n.route {\n  font-size: 32px;\n}\n\n.fare {\n}",
        ),
      },
      activeFile: "styles.css",
      highlightToken: ".fare {",
      tests: [
        {
          id: "fare-colour",
          kind: "style",
          selector: ".fare",
          prop: "color",
          equals: "rgb(0, 128, 128)",
          readable: "teal",
          label: "The fare is teal",
        },
      ],
      hints: [
        {
          level: 1,
          text: "color changes the words. background-color changes behind them.",
        },
      ],
      xp: 50,
    }),
    s({
      id: "font-weight",
      task: "Make the fare bold.",
      inputMode: "guided",
      files: {
        "index.html": HTML,
        "styles.css": css(
          ".card {\n  padding: 24px;\n}\n\n.route {\n  font-size: 32px;\n}\n\n.fare {\n  color: teal;\n}",
        ),
      },
      activeFile: "styles.css",
      tests: [
        {
          id: "fare-bold",
          kind: "style",
          selector: ".fare",
          prop: "font-weight",
          equals: "700",
          readable: "bold",
          label: "The fare is bold",
        },
      ],
      hints: [
        {
          level: 1,
          text: "font-weight: bold;",
        },
      ],
      xp: 50,
    }),
    s({
      id: "max-width-centre",
      task: "Stop the card from stretching. Make it 360 pixels wide at most.",
      inputMode: "guided",
      files: {
        "index.html": HTML,
        "styles.css": css(
          ".card {\n  background-color: white;\n  padding: 24px;\n  border-radius: 12px;\n}",
        ),
      },
      activeFile: "styles.css",
      tests: [
        {
          id: "card-maxw",
          kind: "style",
          selector: ".card",
          prop: "max-width",
          equals: "360px",
          readable: "360 pixels",
          label: "The card is not too wide",
        },
      ],
      hints: [
        {
          level: 1,
          text: "max-width means never wider than this.",
        },
      ],
      xp: 60,
    }),
    s({
      id: "list-style",
      task: "Remove the bullet points from the stops list.",
      inputMode: "guided",
      files: {
        "index.html": HTML,
        "styles.css": css(".card {\n  padding: 24px;\n}\n\n.stops {\n}"),
      },
      activeFile: "styles.css",
      highlightToken: ".stops {",
      tests: [
        {
          id: "stops-nobullet",
          kind: "style",
          selector: ".stops",
          prop: "list-style-type",
          equals: "none",
          readable: "no bullets",
          label: "The bullets are gone",
        },
      ],
      hints: [
        {
          level: 1,
          text: "list-style-type: none;",
        },
      ],
      xp: 60,
    }),
    s({
      id: "flex-row",
      task: "Put the stops side by side instead of stacked. Use display: flex on the list.",
      inputMode: "guided",
      files: {
        "index.html": HTML,
        "styles.css": css(
          ".card {\n  padding: 24px;\n}\n\n.stops {\n  list-style-type: none;\n}",
        ),
      },
      activeFile: "styles.css",
      tests: [
        {
          id: "stops-flex",
          kind: "style",
          selector: ".stops",
          prop: "display",
          equals: "flex",
          readable: "flex",
          label: "The stops sit side by side",
        },
      ],
      hints: [
        {
          level: 1,
          text: "flex lays children out in a row by default.",
        },
      ],
      xp: 70,
    }),
    s({
      id: "gap",
      task: "The stops are squashed together. Put 12 pixels of gap between them.",
      inputMode: "guided",
      files: {
        "index.html": HTML,
        "styles.css": css(
          ".stops {\n  list-style-type: none;\n  display: flex;\n}",
        ),
      },
      activeFile: "styles.css",
      tests: [
        {
          id: "stops-gap",
          kind: "style",
          selector: ".stops",
          prop: "column-gap",
          equals: "12px",
          readable: "12 pixels",
          label: "There is space between stops",
        },
      ],
      hints: [
        {
          level: 1,
          text: "gap: 12px; is easier than putting margin on every item.",
        },
      ],
      xp: 70,
    }),
    s({
      id: "hover",
      task: "Last one. Make the card lift when the mouse is over it. Add a rule for .card:hover with a teal border.",
      inputMode: "guided",
      files: {
        "index.html": HTML,
        "styles.css": css(
          ".card {\n  background-color: white;\n  padding: 24px;\n  border-radius: 12px;\n  border: 2px solid transparent;\n}\n\n",
        ),
      },
      activeFile: "styles.css",
      tests: [
        {
          id: "hover-rule",
          kind: "source-matches",
          file: "styles.css",
          pattern: "\\.card:hover\\s*\\{[^}]*border",
          flags: "s",
          because: "You need a rule that starts with .card:hover and sets a border.",
          label: "The card reacts to the mouse",
        },
      ],
      hints: [
        {
          level: 1,
          text: ":hover means while the mouse is on it.",
        },
        {
          level: 2,
          text: ".card:hover {\n  border: 2px solid teal;\n}",
        },
      ],
      xp: 100,
    }),
    s2({ id: "receipt-background", task: "Make the receipt white.", inputMode: "guided", files: solvedReceipt(".receipt {\n  background-color: ;\n}"), activeFile: "styles.css", highlightToken: "background-color: ;", tests: [{ id: "receipt-bg", kind: "style", selector: ".receipt", prop: "background-color", equals: "rgb(255, 255, 255)", readable: "white", label: "The receipt is white" }], hints: [{ level: 1, text: "Write white after the colon." }], xp: 40 }),
    s2({ id: "receipt-padding", task: "Add 16 pixels inside the receipt.", inputMode: "guided", files: solvedReceipt(".receipt {\n  background-color: white;\n}"), activeFile: "styles.css", tests: [{ id: "receipt-padding-set", kind: "style", selector: ".receipt", prop: "padding-top", equals: "16px", readable: "16 pixels", label: "The receipt has inside space" }], hints: [{ level: 1, text: "Add padding inside the receipt rule." }], xp: 40 }),
    s2({ id: "receipt-border", task: "Give the receipt a thin grey border.", inputMode: "guided", files: solvedReceipt(".receipt {\n  background-color: white;\n  padding: 16px;\n}"), activeFile: "styles.css", tests: [{ id: "receipt-border-set", kind: "source-matches", file: "styles.css", pattern: "border\\s*:\\s*1px\\s+solid\\s+#d4d4d8", flags: "i", because: "Use a one-pixel solid border with the grey colour.", label: "The receipt has a border" }], hints: [{ level: 1, text: "Add a border line inside the receipt rule." }], xp: 40 }),
    s2({ id: "receipt-total", task: "Make the total bold.", inputMode: "guided", files: solvedReceipt(".total {\n  font-weight: ;\n}"), activeFile: "styles.css", highlightToken: "font-weight: ;", tests: [{ id: "receipt-total-bold", kind: "style", selector: ".total", prop: "font-weight", equals: "700", readable: "bold", label: "The total is bold" }], hints: [{ level: 1, text: "Write bold after the colon." }], xp: 40 }),
    s2({ id: "receipt-width", task: "Keep the receipt from getting too wide. Make it 360 pixels wide at most.", inputMode: "guided", files: solvedReceipt(".receipt {\n  background-color: white;\n  padding: 16px;\n  border: 1px solid #d4d4d8;\n}"), activeFile: "styles.css", tests: [{ id: "receipt-max-width-set", kind: "style", selector: ".receipt", prop: "max-width", equals: "360px", readable: "360 pixels", label: "The receipt is not too wide" }], hints: [{ level: 1, text: "Add max-width inside the receipt rule." }], xp: 50 }),
    s2({ id: "receipt-centre", task: "Put equal empty space on both sides of the receipt.", inputMode: "guided", files: solvedReceipt(".receipt {\n  background-color: white;\n  padding: 16px;\n  border: 1px solid #d4d4d8;\n  max-width: 360px;\n}"), activeFile: "styles.css", conceptIds: ["margin-property"], tests: [{ id: "receipt-centred", kind: "source-matches", file: "styles.css", pattern: "margin\\s*:\\s*0\\s+auto", flags: "i", because: "Use 0 for top and bottom, then auto for the sides.", label: "The receipt is centred" }], hints: [{ level: 1, text: "Write 0 auto after margin." }], xp: 60 }),
    s2({ id: "receipt-title-colour", task: "Make the receipt title teal.", inputMode: "guided", files: solvedReceipt("h1 {\n  color: ;\n}"), activeFile: "styles.css", highlightToken: "color: ;", tests: [{ id: "receipt-title-teal", kind: "style", selector: "h1", prop: "color", equals: "rgb(0, 128, 128)", readable: "teal", label: "The title is teal" }], hints: [{ level: 1, text: "Write teal after the colon." }], xp: 40 }),
    s3({ id: "meal-flex", task: "Put the food and price on one row.", inputMode: "guided", files: solvedMeal(".meal {\n  display: ;\n}"), activeFile: "styles.css", highlightToken: "display: ;", conceptIds: ["flex-container"], tests: [{ id: "meal-is-flex", kind: "style", selector: ".meal", prop: "display", equals: "flex", readable: "flex", label: "The food and price share a row" }], hints: [{ level: 1, text: "Write flex after the colon." }], xp: 60 }),
    s3({ id: "meal-spread", task: "Push the food left and the price right.", inputMode: "guided", files: solvedMeal(".meal {\n  display: flex;\n  justify-content: ;\n}"), activeFile: "styles.css", highlightToken: "justify-content: ;", conceptIds: ["justify-content"], tests: [{ id: "meal-space-between", kind: "style", selector: ".meal", prop: "justify-content", equals: "space-between", readable: "space between", label: "The food and price spread apart" }], hints: [{ level: 1, text: "Write space-between after the colon." }], xp: 60 }),
    s3({ id: "meal-align", task: "Line up the food and price in the middle vertically.", inputMode: "guided", files: solvedMeal(".meal {\n  display: flex;\n  justify-content: space-between;\n  align-items: ;\n}"), activeFile: "styles.css", highlightToken: "align-items: ;", conceptIds: ["align-items"], tests: [{ id: "meal-items-centred", kind: "style", selector: ".meal", prop: "align-items", equals: "center", readable: "centred", label: "The food and price line up" }], hints: [{ level: 1, text: "Write center after the colon." }], xp: 60 }),
    s3({ id: "meal-padding", task: "Give each order row 12 pixels of space inside.", inputMode: "guided", files: solvedMeal(".meal {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}"), activeFile: "styles.css", tests: [{ id: "meal-padding-set", kind: "style", selector: ".meal", prop: "padding-top", equals: "12px", readable: "12 pixels", label: "The row has inside space" }], hints: [{ level: 1, text: "Add padding inside the meal rule." }], xp: 40 }),
    s3({ id: "meal-border", task: "Draw a thin line below the order row.", inputMode: "guided", files: solvedMeal(".meal {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 12px;\n}"), activeFile: "styles.css", tests: [{ id: "meal-bottom-border", kind: "source-matches", file: "styles.css", pattern: "border-bottom\\s*:\\s*1px\\s+solid\\s+#d4d4d8", flags: "i", because: "Use a one-pixel solid bottom border with the grey colour.", label: "The row has a bottom line" }], hints: [{ level: 1, text: "Add a border-bottom line inside the meal rule." }], xp: 40 }),
    s3({ id: "meal-price-weight", task: "Make the price bold.", inputMode: "guided", files: solvedMeal(".price {\n  font-weight: ;\n}"), activeFile: "styles.css", highlightToken: "font-weight: ;", tests: [{ id: "meal-price-bold", kind: "style", selector: ".price", prop: "font-weight", equals: "700", readable: "bold", label: "The price is bold" }], hints: [{ level: 1, text: "Write bold after the colon." }], xp: 40 }),
    s4({ id: "notice-background", task: "Give the water notice a dark teal background.", inputMode: "guided", files: solvedNotice(".notice {\n  background-color: ;\n}"), activeFile: "styles.css", highlightToken: "background-color: ;", tests: [{ id: "notice-dark-teal", kind: "style", selector: ".notice", prop: "background-color", equals: "rgb(15, 118, 110)", readable: "dark teal", label: "The notice is dark teal" }], hints: [{ level: 1, text: "Write #0f766e after the colon." }], xp: 40 }),
    s4({ id: "notice-colour", task: "Make the notice words white.", inputMode: "guided", files: solvedNotice(".notice {\n  background-color: #0f766e;\n  color: ;\n}"), activeFile: "styles.css", highlightToken: "color: ;", tests: [{ id: "notice-white-text", kind: "style", selector: ".notice", prop: "color", equals: "rgb(255, 255, 255)", readable: "white", label: "The notice text is white" }], hints: [{ level: 1, text: "Write white after the colon." }], xp: 40 }),
    s4({ id: "notice-padding", task: "Put 16 pixels of space inside the notice.", inputMode: "guided", files: solvedNotice(".notice {\n  background-color: #0f766e;\n  color: white;\n}"), activeFile: "styles.css", tests: [{ id: "notice-padding-set", kind: "style", selector: ".notice", prop: "padding-top", equals: "16px", readable: "16 pixels", label: "The notice has inside space" }], hints: [{ level: 1, text: "Add padding inside the notice rule." }], xp: 40 }),
    s4({ id: "notice-line-height", task: "Give the notice words more room from top to bottom.", inputMode: "guided", files: solvedNotice(".notice {\n  background-color: #0f766e;\n  color: white;\n  padding: 16px;\n  line-height: ;\n}"), activeFile: "styles.css", highlightToken: "line-height: ;", conceptIds: ["line-height"], tests: [{ id: "notice-line-height-set", kind: "style", selector: ".notice", prop: "line-height", equals: "24px", readable: "one and a half times the text size", label: "The notice lines have room" }], hints: [{ level: 1, text: "Write 1.5 after the colon." }], xp: 60 }),
    s4({ id: "notice-radius", task: "Soften the notice corners with 8 pixels of rounding.", inputMode: "guided", files: solvedNotice(".notice {\n  background-color: #0f766e;\n  color: white;\n  padding: 16px;\n  line-height: 1.5;\n  border-radius: ;\n}"), activeFile: "styles.css", highlightToken: "border-radius: ;", tests: [{ id: "notice-radius-set", kind: "style", selector: ".notice", prop: "border-top-left-radius", equals: "8px", readable: "8 pixels", label: "The corners are rounded" }], hints: [{ level: 1, text: "Write 8px after the colon." }], xp: 40 }),
    s5({ id: "stalls-grid", task: "Put the produce stalls in a grid.", inputMode: "guided", files: solvedStalls(".stalls {\n  display: ;\n}"), activeFile: "styles.css", highlightToken: "display: ;", conceptIds: ["grid-container"], tests: [{ id: "stalls-is-grid", kind: "style", selector: ".stalls", prop: "display", equals: "grid", readable: "grid", label: "The stalls use a grid" }], hints: [{ level: 1, text: "Write grid after the colon." }], xp: 60 }),
    s5({ id: "stalls-columns", task: "Show two equal stall columns.", inputMode: "guided", files: solvedStalls(".stalls {\n  display: grid;\n  grid-template-columns: ;\n}"), activeFile: "styles.css", highlightToken: "grid-template-columns: ;", conceptIds: ["grid-template-columns"], tests: [{ id: "stalls-two-columns", kind: "source-matches", file: "styles.css", pattern: "grid-template-columns\\s*:\\s*repeat\\(\\s*2\\s*,\\s*1fr\\s*\\)", flags: "i", because: "Use two equal fractions for the two columns.", label: "The stalls have two equal columns" }], hints: [{ level: 1, text: "Write repeat(2, 1fr) after the colon." }], xp: 60 }),
    s5({ id: "stalls-gap", task: "Leave 12 pixels between the stalls.", inputMode: "guided", files: solvedStalls(".stalls {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n}"), activeFile: "styles.css", tests: [{ id: "stalls-gap-set", kind: "style", selector: ".stalls", prop: "column-gap", equals: "12px", readable: "12 pixels", label: "The stalls have space between them" }], hints: [{ level: 1, text: "Add gap inside the stalls rule." }], xp: 40 }),
    s5({ id: "stall-background", task: "Make each stall white.", inputMode: "guided", files: solvedStalls(".stall {\n  background-color: ;\n}"), activeFile: "styles.css", highlightToken: "background-color: ;", tests: [{ id: "stall-white", kind: "style", selector: ".stall", prop: "background-color", equals: "rgb(255, 255, 255)", readable: "white", label: "Each stall is white" }], hints: [{ level: 1, text: "Write white after the colon." }], xp: 40 }),
    s5({ id: "stall-padding", task: "Add 12 pixels inside each stall.", inputMode: "guided", files: solvedStalls(".stall {\n  background-color: white;\n}"), activeFile: "styles.css", tests: [{ id: "stall-padding-set", kind: "style", selector: ".stall", prop: "padding-top", equals: "12px", readable: "12 pixels", label: "Each stall has inside space" }], hints: [{ level: 1, text: "Add padding inside the stall rule." }], xp: 40 }),
    s5({ id: "stalls-wide-columns", task: "On a wide screen, show three stall columns.", inputMode: "guided", files: solvedStalls(".stalls {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n}\n\n@media (min-width: 640px) {\n  .stalls {\n    grid-template-columns: ;\n  }\n}"), activeFile: "styles.css", highlightToken: "grid-template-columns: ;", conceptIds: ["media-query"], tests: [{ id: "stalls-wide-grid", kind: "source-matches", file: "styles.css", pattern: "@media\\s*\\(\\s*min-width\\s*:\\s*640px\\s*\\)[^{]*\\{[\\s\\S]*?grid-template-columns\\s*:\\s*repeat\\(\\s*3\\s*,\\s*1fr\\s*\\)", flags: "i", because: "Use three equal fractions inside the wide-screen rule.", label: "Wide screens show three stalls" }], hints: [{ level: 1, text: "Write repeat(3, 1fr) after the colon." }], xp: 80 }),
    s6({ id: "help-inline-block", task: "Let the help link have a box shape.", inputMode: "guided", files: solvedHelp(".help-link {\n  display: ;\n}"), activeFile: "styles.css", highlightToken: "display: ;", conceptIds: ["inline-block"], tests: [{ id: "help-is-inline-block", kind: "style", selector: ".help-link", prop: "display", equals: "inline-block", readable: "inline block", label: "The link can have a box shape" }], hints: [{ level: 1, text: "Write inline-block after the colon." }], xp: 50 }),
    s6({ id: "help-background", task: "Make the emergency link red.", inputMode: "guided", files: solvedHelp(".help-link {\n  display: inline-block;\n  background-color: ;\n}"), activeFile: "styles.css", highlightToken: "background-color: ;", tests: [{ id: "help-red", kind: "style", selector: ".help-link", prop: "background-color", equals: "rgb(185, 28, 28)", readable: "red", label: "The help link is red" }], hints: [{ level: 1, text: "Write #b91c1c after the colon." }], xp: 40 }),
    s6({ id: "help-colour", task: "Make the link words white.", inputMode: "guided", files: solvedHelp(".help-link {\n  display: inline-block;\n  background-color: #b91c1c;\n  color: ;\n}"), activeFile: "styles.css", highlightToken: "color: ;", tests: [{ id: "help-white-text", kind: "style", selector: ".help-link", prop: "color", equals: "rgb(255, 255, 255)", readable: "white", label: "The link words are white" }], hints: [{ level: 1, text: "Write white after the colon." }], xp: 40 }),
    s6({ id: "help-padding", task: "Add 12 pixels inside the help link.", inputMode: "guided", files: solvedHelp(".help-link {\n  display: inline-block;\n  background-color: #b91c1c;\n  color: white;\n}"), activeFile: "styles.css", tests: [{ id: "help-padding-set", kind: "style", selector: ".help-link", prop: "padding-top", equals: "12px", readable: "12 pixels", label: "The link has inside space" }], hints: [{ level: 1, text: "Add padding inside the help-link rule." }], xp: 40 }),
    s6({ id: "help-focus", task: "Make the keyboard focus easy to see.", inputMode: "guided", files: solvedHelp(".help-link {\n  display: inline-block;\n  background-color: #b91c1c;\n  color: white;\n  padding: 12px;\n}\n\n.help-link:focus-visible {\n  outline: ;\n}"), activeFile: "styles.css", highlightToken: "outline: ;", conceptIds: ["focus-visible"], tests: [{ id: "help-focus-outline", kind: "source-matches", file: "styles.css", pattern: "\\.help-link:focus-visible\\s*\\{[^}]*outline\\s*:\\s*3px\\s+solid\\s+#111827", flags: "is", because: "Use the focus-visible rule and a 3-pixel dark outline.", label: "Keyboard focus is visible" }], hints: [{ level: 1, text: "Write 3px solid #111827 after the colon." }], xp: 80 }),
    s7({ id: "form-width", task: "Stop the request form from stretching too wide.", inputMode: "guided", files: solvedForm(".request-form {\n  max-width: ;\n}"), activeFile: "styles.css", highlightToken: "max-width: ;", tests: [{ id: "form-max-width", kind: "style", selector: ".request-form", prop: "max-width", equals: "360px", readable: "360 pixels", label: "The form is not too wide" }], hints: [{ level: 1, text: "Write 360px after the colon." }], xp: 40 }),
    s7({ id: "field-width", task: "Make both fields fill the form width.", inputMode: "guided", files: solvedForm("input,\ntextarea {\n  width: ;\n}"), activeFile: "styles.css", highlightToken: "width: ;", tests: [{ id: "fields-full-width", kind: "source-matches", file: "styles.css", pattern: "input\\s*,\\s*textarea\\s*\\{[^}]*width\\s*:\\s*100%", flags: "is", because: "Use the shared field rule with a 100% width.", label: "Both fields fill the form" }], hints: [{ level: 1, text: "Write 100% after the colon." }], xp: 50 }),
    s7({ id: "field-box-sizing", task: "Keep padding inside the full-width fields.", inputMode: "guided", files: solvedForm("input,\ntextarea {\n  width: 100%;\n  box-sizing: ;\n}"), activeFile: "styles.css", highlightToken: "box-sizing: ;", conceptIds: ["box-sizing"], tests: [{ id: "input-box-sizing", kind: "style", selector: "input", prop: "box-sizing", equals: "border-box", readable: "border box", label: "Input padding stays inside" }, { id: "textarea-box-sizing", kind: "style", selector: "textarea", prop: "box-sizing", equals: "border-box", readable: "border box", label: "Text box padding stays inside" }], hints: [{ level: 1, text: "Write border-box after the colon." }], xp: 60 }),
    s7({ id: "field-padding", task: "Add 8 pixels of room inside both fields.", inputMode: "guided", files: solvedForm("input,\ntextarea {\n  width: 100%;\n  box-sizing: border-box;\n}"), activeFile: "styles.css", tests: [{ id: "input-padding", kind: "style", selector: "input", prop: "padding-top", equals: "8px", readable: "8 pixels", label: "The input has inside room" }, { id: "textarea-padding", kind: "style", selector: "textarea", prop: "padding-top", equals: "8px", readable: "8 pixels", label: "The text box has inside room" }], hints: [{ level: 1, text: "Add padding inside the field rule." }], xp: 40 }),
    s7({ id: "field-border", task: "Give both fields a clear thin grey border.", inputMode: "guided", files: solvedForm("input,\ntextarea {\n  width: 100%;\n  box-sizing: border-box;\n  padding: 8px;\n}"), activeFile: "styles.css", tests: [{ id: "field-border", kind: "source-matches", file: "styles.css", pattern: "input\\s*,\\s*textarea\\s*\\{[^}]*border\\s*:\\s*1px\\s+solid\\s+#71717a", flags: "is", because: "Use the shared field rule with a one-pixel solid grey border.", label: "Both fields have a border" }], hints: [{ level: 1, text: "Add a border line inside the shared field rule." }], xp: 40 }),
    s8({ id: "services-flex", task: "Put the service cards side by side.", inputMode: "guided", files: solvedServices(".services {\n  display: ;\n}"), activeFile: "styles.css", highlightToken: "display: ;", tests: [{ id: "services-is-flex", kind: "style", selector: ".services", prop: "display", equals: "flex", readable: "flex", label: "The cards share a row" }], hints: [{ level: 1, text: "Write flex after the colon." }], xp: 50 }),
    s8({ id: "services-gap", task: "Leave 12 pixels between the cards.", inputMode: "guided", files: solvedServices(".services {\n  display: flex;\n}"), activeFile: "styles.css", tests: [{ id: "services-gap-set", kind: "style", selector: ".services", prop: "column-gap", equals: "12px", readable: "12 pixels", label: "Cards have space between them" }], hints: [{ level: 1, text: "Add gap inside the services rule." }], xp: 40 }),
    s8({ id: "services-wrap", task: "Let cards move to a new line when space runs out.", inputMode: "guided", files: solvedServices(".services {\n  display: flex;\n  gap: 12px;\n  flex-wrap: ;\n}"), activeFile: "styles.css", highlightToken: "flex-wrap: ;", conceptIds: ["flex-wrap"], tests: [{ id: "services-can-wrap", kind: "style", selector: ".services", prop: "flex-wrap", equals: "wrap", readable: "wrap", label: "Cards can move to a new line" }], hints: [{ level: 1, text: "Write wrap after the colon." }], xp: 60 }),
    s8({ id: "service-grow", task: "Let every card take an equal share of free space.", inputMode: "guided", files: solvedServices(".service {\n  flex: ;\n}"), activeFile: "styles.css", highlightToken: "flex: ;", conceptIds: ["flex-grow"], tests: [{ id: "service-flexes", kind: "style", selector: ".service", prop: "flex-grow", equals: "1", readable: "one share", label: "Cards share open space" }], hints: [{ level: 1, text: "Write 1 after the colon." }], xp: 60 }),
    s8({ id: "service-min-width", task: "Keep cards at least 160 pixels wide.", inputMode: "guided", files: solvedServices(".service {\n  flex: 1;\n  min-width: ;\n}"), activeFile: "styles.css", highlightToken: "min-width: ;", tests: [{ id: "service-min-width-set", kind: "style", selector: ".service", prop: "min-width", equals: "160px", readable: "160 pixels", label: "Cards have a minimum width" }], hints: [{ level: 1, text: "Write 160px after the colon." }], xp: 40 }),
    s8({ id: "service-surface", task: "Give each service card white space and a white surface.", inputMode: "guided", files: solvedServices(".service {\n  flex: 1;\n  min-width: 160px;\n  padding: ;\n  background-color: ;\n}"), activeFile: "styles.css", highlightToken: "padding: ;", tests: [{ id: "service-padding-set", kind: "style", selector: ".service", prop: "padding-top", equals: "12px", readable: "12 pixels", label: "Cards have inside room" }, { id: "service-white", kind: "style", selector: ".service", prop: "background-color", equals: "rgb(255, 255, 255)", readable: "white", label: "Cards are white" }], hints: [{ level: 1, text: "Fill both blanks: 12px, then white." }], xp: 50 }),
    s9({ id: "price-row-flex", task: "Put each food name and price on one row.", inputMode: "guided", files: solvedPrices(".price-row {\n  display: ;\n}"), activeFile: "styles.css", highlightToken: "display: ;", tests: [{ id: "price-row-is-flex", kind: "style", selector: ".price-row", prop: "display", equals: "flex", readable: "flex", label: "Names and prices share a row" }], hints: [{ level: 1, text: "Write flex after the colon." }], xp: 50 }),
    s9({ id: "price-row-between", task: "Keep names left and prices right.", inputMode: "guided", files: solvedPrices(".price-row {\n  display: flex;\n  justify-content: ;\n}"), activeFile: "styles.css", highlightToken: "justify-content: ;", tests: [{ id: "price-row-spread", kind: "style", selector: ".price-row", prop: "justify-content", equals: "space-between", readable: "space between", label: "Names and prices spread apart" }], hints: [{ level: 1, text: "Write space-between after the colon." }], xp: 50 }),
    s9({ id: "price-row-padding", task: "Give each price row room above and below.", inputMode: "guided", files: solvedPrices(".price-row {\n  display: flex;\n  justify-content: space-between;\n  padding: ;\n}"), activeFile: "styles.css", highlightToken: "padding: ;", tests: [{ id: "price-row-padding-set", kind: "style", selector: ".price-row", prop: "padding-top", equals: "8px", readable: "8 pixels", label: "Rows have vertical room" }], hints: [{ level: 1, text: "Write 8px 0 after the colon." }], xp: 40 }),
    s9({ id: "price-align", task: "Line up the price numbers to the right.", inputMode: "guided", files: solvedPrices("dd {\n  text-align: ;\n}"), activeFile: "styles.css", highlightToken: "text-align: ;", conceptIds: ["text-align"], tests: [{ id: "price-text-right", kind: "style", selector: "dd", prop: "text-align", equals: "right", readable: "right", label: "Prices line up on the right" }], hints: [{ level: 1, text: "Write right after the colon." }], xp: 60 }),
    s9({ id: "price-numbers", task: "Use numbers that line up cleanly in a price list.", inputMode: "guided", files: solvedPrices("dd {\n  text-align: right;\n  font-variant-numeric: ;\n}"), activeFile: "styles.css", highlightToken: "font-variant-numeric: ;", conceptIds: ["tabular-numbers"], tests: [{ id: "price-tabular-numbers", kind: "style", selector: "dd", prop: "font-variant-numeric", equals: "tabular-nums", readable: "tabular numbers", label: "Price digits line up" }], hints: [{ level: 1, text: "Write tabular-nums after the colon." }], xp: 60 }),
    s10({ id: "theme-value", task: "Name the barangay teal colour once.", inputMode: "guided", files: solvedTheme(":root {\n  --barangay-teal: ;\n}"), activeFile: "styles.css", highlightToken: "--barangay-teal: ;", conceptIds: ["css-custom-property"], tests: [{ id: "theme-value-set", kind: "source-matches", file: "styles.css", pattern: "--barangay-teal\\s*:\\s*#0f766e", flags: "i", because: "Give the named colour its teal value.", label: "The teal value has a name" }], hints: [{ level: 1, text: "Write #0f766e after the colon." }], xp: 60 }),
    s10({ id: "theme-colour", task: "Use the named teal for the holiday words.", inputMode: "guided", files: solvedTheme(":root {\n  --barangay-teal: #0f766e;\n}\n\n.holiday-note {\n  color: ;\n}"), activeFile: "styles.css", highlightToken: "color: ;", conceptIds: ["css-var"], tests: [{ id: "theme-colour-set", kind: "style", selector: ".holiday-note", prop: "color", equals: "rgb(15, 118, 110)", readable: "teal", label: "Holiday words use the named teal" }], hints: [{ level: 1, text: "Use var with the named teal inside the brackets." }], xp: 60 }),
    s10({ id: "theme-border", task: "Use the same teal for a thick left border.", inputMode: "guided", files: solvedTheme(":root {\n  --barangay-teal: #0f766e;\n}\n\n.holiday-note {\n  color: var(--barangay-teal);\n  border-left: ;\n}"), activeFile: "styles.css", highlightToken: "border-left: ;", tests: [{ id: "theme-border-rule", kind: "source-matches", file: "styles.css", pattern: "border-left\\s*:\\s*4px\\s+solid\\s+var\\(\\s*--barangay-teal\\s*\\)", flags: "i", because: "Use a 4px solid left border with the named teal value.", label: "The note has a thick left border" }], hints: [{ level: 1, text: "Use 4px solid, then the named teal value." }], xp: 50 }),
    s10({ id: "theme-padding", task: "Give the holiday words space from the left border.", inputMode: "guided", files: solvedTheme(":root {\n  --barangay-teal: #0f766e;\n}\n\n.holiday-note {\n  color: var(--barangay-teal);\n  border-left: 4px solid var(--barangay-teal);\n  padding-left: ;\n}"), activeFile: "styles.css", highlightToken: "padding-left: ;", tests: [{ id: "theme-padding-set", kind: "style", selector: ".holiday-note", prop: "padding-left", equals: "12px", readable: "12 pixels", label: "Words have space from the border" }], hints: [{ level: 1, text: "Write 12px after the colon." }], xp: 40 }),
    s10({ id: "theme-background", task: "Give the holiday note a very pale teal background.", inputMode: "guided", files: solvedTheme(".holiday-note {\n  background-color: ;\n}"), activeFile: "styles.css", highlightToken: "background-color: ;", tests: [{ id: "theme-background-set", kind: "style", selector: ".holiday-note", prop: "background-color", equals: "rgb(240, 253, 250)", readable: "pale teal", label: "The note has a pale teal background" }], hints: [{ level: 1, text: "Write #f0fdfa after the colon." }], xp: 40 }),
    s11({ id: "alert-surface", task: "Give the alert a white surface with room inside.", inputMode: "guided", files: solvedAlert(".alert-card {\n  background-color: ;\n  padding: ;\n}"), activeFile: "styles.css", highlightToken: "background-color: ;", tests: [{ id: "alert-white", kind: "style", selector: ".alert-card", prop: "background-color", equals: "rgb(255, 255, 255)", readable: "white", label: "The alert is white" }, { id: "alert-padding-set", kind: "style", selector: ".alert-card", prop: "padding-top", equals: "16px", readable: "16 pixels", label: "The alert has inside room" }], hints: [{ level: 1, text: "Fill the first blank with white and the second with 16px." }], xp: 50 }),
    s11({ id: "alert-transition", task: "Make position changes feel smooth and short.", inputMode: "guided", files: solvedAlert(".alert-card {\n  background-color: white;\n  padding: 16px;\n  transition: ;\n}"), activeFile: "styles.css", highlightToken: "transition: ;", conceptIds: ["css-transition"], tests: [{ id: "alert-transform-transition", kind: "source-matches", file: "styles.css", pattern: "transition\\s*:\\s*transform\\s+150ms", flags: "i", because: "Only the transform property should animate for 150ms.", label: "The alert has a short safe transition" }], hints: [{ level: 1, text: "Write transform 150ms after the colon." }], xp: 60 }),
    s11({ id: "alert-hover", task: "Move the alert up by 2 pixels while the mouse is on it.", inputMode: "guided", files: solvedAlert(".alert-card {\n  transition: transform 150ms;\n}\n\n.alert-card:hover {\n  transform: ;\n}"), activeFile: "styles.css", highlightToken: "transform: ;", conceptIds: ["css-transform"], tests: [{ id: "alert-hover-transform", kind: "source-matches", file: "styles.css", pattern: "\\.alert-card:hover\\s*\\{[^}]*transform\\s*:\\s*translateY\\(\\s*-2px\\s*\\)", flags: "is", because: "Use the hover rule with a small upward translateY move.", label: "The alert moves safely on hover" }], hints: [{ level: 1, text: "Use translateY(-2px) after the colon." }], xp: 70 }),
    s11({ id: "alert-reduced-motion", task: "Turn off the alert movement for people who ask for less motion.", inputMode: "guided", files: solvedAlert(".alert-card {\n  transition: transform 150ms;\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .alert-card {\n    transition: ;\n  }\n}"), activeFile: "styles.css", highlightToken: "transition: ;", conceptIds: ["prefers-reduced-motion"], tests: [{ id: "alert-reduced-motion-rule", kind: "source-matches", file: "styles.css", pattern: "@media\\s*\\(\\s*prefers-reduced-motion\\s*:\\s*reduce\\s*\\)[^{]*\\{[\\s\\S]*?transition\\s*:\\s*none", flags: "is", because: "Use the less-motion media rule and turn the transition off.", label: "The alert respects less-motion settings" }], hints: [{ level: 1, text: "Write none after the transition colon." }], xp: 80 }),
    s11({ id: "alert-border", task: "Add a clear red left border to the flood alert.", inputMode: "guided", files: solvedAlert(".alert-card {\n  border-left: ;\n}"), activeFile: "styles.css", highlightToken: "border-left: ;", tests: [{ id: "alert-red-border-rule", kind: "source-matches", file: "styles.css", pattern: "border-left\\s*:\\s*4px\\s+solid\\s+#b91c1c", flags: "i", because: "Use a 4px solid red left border.", label: "The alert has a clear left border" }], hints: [{ level: 1, text: "Write 4px solid #b91c1c after the colon." }], xp: 40 }),
    s12({ id: "heading-case", task: "Make the small update label use capital letters.", inputMode: "guided", files: solvedHeading(".announcement p {\n  text-transform: ;\n}"), activeFile: "styles.css", highlightToken: "text-transform: ;", conceptIds: ["text-transform"], tests: [{ id: "heading-label-case", kind: "style", selector: ".announcement p", prop: "text-transform", equals: "uppercase", readable: "uppercase", label: "The update label is in capitals" }], hints: [{ level: 1, text: "Write uppercase after the colon." }], xp: 50 }),
    s12({ id: "heading-spacing", task: "Put a small gap between the update label letters.", inputMode: "guided", files: solvedHeading(".announcement p {\n  text-transform: uppercase;\n  letter-spacing: ;\n}"), activeFile: "styles.css", highlightToken: "letter-spacing: ;", conceptIds: ["letter-spacing"], tests: [{ id: "heading-label-spacing", kind: "style", selector: ".announcement p", prop: "letter-spacing", equals: "1.28px", readable: "a small letter gap", label: "The label letters have room" }], hints: [{ level: 1, text: "Write 0.08em after the colon." }], xp: 60 }),
    s12({ id: "heading-size", task: "Let the heading grow on larger screens but stay within safe limits.", inputMode: "guided", files: solvedHeading("h1 {\n  font-size: ;\n}"), activeFile: "styles.css", highlightToken: "font-size: ;", conceptIds: ["css-clamp"], tests: [{ id: "heading-size-rule", kind: "source-matches", file: "styles.css", pattern: "font-size\\s*:\\s*clamp\\(\\s*24px\\s*,\\s*5vw\\s*,\\s*48px\\s*\\)", flags: "i", because: "Use the smallest, flexible, and largest sizes in clamp.", label: "The heading size can adapt" }], hints: [{ level: 1, text: "Write clamp(24px, 5vw, 48px) after the colon." }], xp: 70 }),
    s12({ id: "heading-height", task: "Keep the big heading lines close but readable.", inputMode: "guided", files: solvedHeading("h1 {\n  font-size: clamp(24px, 5vw, 48px);\n  line-height: ;\n}"), activeFile: "styles.css", highlightToken: "line-height: ;", tests: [{ id: "heading-line-height", kind: "source-matches", file: "styles.css", pattern: "line-height\\s*:\\s*1\\.1", flags: "i", because: "Use a line height of 1.1.", label: "Heading lines are close and readable" }], hints: [{ level: 1, text: "Write 1.1 after the colon." }], xp: 40 }),
    s12({ id: "heading-length", task: "Keep the heading from becoming too long on one line.", inputMode: "guided", files: solvedHeading("h1 {\n  font-size: clamp(24px, 5vw, 48px);\n  line-height: 1.1;\n  max-width: ;\n}"), activeFile: "styles.css", highlightToken: "max-width: ;", conceptIds: ["ch-unit"], tests: [{ id: "heading-max-width", kind: "source-matches", file: "styles.css", pattern: "max-width\\s*:\\s*20ch", flags: "i", because: "Use 20ch for the heading limit.", label: "The heading has a readable line length" }], hints: [{ level: 1, text: "Write 20ch after the colon." }], xp: 60 }),
    s13({ id: "link-colour", task: "Make the notice link dark teal.", inputMode: "guided", files: solvedAnnouncementLink(".announcement-link {\n  color: ;\n}"), activeFile: "styles.css", highlightToken: "color: ;", tests: [{ id: "link-colour-set", kind: "style", selector: ".announcement-link", prop: "color", equals: "rgb(15, 118, 110)", readable: "dark teal", label: "The notice link is dark teal" }], hints: [{ level: 1, text: "Write #0f766e after the colon." }], xp: 40 }),
    s13({ id: "link-weight", task: "Make the notice link easy to notice.", inputMode: "guided", files: solvedAnnouncementLink(".announcement-link {\n  color: #0f766e;\n  font-weight: ;\n}"), activeFile: "styles.css", highlightToken: "font-weight: ;", tests: [{ id: "link-weight-set", kind: "style", selector: ".announcement-link", prop: "font-weight", equals: "600", readable: "semibold", label: "The notice link has a stronger weight" }], hints: [{ level: 1, text: "Write 600 after the colon." }], xp: 40 }),
    s13({ id: "link-thickness", task: "Make the link underline easier to see.", inputMode: "guided", files: solvedAnnouncementLink(".announcement-link {\n  color: #0f766e;\n  font-weight: 600;\n  text-decoration-thickness: ;\n}"), activeFile: "styles.css", highlightToken: "text-decoration-thickness: ;", conceptIds: ["text-decoration-thickness"], tests: [{ id: "link-thickness-set", kind: "style", selector: ".announcement-link", prop: "text-decoration-thickness", equals: "2px", readable: "2 pixels", label: "The underline is easier to see" }], hints: [{ level: 1, text: "Write 2px after the colon." }], xp: 60 }),
    s13({ id: "link-offset", task: "Move the underline a little away from the words.", inputMode: "guided", files: solvedAnnouncementLink(".announcement-link {\n  color: #0f766e;\n  font-weight: 600;\n  text-decoration-thickness: 2px;\n  text-underline-offset: ;\n}"), activeFile: "styles.css", highlightToken: "text-underline-offset: ;", conceptIds: ["text-underline-offset"], tests: [{ id: "link-offset-set", kind: "style", selector: ".announcement-link", prop: "text-underline-offset", equals: "4px", readable: "4 pixels", label: "The underline has breathing room" }], hints: [{ level: 1, text: "Write 4px after the colon." }], xp: 60 }),
    s13({ id: "link-hover", task: "Make the link a little darker under the mouse.", inputMode: "guided", files: solvedAnnouncementLink(".announcement-link {\n  color: #0f766e;\n  font-weight: 600;\n  text-decoration-thickness: 2px;\n  text-underline-offset: 4px;\n}\n\n.announcement-link:hover {\n  color: ;\n}"), activeFile: "styles.css", highlightToken: "color: ;", tests: [{ id: "link-hover-colour", kind: "source-matches", file: "styles.css", pattern: "\\.announcement-link:hover\\s*\\{[^}]*color\\s*:\\s*#115e59", flags: "is", because: "Use the hover rule with the darker teal colour.", label: "The link changes under the mouse" }], hints: [{ level: 1, text: "Use the darker teal code named in the task." }], xp: 60 }),
    s14({ id: "button-background", task: "Give the order button a dark teal background.", inputMode: "guided", files: solvedOrderButton(".order-button {\n  background-color: ;\n}"), activeFile: "styles.css", highlightToken: "background-color: ;", tests: [{ id: "button-background-set", kind: "style", selector: ".order-button", prop: "background-color", equals: "rgb(15, 118, 110)", readable: "dark teal", label: "The order button is dark teal" }], hints: [{ level: 1, text: "Write #0f766e after the colon." }], xp: 40 }),
    s14({ id: "button-colour", task: "Make the order button words white.", inputMode: "guided", files: solvedOrderButton(".order-button {\n  background-color: #0f766e;\n  color: ;\n}"), activeFile: "styles.css", highlightToken: "color: ;", tests: [{ id: "button-colour-set", kind: "style", selector: ".order-button", prop: "color", equals: "rgb(255, 255, 255)", readable: "white", label: "The order button words are white" }], hints: [{ level: 1, text: "Write white after the colon." }], xp: 40 }),
    s14({ id: "button-padding", task: "Give the order button room inside.", inputMode: "guided", files: solvedOrderButton(".order-button {\n  background-color: #0f766e;\n  color: white;\n  padding: ;\n}"), activeFile: "styles.css", highlightToken: "padding: ;", tests: [{ id: "button-padding-top", kind: "style", selector: ".order-button", prop: "padding-top", equals: "12px", readable: "12 pixels", label: "The button has room above and below" }, { id: "button-padding-left", kind: "style", selector: ".order-button", prop: "padding-left", equals: "16px", readable: "16 pixels", label: "The button has room on the sides" }], hints: [{ level: 1, text: "Write 12px 16px after the colon." }], xp: 50 }),
    s14({ id: "button-radius", task: "Round the order button corners a little.", inputMode: "guided", files: solvedOrderButton(".order-button {\n  background-color: #0f766e;\n  color: white;\n  padding: 12px 16px;\n  border-radius: ;\n}"), activeFile: "styles.css", highlightToken: "border-radius: ;", tests: [{ id: "button-radius-set", kind: "style", selector: ".order-button", prop: "border-top-left-radius", equals: "8px", readable: "8 pixels", label: "The button corners are rounded" }], hints: [{ level: 1, text: "Write 8px after the colon." }], xp: 40 }),
    s14({ id: "button-cursor", task: "Show that the order button can be clicked.", inputMode: "guided", files: solvedOrderButton(".order-button {\n  background-color: #0f766e;\n  color: white;\n  padding: 12px 16px;\n  border-radius: 8px;\n  cursor: ;\n}"), activeFile: "styles.css", highlightToken: "cursor: ;", conceptIds: ["cursor-property"], tests: [{ id: "button-cursor-set", kind: "style", selector: ".order-button", prop: "cursor", equals: "pointer", readable: "pointer", label: "The button shows a pointing hand" }], hints: [{ level: 1, text: "Write pointer after the colon." }], xp: 50 }),
    s14({ id: "button-hover", task: "Make the order button darker under the mouse.", inputMode: "guided", files: solvedOrderButton(".order-button {\n  background-color: #0f766e;\n  color: white;\n  padding: 12px 16px;\n  border-radius: 8px;\n  cursor: pointer;\n}\n\n.order-button:hover {\n  background-color: ;\n}"), activeFile: "styles.css", highlightToken: "background-color: ;", tests: [{ id: "button-hover-background", kind: "source-matches", file: "styles.css", pattern: "\\.order-button:hover\\s*\\{[^}]*background-color\\s*:\\s*#115e59", flags: "is", because: "Use the hover rule with the darker teal colour.", label: "The button changes under the mouse" }], hints: [{ level: 1, text: "Use the darker teal code named in the task." }], xp: 50 }),
    s15({ id: "status-inline-flex", task: "Keep the open dot and words together in one small row.", inputMode: "guided", files: solvedStatus(".status {\n  display: ;\n}"), activeFile: "styles.css", highlightToken: "display: ;", conceptIds: ["inline-flex"], tests: [{ id: "status-inline-flex-set", kind: "style", selector: ".status", prop: "display", equals: "inline-flex", readable: "inline flex", label: "The dot and words stay in one small row" }], hints: [{ level: 1, text: "Use the display value that makes a small flexible row." }], xp: 60 }),
    s15({ id: "status-align", task: "Line up the open dot and words in the middle.", inputMode: "guided", files: solvedStatus(".status {\n  display: inline-flex;\n  align-items: ;\n}"), activeFile: "styles.css", highlightToken: "align-items: ;", tests: [{ id: "status-align-set", kind: "style", selector: ".status", prop: "align-items", equals: "center", readable: "centred", label: "The dot and words line up" }], hints: [{ level: 1, text: "Use the value that lines items up at their middle." }], xp: 40 }),
    s15({ id: "status-gap", task: "Leave a small space between the dot and words.", inputMode: "guided", files: solvedStatus(".status {\n  display: inline-flex;\n  align-items: center;\n  gap: ;\n}"), activeFile: "styles.css", highlightToken: "gap: ;", tests: [{ id: "status-gap-set", kind: "style", selector: ".status", prop: "column-gap", equals: "6px", readable: "6 pixels", label: "The dot has room beside the words" }], hints: [{ level: 1, text: "Use six pixels for the small space." }], xp: 40 }),
    s15({ id: "status-dot-width", task: "Make the status dot eight pixels wide.", inputMode: "guided", files: solvedStatus(".status {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n}\n\n.status-dot {\n  width: ;\n}"), activeFile: "styles.css", highlightToken: "width: ;", tests: [{ id: "status-dot-width-set", kind: "style", selector: ".status-dot", prop: "width", equals: "8px", readable: "8 pixels", label: "The status dot is eight pixels wide" }], hints: [{ level: 1, text: "Write 8px after the colon." }], xp: 40 }),
    s15({ id: "status-dot-height", task: "Make the status dot eight pixels tall.", inputMode: "guided", files: solvedStatus(".status {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n}\n\n.status-dot {\n  width: 8px;\n  height: ;\n}"), activeFile: "styles.css", highlightToken: "height: ;", tests: [{ id: "status-dot-height-set", kind: "style", selector: ".status-dot", prop: "height", equals: "8px", readable: "8 pixels", label: "The status dot is eight pixels tall" }], hints: [{ level: 1, text: "Write 8px after the colon." }], xp: 40 }),
    s15({ id: "status-dot-colour", task: "Make the status dot green.", inputMode: "guided", files: solvedStatus(".status {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n}\n\n.status-dot {\n  width: 8px;\n  height: 8px;\n  background-color: ;\n}"), activeFile: "styles.css", highlightToken: "background-color: ;", tests: [{ id: "status-dot-colour-set", kind: "style", selector: ".status-dot", prop: "background-color", equals: "rgb(22, 163, 74)", readable: "green", label: "The status dot is green" }], hints: [{ level: 1, text: "Use the green code named in the task." }], xp: 40 }),
    s15({ id: "status-dot-round", task: "Make the green status dot fully round.", inputMode: "guided", files: solvedStatus(".status {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n}\n\n.status-dot {\n  width: 8px;\n  height: 8px;\n  background-color: #16a34a;\n  border-radius: ;\n}"), activeFile: "styles.css", highlightToken: "border-radius: ;", tests: [{ id: "status-dot-round-set", kind: "source-matches", file: "styles.css", pattern: "border-radius\\s*:\\s*50%", flags: "i", because: "Use 50% to make the square dot round.", label: "The status dot is fully round" }], hints: [{ level: 1, text: "Use half of the dot size as a percentage." }], xp: 50 }),
    s16({ id: "focus-link-colour", task: "Make the office-hours link dark teal.", inputMode: "guided", files: solvedFocusLink(".focus-link {\n  color: ;\n}"), activeFile: "styles.css", highlightToken: "color: ;", tests: [{ id: "focus-link-colour-set", kind: "style", selector: ".focus-link", prop: "color", equals: "rgb(15, 118, 110)", readable: "dark teal", label: "The office-hours link is dark teal" }], hints: [{ level: 1, text: "Write #0f766e after the colon." }], xp: 40 }),
    s16({ id: "focus-link-outline", task: "Show a strong outline when keyboard focus reaches the link.", inputMode: "guided", files: solvedFocusLink(".focus-link {\n  color: #0f766e;\n}\n\n.focus-link:focus-visible {\n  outline: ;\n}"), activeFile: "styles.css", highlightToken: "outline: ;", conceptIds: ["focus-visible"], tests: [{ id: "focus-link-outline-set", kind: "source-matches", file: "styles.css", pattern: "\\.focus-link:focus-visible\\s*\\{[^}]*outline\\s*:\\s*3px\\s+solid\\s+#111827", flags: "is", because: "Use a three-pixel dark outline in the keyboard-focus rule.", label: "Keyboard focus has a clear outline" }], hints: [{ level: 1, text: "Give the outline a width, line style, and dark colour." }, { level: 2, text: "Use 3px solid #111827." }], xp: 60 }),
    s16({ id: "focus-link-offset", task: "Leave a small gap between the focus outline and the words.", inputMode: "guided", files: solvedFocusLink(".focus-link {\n  color: #0f766e;\n}\n\n.focus-link:focus-visible {\n  outline: 3px solid #111827;\n  outline-offset: ;\n}"), activeFile: "styles.css", highlightToken: "outline-offset: ;", conceptIds: ["outline-offset"], tests: [{ id: "focus-link-offset-set", kind: "source-matches", file: "styles.css", pattern: "outline-offset\\s*:\\s*4px", flags: "i", because: "Use four pixels to leave a visible gap around the focus outline.", label: "The focus outline has breathing room" }], hints: [{ level: 1, text: "Use a pixel value for the gap." }, { level: 2, text: "Write 4px after the colon." }], xp: 60 }),
    s16({ id: "focus-link-weight", task: "Make the office-hours link easier to notice.", inputMode: "guided", files: solvedFocusLink(".focus-link {\n  color: #0f766e;\n  font-weight: ;\n}\n\n.focus-link:focus-visible {\n  outline: 3px solid #111827;\n  outline-offset: 4px;\n}"), activeFile: "styles.css", highlightToken: "font-weight: ;", tests: [{ id: "focus-link-weight-set", kind: "style", selector: ".focus-link", prop: "font-weight", equals: "600", readable: "semibold", label: "The office-hours link has a stronger weight" }], hints: [{ level: 1, text: "Use the semibold number." }, { level: 2, text: "Write 600 after the colon." }], xp: 40 }),
    s16({ id: "focus-link-underline", task: "Make the office-hours underline easier to see.", inputMode: "guided", files: solvedFocusLink(".focus-link {\n  color: #0f766e;\n  font-weight: 600;\n  text-decoration-thickness: ;\n}\n\n.focus-link:focus-visible {\n  outline: 3px solid #111827;\n  outline-offset: 4px;\n}"), activeFile: "styles.css", highlightToken: "text-decoration-thickness: ;", tests: [{ id: "focus-link-underline-set", kind: "style", selector: ".focus-link", prop: "text-decoration-thickness", equals: "2px", readable: "2 pixels", label: "The office-hours underline is easier to see" }], hints: [{ level: 1, text: "Use a small pixel value for the underline." }, { level: 2, text: "Write 2px after the colon." }], xp: 40 }),
    s17({ id: "print-notice-colour", task: "Make the water notice dark enough to read.", inputMode: "guided", files: solvedPrintNotice(".print-notice {\n  color: ;\n}"), activeFile: "styles.css", highlightToken: "color: ;", tests: [{ id: "print-notice-colour-set", kind: "style", selector: ".print-notice", prop: "color", equals: "rgb(17, 24, 39)", readable: "dark charcoal", label: "The water notice is dark enough to read" }], hints: [{ level: 1, text: "Use the dark charcoal code named in the task." }, { level: 2, text: "Write #111827 after the colon." }], xp: 40 }),
    s17({ id: "print-notice-padding", task: "Give the water notice room inside.", inputMode: "guided", files: solvedPrintNotice(".print-notice {\n  color: #111827;\n  padding: ;\n}"), activeFile: "styles.css", highlightToken: "padding: ;", tests: [{ id: "print-notice-padding-set", kind: "style", selector: ".print-notice", prop: "padding-top", equals: "16px", readable: "16 pixels", label: "The water notice has inside room" }], hints: [{ level: 1, text: "Use a small pixel value for the inside room." }, { level: 2, text: "Write 16px after the colon." }], xp: 40 }),
    s17({ id: "print-notice-print-colour", task: "Use black text when people print the notice.", inputMode: "guided", files: solvedPrintNotice(".print-notice {\n  color: #111827;\n  padding: 16px;\n}\n\n@media print {\n  .print-notice {\n    color: ;\n  }\n}"), activeFile: "styles.css", highlightToken: "color: ;", conceptIds: ["print-media-query"], tests: [{ id: "print-notice-print-colour-set", kind: "source-matches", file: "styles.css", pattern: "@media\\s+print\\s*\\{[\\s\\S]*?\\.print-notice\\s*\\{[^}]*color\\s*:\\s*#000", flags: "is", because: "Use the print media rule and set the notice text to black.", label: "The printed notice uses black text" }], hints: [{ level: 1, text: "Use the black shorthand colour inside the print rule." }, { level: 2, text: "Write #000 after the colon." }], xp: 60 }),
    s17({ id: "print-notice-hide-button", task: "Hide the print button on the printed notice.", inputMode: "guided", files: solvedPrintNotice(".print-notice {\n  color: #111827;\n  padding: 16px;\n}\n\n@media print {\n  .print-notice {\n    color: #000;\n  }\n\n  .print-help {\n    display: ;\n  }\n}"), activeFile: "styles.css", highlightToken: "display: ;", tests: [{ id: "print-notice-hide-button-set", kind: "source-matches", file: "styles.css", pattern: "@media\\s+print\\s*\\{[\\s\\S]*?\\.print-help\\s*\\{[^}]*display\\s*:\\s*none", flags: "is", because: "The print-only rule should hide the print button.", label: "The printed notice hides its print button" }], hints: [{ level: 1, text: "Use the display value that hides an element." }, { level: 2, text: "Write none after the colon." }], xp: 50 }),
    s17({ id: "print-page-margin", task: "Leave a clear paper margin around the printed notice.", inputMode: "guided", files: solvedPrintNotice(".print-notice {\n  color: #111827;\n  padding: 16px;\n}\n\n@media print {\n  .print-notice {\n    color: #000;\n  }\n\n  .print-help {\n    display: none;\n  }\n}\n\n@page {\n  margin: ;\n}"), activeFile: "styles.css", highlightToken: "margin: ;", conceptIds: ["page-at-rule"], tests: [{ id: "print-page-margin-set", kind: "source-matches", file: "styles.css", pattern: "@page\\s*\\{[^}]*margin\\s*:\\s*16mm", flags: "is", because: "Use the page rule with a 16-millimetre margin.", label: "The printed page has a clear margin" }], hints: [{ level: 1, text: "Use a millimetre value for the paper edge." }, { level: 2, text: "Write 16mm after the colon." }], xp: 60 }),
    s18({ id: "night-notice-background", task: "Give the night notice a pale background in daylight.", inputMode: "guided", files: solvedNightNotice(".night-notice {\n  background-color: ;\n}"), activeFile: "styles.css", highlightToken: "background-color: ;", tests: [{ id: "night-notice-background-set", kind: "style", selector: ".night-notice", prop: "background-color", equals: "rgb(248, 250, 252)", readable: "pale grey", label: "The daylight notice has a pale background" }], hints: [{ level: 1, text: "Use the pale grey code named in the task." }, { level: 2, text: "Write #f8fafc after the colon." }], xp: 40 }),
    s18({ id: "night-notice-colour", task: "Make the daylight notice words dark enough to read.", inputMode: "guided", files: solvedNightNotice(".night-notice {\n  background-color: #f8fafc;\n  color: ;\n}"), activeFile: "styles.css", highlightToken: "color: ;", tests: [{ id: "night-notice-colour-set", kind: "style", selector: ".night-notice", prop: "color", equals: "rgb(17, 24, 39)", readable: "dark charcoal", label: "The daylight notice words are dark enough" }], hints: [{ level: 1, text: "Use the dark charcoal code named in the task." }, { level: 2, text: "Write #111827 after the colon." }], xp: 40 }),
    s18({ id: "night-notice-dark-background", task: "Use a dark background when the device asks for dark colours.", inputMode: "guided", files: solvedNightNotice(".night-notice {\n  background-color: #f8fafc;\n  color: #111827;\n}\n\n@media (prefers-color-scheme: dark) {\n  .night-notice {\n    background-color: ;\n  }\n}"), activeFile: "styles.css", highlightToken: "background-color: ;", conceptIds: ["prefers-color-scheme"], tests: [{ id: "night-notice-dark-background-set", kind: "source-matches", file: "styles.css", pattern: "prefers-color-scheme\\s*:\\s*dark[\\s\\S]*?background-color\\s*:\\s*#111827", flags: "is", because: "Use the dark-colour media rule and set the notice background to dark charcoal.", label: "The night notice respects dark-colour settings" }], hints: [{ level: 1, text: "Use the dark charcoal code inside the dark-colour rule." }, { level: 2, text: "Write #111827 after the colon." }], xp: 60 }),
    s18({ id: "night-notice-dark-colour", task: "Make the dark-mode notice words pale enough to read.", inputMode: "guided", files: solvedNightNotice(".night-notice {\n  background-color: #f8fafc;\n  color: #111827;\n}\n\n@media (prefers-color-scheme: dark) {\n  .night-notice {\n    background-color: #111827;\n    color: ;\n  }\n}"), activeFile: "styles.css", highlightToken: "color: ;", tests: [{ id: "night-notice-dark-colour-set", kind: "source-matches", file: "styles.css", pattern: "prefers-color-scheme\\s*:\\s*dark[\\s\\S]*?color\\s*:\\s*#f8fafc", flags: "is", because: "Use the pale grey colour inside the dark-colour rule.", label: "The dark-mode notice words are easy to read" }], hints: [{ level: 1, text: "Use the pale grey code inside the dark-colour rule." }, { level: 2, text: "Write #f8fafc after the colon." }], xp: 50 }),
    s18({ id: "night-notice-colour-scheme", task: "Tell the browser this notice uses a dark colour scheme in dark mode.", inputMode: "guided", files: solvedNightNotice(".night-notice {\n  background-color: #f8fafc;\n  color: #111827;\n}\n\n@media (prefers-color-scheme: dark) {\n  .night-notice {\n    background-color: #111827;\n    color: #f8fafc;\n    color-scheme: ;\n  }\n}"), activeFile: "styles.css", highlightToken: "color-scheme: ;", conceptIds: ["color-scheme"], tests: [{ id: "night-notice-colour-scheme-set", kind: "source-matches", file: "styles.css", pattern: "\\.night-notice\\s*\\{[^}]*color-scheme\\s*:\\s*dark", flags: "is", because: "Name the dark colour scheme inside the dark-mode rule.", label: "The browser knows the notice uses dark colours" }], hints: [{ level: 1, text: "Use the same word that names the device setting." }, { level: 2, text: "Write dark after the colon." }], xp: 60 }),
    s19({ id: "sari-store-padding", task: "Give the card room inside its edges.", inputMode: "guided", files: solvedSariStore(".info-card {\n  padding: ;\n}"), activeFile: "styles.css", highlightToken: "padding: ;", tests: [{ id: "sari-store-padding-set", kind: "style", selector: ".info-card", prop: "padding-top", equals: "16px", readable: "16 pixels", label: "The card has room inside of 16 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the inside room." }, { level: 2, text: "Write 16px after the colon." }], xp: 45 }),
    s19({ id: "sari-store-background-color", task: "Make the card stand out from the page.", inputMode: "guided", files: solvedSariStore(".info-card {\n  padding: 16px;\n  background-color: ;\n}"), activeFile: "styles.css", highlightToken: "background-color: ;", tests: [{ id: "sari-store-background-color-set", kind: "style", selector: ".info-card", prop: "background-color", equals: "rgb(255, 255, 255)", readable: "white", label: "The card has a background of white" }], hints: [{ level: 1, text: "Use the white colour code." }, { level: 2, text: "Write #ffffff after the colon." }], xp: 45 }),
    s19({ id: "sari-store-border-radius", task: "Soften the corners of the card.", inputMode: "guided", files: solvedSariStore(".info-card {\n  padding: 16px;\n  background-color: #ffffff;\n  border-radius: ;\n}"), activeFile: "styles.css", highlightToken: "border-radius: ;", tests: [{ id: "sari-store-border-radius-set", kind: "style", selector: ".info-card", prop: "border-top-left-radius", equals: "12px", readable: "12 pixels", label: "The card has corners curved by 12 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the corner curve." }, { level: 2, text: "Write 12px after the colon." }], xp: 45 }),
    s19({ id: "sari-store-margin-bottom", task: "Leave space below the card.", inputMode: "guided", files: solvedSariStore(".info-card {\n  padding: 16px;\n  background-color: #ffffff;\n  border-radius: 12px;\n  margin-bottom: ;\n}"), activeFile: "styles.css", highlightToken: "margin-bottom: ;", tests: [{ id: "sari-store-margin-bottom-set", kind: "style", selector: ".info-card", prop: "margin-bottom", equals: "24px", readable: "24 pixels", label: "The card leaves a gap below of 24 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the gap below." }, { level: 2, text: "Write 24px after the colon." }], xp: 45 }),
    s19({ id: "sari-store-max-width", task: "Stop the card growing too wide to read.", inputMode: "guided", files: solvedSariStore(".info-card {\n  padding: 16px;\n  background-color: #ffffff;\n  border-radius: 12px;\n  margin-bottom: 24px;\n  max-width: ;\n}"), activeFile: "styles.css", highlightToken: "max-width: ;", tests: [{ id: "sari-store-max-width-set", kind: "style", selector: ".info-card", prop: "max-width", equals: "400px", readable: "400 pixels", label: "The card stops growing past 400 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the widest it may get." }, { level: 2, text: "Write 400px after the colon." }], xp: 45 }),
    s20({ id: "curfew-notice-border-left-width", task: "Give the notice a thick stripe down its left side.", inputMode: "guided", files: solvedCurfewNotice(".notice-banner {\n  border-left-width: ;\n}"), activeFile: "styles.css", highlightToken: "border-left-width: ;", tests: [{ id: "curfew-notice-border-left-width-set", kind: "style", selector: ".notice-banner", prop: "border-left-width", equals: "4px", readable: "4 pixels", label: "The notice has a left stripe of 4 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the stripe width." }, { level: 2, text: "Write 4px after the colon." }], xp: 45 }),
    s20({ id: "curfew-notice-border-left-style", task: "Make the left stripe a solid line.", inputMode: "guided", files: solvedCurfewNotice(".notice-banner {\n  border-left-width: 4px;\n  border-left-style: ;\n}"), activeFile: "styles.css", highlightToken: "border-left-style: ;", tests: [{ id: "curfew-notice-border-left-style-set", kind: "style", selector: ".notice-banner", prop: "border-left-style", equals: "solid", readable: "a solid line", label: "The notice draws its stripe as a solid line" }], hints: [{ level: 1, text: "Use the plain unbroken line style." }, { level: 2, text: "Write solid after the colon." }], xp: 45 }),
    s20({ id: "curfew-notice-border-left-color", task: "Colour the stripe amber so it reads as a warning.", inputMode: "guided", files: solvedCurfewNotice(".notice-banner {\n  border-left-width: 4px;\n  border-left-style: solid;\n  border-left-color: ;\n}"), activeFile: "styles.css", highlightToken: "border-left-color: ;", tests: [{ id: "curfew-notice-border-left-color-set", kind: "style", selector: ".notice-banner", prop: "border-left-color", equals: "rgb(180, 83, 9)", readable: "amber", label: "The notice has a stripe coloured amber" }], hints: [{ level: 1, text: "Use the amber colour code named in the task." }, { level: 2, text: "Write #b45309 after the colon." }], xp: 45 }),
    s20({ id: "curfew-notice-background-color", task: "Tint the notice background to match the stripe.", inputMode: "guided", files: solvedCurfewNotice(".notice-banner {\n  border-left-width: 4px;\n  border-left-style: solid;\n  border-left-color: #b45309;\n  background-color: ;\n}"), activeFile: "styles.css", highlightToken: "background-color: ;", tests: [{ id: "curfew-notice-background-color-set", kind: "style", selector: ".notice-banner", prop: "background-color", equals: "rgb(255, 251, 235)", readable: "pale amber", label: "The notice has a background of pale amber" }], hints: [{ level: 1, text: "Use the pale amber code." }, { level: 2, text: "Write #fffbeb after the colon." }], xp: 45 }),
    s20({ id: "curfew-notice-padding-left", task: "Keep the words clear of the stripe.", inputMode: "guided", files: solvedCurfewNotice(".notice-banner {\n  border-left-width: 4px;\n  border-left-style: solid;\n  border-left-color: #b45309;\n  background-color: #fffbeb;\n  padding-left: ;\n}"), activeFile: "styles.css", highlightToken: "padding-left: ;", tests: [{ id: "curfew-notice-padding-left-set", kind: "style", selector: ".notice-banner", prop: "padding-left", equals: "16px", readable: "16 pixels", label: "The notice keeps its words clear by 16 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the space after the stripe." }, { level: 2, text: "Write 16px after the colon." }], xp: 45 }),
    s21({ id: "terminal-timetable-font-size", task: "Make the card text large enough to read on a phone.", inputMode: "guided", files: solvedTerminalTimetable(".info-card {\n  font-size: ;\n}"), activeFile: "styles.css", highlightToken: "font-size: ;", tests: [{ id: "terminal-timetable-font-size-set", kind: "style", selector: ".info-card", prop: "font-size", equals: "18px", readable: "18 pixels", label: "The card text sets its text at 18 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the text size." }, { level: 2, text: "Write 18px after the colon." }], xp: 45 }),
    s21({ id: "terminal-timetable-line-height", task: "Open up the space between lines.", inputMode: "guided", files: solvedTerminalTimetable(".info-card {\n  font-size: 18px;\n  line-height: ;\n}"), activeFile: "styles.css", highlightToken: "line-height: ;", tests: [{ id: "terminal-timetable-line-height-set", kind: "style", selector: ".info-card", prop: "line-height", equals: "28.8px", readable: "1.6 times the text size", label: "The card text spaces its lines by 1.6 times the text size" }], hints: [{ level: 1, text: "Use a number with no unit." }, { level: 2, text: "Write 1.6 after the colon." }], xp: 45 }),
    s21({ id: "terminal-timetable-color", task: "Darken the words so they have enough contrast.", inputMode: "guided", files: solvedTerminalTimetable(".info-card {\n  font-size: 18px;\n  line-height: 1.6;\n  color: ;\n}"), activeFile: "styles.css", highlightToken: "color: ;", tests: [{ id: "terminal-timetable-color-set", kind: "style", selector: ".info-card", prop: "color", equals: "rgb(31, 41, 55)", readable: "dark slate", label: "The card text shows its words in dark slate" }], hints: [{ level: 1, text: "Use the dark slate code named in the task." }, { level: 2, text: "Write #1f2937 after the colon." }], xp: 45 }),
    s21({ id: "terminal-timetable-font-weight", task: "Give the card text a little more weight.", inputMode: "guided", files: solvedTerminalTimetable(".info-card {\n  font-size: 18px;\n  line-height: 1.6;\n  color: #1f2937;\n  font-weight: ;\n}"), activeFile: "styles.css", highlightToken: "font-weight: ;", tests: [{ id: "terminal-timetable-font-weight-set", kind: "style", selector: ".info-card", prop: "font-weight", equals: "500", readable: "medium", label: "The card text sets its weight to medium" }], hints: [{ level: 1, text: "Use the medium weight number." }, { level: 2, text: "Write 500 after the colon." }], xp: 45 }),
    s21({ id: "terminal-timetable-letter-spacing", task: "Loosen the letters very slightly.", inputMode: "guided", files: solvedTerminalTimetable(".info-card {\n  font-size: 18px;\n  line-height: 1.6;\n  color: #1f2937;\n  font-weight: 500;\n  letter-spacing: ;\n}"), activeFile: "styles.css", highlightToken: "letter-spacing: ;", tests: [{ id: "terminal-timetable-letter-spacing-set", kind: "style", selector: ".info-card", prop: "letter-spacing", equals: "0.2px", readable: "0.2 pixels", label: "The card text spaces its letters by 0.2 pixels" }], hints: [{ level: 1, text: "Use a small pixel value." }, { level: 2, text: "Write 0.2px after the colon." }], xp: 45 }),
    s22({ id: "store-price-display", task: "Put the label and the amount on one line.", inputMode: "guided", files: solvedStorePrice(".price-row {\n  display: ;\n}"), activeFile: "styles.css", highlightToken: "display: ;", tests: [{ id: "store-price-display-set", kind: "style", selector: ".price-row", prop: "display", equals: "flex", readable: "a flex row", label: "The row is laid out as a flex row" }], hints: [{ level: 1, text: "Use the display value that lays children out in a row." }, { level: 2, text: "Write flex after the colon." }], xp: 45 }),
    s22({ id: "store-price-justify-content", task: "Push the amount to the far right.", inputMode: "guided", files: solvedStorePrice(".price-row {\n  display: flex;\n  justify-content: ;\n}"), activeFile: "styles.css", highlightToken: "justify-content: ;", tests: [{ id: "store-price-justify-content-set", kind: "style", selector: ".price-row", prop: "justify-content", equals: "space-between", readable: "pushed apart", label: "The row spaces its children pushed apart" }], hints: [{ level: 1, text: "Use the value that puts all spare space between the two." }, { level: 2, text: "Write space-between after the colon." }], xp: 45 }),
    s22({ id: "store-price-align-items", task: "Line the two up through their middles.", inputMode: "guided", files: solvedStorePrice(".price-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: ;\n}"), activeFile: "styles.css", highlightToken: "align-items: ;", tests: [{ id: "store-price-align-items-set", kind: "style", selector: ".price-row", prop: "align-items", equals: "center", readable: "centred across", label: "The row lines its children up centred across" }], hints: [{ level: 1, text: "Use the value that centres children across the row." }, { level: 2, text: "Write center after the colon." }], xp: 45 }),
    s22({ id: "store-price-gap", task: "Keep a minimum gap between the two.", inputMode: "guided", files: solvedStorePrice(".price-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: ;\n}"), activeFile: "styles.css", highlightToken: "gap: ;", tests: [{ id: "store-price-gap-set", kind: "style", selector: ".price-row", prop: "column-gap", equals: "12px", readable: "12 pixels", label: "The row keeps a gap of 12 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the gap." }, { level: 2, text: "Write 12px after the colon." }], xp: 45 }),
    s22({ id: "store-price-padding", task: "Give the row room inside.", inputMode: "guided", files: solvedStorePrice(".price-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n  padding: ;\n}"), activeFile: "styles.css", highlightToken: "padding: ;", tests: [{ id: "store-price-padding-set", kind: "style", selector: ".price-row", prop: "padding-top", equals: "12px", readable: "12 pixels", label: "The row has room inside of 12 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the inside room." }, { level: 2, text: "Write 12px after the colon." }], xp: 45 }),
    s23({ id: "health-centre-display", task: "Take control of how the list stacks.", inputMode: "guided", files: solvedHealthCentre(".item-list {\n  display: ;\n}"), activeFile: "styles.css", highlightToken: "display: ;", tests: [{ id: "health-centre-display-set", kind: "style", selector: ".item-list", prop: "display", equals: "flex", readable: "a flex box", label: "The list is laid out as a flex box" }], hints: [{ level: 1, text: "Use the display value that lets you control direction and gaps." }, { level: 2, text: "Write flex after the colon." }], xp: 45 }),
    s23({ id: "health-centre-flex-direction", task: "Stack the heading and the list top to bottom.", inputMode: "guided", files: solvedHealthCentre(".item-list {\n  display: flex;\n  flex-direction: ;\n}"), activeFile: "styles.css", highlightToken: "flex-direction: ;", tests: [{ id: "health-centre-flex-direction-set", kind: "style", selector: ".item-list", prop: "flex-direction", equals: "column", readable: "top to bottom", label: "The list runs top to bottom" }], hints: [{ level: 1, text: "Use the direction value that runs down the page." }, { level: 2, text: "Write column after the colon." }], xp: 45 }),
    s23({ id: "health-centre-gap", task: "Space the stacked parts evenly.", inputMode: "guided", files: solvedHealthCentre(".item-list {\n  display: flex;\n  flex-direction: column;\n  gap: ;\n}"), activeFile: "styles.css", highlightToken: "gap: ;", tests: [{ id: "health-centre-gap-set", kind: "style", selector: ".item-list", prop: "row-gap", equals: "8px", readable: "8 pixels", label: "The list keeps a gap of 8 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the gap." }, { level: 2, text: "Write 8px after the colon." }], xp: 45 }),
    s23({ id: "health-centre-background-color", task: "Tint the list so it reads as one block.", inputMode: "guided", files: solvedHealthCentre(".item-list {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  background-color: ;\n}"), activeFile: "styles.css", highlightToken: "background-color: ;", tests: [{ id: "health-centre-background-color-set", kind: "style", selector: ".item-list", prop: "background-color", equals: "rgb(248, 250, 252)", readable: "pale grey", label: "The list has a background of pale grey" }], hints: [{ level: 1, text: "Use the pale grey code." }, { level: 2, text: "Write #f8fafc after the colon." }], xp: 45 }),
    s23({ id: "health-centre-padding", task: "Keep the list clear of its own edges.", inputMode: "guided", files: solvedHealthCentre(".item-list {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  background-color: #f8fafc;\n  padding: ;\n}"), activeFile: "styles.css", highlightToken: "padding: ;", tests: [{ id: "health-centre-padding-set", kind: "style", selector: ".item-list", prop: "padding-top", equals: "16px", readable: "16 pixels", label: "The list has room inside of 16 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the inside room." }, { level: 2, text: "Write 16px after the colon." }], xp: 45 }),
    s24({ id: "route-board-display", task: "Lay the stalls out as a grid.", inputMode: "guided", files: solvedRouteBoard(".stall-grid {\n  display: ;\n}"), activeFile: "styles.css", highlightToken: "display: ;", tests: [{ id: "route-board-display-set", kind: "style", selector: ".stall-grid", prop: "display", equals: "grid", readable: "a grid", label: "The grid is laid out as a grid" }], hints: [{ level: 1, text: "Use the display value made for rows and columns together." }, { level: 2, text: "Write grid after the colon." }], xp: 45 }),
    s24({ id: "route-board-grid-template-columns", task: "Give the grid two equal columns.", inputMode: "guided", files: solvedRouteBoard(".stall-grid {\n  display: grid;\n  grid-template-columns: ;\n}"), activeFile: "styles.css", highlightToken: "grid-template-columns: ;", tests: [{ id: "route-board-grid-template-columns-set", kind: "source-matches", file: "styles.css", pattern: "grid-template-columns\s*:\s*1fr\s+1fr", flags: "i", because: "Two equal column tracks are written as 1fr 1fr.", label: "The grid is divided into two equal columns" }], hints: [{ level: 1, text: "Name two equal fractions of the free space." }, { level: 2, text: "Write 1fr 1fr after the colon." }], xp: 55 }),
    s24({ id: "route-board-gap", task: "Space the cells apart.", inputMode: "guided", files: solvedRouteBoard(".stall-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: ;\n}"), activeFile: "styles.css", highlightToken: "gap: ;", tests: [{ id: "route-board-gap-set", kind: "style", selector: ".stall-grid", prop: "row-gap", equals: "12px", readable: "12 pixels", label: "The grid keeps a gap of 12 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the gap." }, { level: 2, text: "Write 12px after the colon." }], xp: 45 }),
    s24({ id: "route-board-padding", task: "Keep the cells clear of the outer edge.", inputMode: "guided", files: solvedRouteBoard(".stall-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n  padding: ;\n}"), activeFile: "styles.css", highlightToken: "padding: ;", tests: [{ id: "route-board-padding-set", kind: "style", selector: ".stall-grid", prop: "padding-top", equals: "12px", readable: "12 pixels", label: "The grid has room inside of 12 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the inside room." }, { level: 2, text: "Write 12px after the colon." }], xp: 45 }),
    s24({ id: "route-board-background-color", task: "Tint the grid so the cells read as a set.", inputMode: "guided", files: solvedRouteBoard(".stall-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n  padding: 12px;\n  background-color: ;\n}"), activeFile: "styles.css", highlightToken: "background-color: ;", tests: [{ id: "route-board-background-color-set", kind: "style", selector: ".stall-grid", prop: "background-color", equals: "rgb(241, 245, 249)", readable: "light grey", label: "The grid has a background of light grey" }], hints: [{ level: 1, text: "Use the light grey code." }, { level: 2, text: "Write #f1f5f9 after the colon." }], xp: 45 }),
    s25({ id: "fish-stall-max-width", task: "Cap how wide the card can grow.", inputMode: "guided", files: solvedFishStall(".info-card {\n  max-width: ;\n}"), activeFile: "styles.css", highlightToken: "max-width: ;", tests: [{ id: "fish-stall-max-width-set", kind: "style", selector: ".info-card", prop: "max-width", equals: "480px", readable: "480 pixels", label: "The card stops growing past 480 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the widest it may get." }, { level: 2, text: "Write 480px after the colon." }], xp: 45 }),
    s25({ id: "fish-stall-width", task: "Let the card shrink to fit a narrow screen.", inputMode: "guided", files: solvedFishStall(".info-card {\n  max-width: 480px;\n  width: ;\n}"), activeFile: "styles.css", highlightToken: "width: ;", tests: [{ id: "fish-stall-width-set", kind: "source-matches", file: "styles.css", pattern: "width\s*:\s*100%", flags: "i", because: "A full-width value lets the card shrink on a narrow screen.", label: "The card takes up the full width available" }], hints: [{ level: 1, text: "Use a percentage of the space available." }, { level: 2, text: "Write 100% after the colon." }], xp: 55 }),
    s25({ id: "fish-stall-padding", task: "Give the card room inside.", inputMode: "guided", files: solvedFishStall(".info-card {\n  max-width: 480px;\n  width: 100%;\n  padding: ;\n}"), activeFile: "styles.css", highlightToken: "padding: ;", tests: [{ id: "fish-stall-padding-set", kind: "style", selector: ".info-card", prop: "padding-top", equals: "16px", readable: "16 pixels", label: "The card has room inside of 16 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the inside room." }, { level: 2, text: "Write 16px after the colon." }], xp: 45 }),
    s25({ id: "fish-stall-font-size", task: "Set a comfortable reading size.", inputMode: "guided", files: solvedFishStall(".info-card {\n  max-width: 480px;\n  width: 100%;\n  padding: 16px;\n  font-size: ;\n}"), activeFile: "styles.css", highlightToken: "font-size: ;", tests: [{ id: "fish-stall-font-size-set", kind: "style", selector: ".info-card", prop: "font-size", equals: "16px", readable: "16 pixels", label: "The card sets its text at 16 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the text size." }, { level: 2, text: "Write 16px after the colon." }], xp: 45 }),
    s25({ id: "fish-stall-box-sizing", task: "Count the padding inside the width, not on top of it.", inputMode: "guided", files: solvedFishStall(".info-card {\n  max-width: 480px;\n  width: 100%;\n  padding: 16px;\n  font-size: 16px;\n  box-sizing: ;\n}"), activeFile: "styles.css", highlightToken: "box-sizing: ;", tests: [{ id: "fish-stall-box-sizing-set", kind: "style", selector: ".info-card", prop: "box-sizing", equals: "border-box", readable: "border box", label: "The card measures itself as border box" }], hints: [{ level: 1, text: "Use the sizing value that includes padding and border." }, { level: 2, text: "Write border-box after the colon." }], xp: 45 }),
    s26({ id: "turo-menu-background-color", task: "Make the card white so a shadow will show.", inputMode: "guided", files: solvedTuroMenu(".info-card {\n  background-color: ;\n}"), activeFile: "styles.css", highlightToken: "background-color: ;", tests: [{ id: "turo-menu-background-color-set", kind: "style", selector: ".info-card", prop: "background-color", equals: "rgb(255, 255, 255)", readable: "white", label: "The card has a background of white" }], hints: [{ level: 1, text: "Use the white colour code." }, { level: 2, text: "Write #ffffff after the colon." }], xp: 45 }),
    s26({ id: "turo-menu-border-radius", task: "Round the card corners.", inputMode: "guided", files: solvedTuroMenu(".info-card {\n  background-color: #ffffff;\n  border-radius: ;\n}"), activeFile: "styles.css", highlightToken: "border-radius: ;", tests: [{ id: "turo-menu-border-radius-set", kind: "style", selector: ".info-card", prop: "border-top-left-radius", equals: "10px", readable: "10 pixels", label: "The card has corners curved by 10 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the corner curve." }, { level: 2, text: "Write 10px after the colon." }], xp: 45 }),
    s26({ id: "turo-menu-box-shadow", task: "Lift the card slightly off the page.", inputMode: "guided", files: solvedTuroMenu(".info-card {\n  background-color: #ffffff;\n  border-radius: 10px;\n  box-shadow: ;\n}"), activeFile: "styles.css", highlightToken: "box-shadow: ;", tests: [{ id: "turo-menu-box-shadow-set", kind: "source-matches", file: "styles.css", pattern: "box-shadow\s*:\s*0\s+1px\s+3px", flags: "i", because: "The shadow needs an offset, a blur, and a colour.", label: "The card carries a soft shadow" }], hints: [{ level: 1, text: "A shadow needs a sideways offset, a downward offset, a blur, and a colour." }, { level: 2, text: "Write 0 1px 3px rgba(15, 23, 42, 0.2) after the colon." }], xp: 55 }),
    s26({ id: "turo-menu-padding", task: "Give the lifted card room inside.", inputMode: "guided", files: solvedTuroMenu(".info-card {\n  background-color: #ffffff;\n  border-radius: 10px;\n  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.2);\n  padding: ;\n}"), activeFile: "styles.css", highlightToken: "padding: ;", tests: [{ id: "turo-menu-padding-set", kind: "style", selector: ".info-card", prop: "padding-top", equals: "20px", readable: "20 pixels", label: "The card has room inside of 20 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the inside room." }, { level: 2, text: "Write 20px after the colon." }], xp: 45 }),
    s26({ id: "turo-menu-border", task: "Add a faint edge so the card reads on a white page.", inputMode: "guided", files: solvedTuroMenu(".info-card {\n  background-color: #ffffff;\n  border-radius: 10px;\n  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.2);\n  padding: 20px;\n  border: ;\n}"), activeFile: "styles.css", highlightToken: "border: ;", tests: [{ id: "turo-menu-border-set", kind: "style", selector: ".info-card", prop: "border-top-width", equals: "1px", readable: "a thin grey edge", label: "The card has an edge of a thin grey edge" }], hints: [{ level: 1, text: "A border needs a width, a style, and a colour." }, { level: 2, text: "Write 1px solid #e2e8f0 after the colon." }], xp: 45 }),
    s27({ id: "basketball-league-text-align", task: "Centre the words in the notice.", inputMode: "guided", files: solvedBasketballLeague(".notice-banner {\n  text-align: ;\n}"), activeFile: "styles.css", highlightToken: "text-align: ;", tests: [{ id: "basketball-league-text-align-set", kind: "style", selector: ".notice-banner", prop: "text-align", equals: "center", readable: "centred", label: "The notice aligns its words centred" }], hints: [{ level: 1, text: "Use the alignment value that puts text in the middle." }, { level: 2, text: "Write center after the colon." }], xp: 45 }),
    s27({ id: "basketball-league-margin-left", task: "Let the browser share the space on the left.", inputMode: "guided", files: solvedBasketballLeague(".notice-banner {\n  text-align: center;\n  margin-left: ;\n}"), activeFile: "styles.css", highlightToken: "margin-left: ;", tests: [{ id: "basketball-league-margin-left-set", kind: "source-matches", file: "styles.css", pattern: "margin-left\s*:\s*auto", flags: "i", because: "An automatic left margin is half of centring a block.", label: "The notice has its left margin shared automatically" }], hints: [{ level: 1, text: "Use the value that lets the browser decide." }, { level: 2, text: "Write auto after the colon." }], xp: 55 }),
    s27({ id: "basketball-league-margin-right", task: "Do the same on the right so the notice sits in the middle.", inputMode: "guided", files: solvedBasketballLeague(".notice-banner {\n  text-align: center;\n  margin-left: auto;\n  margin-right: ;\n}"), activeFile: "styles.css", highlightToken: "margin-right: ;", tests: [{ id: "basketball-league-margin-right-set", kind: "source-matches", file: "styles.css", pattern: "margin-right\s*:\s*auto", flags: "i", because: "With both margins automatic, the block sits in the middle.", label: "The notice has its right margin shared automatically" }], hints: [{ level: 1, text: "Use the same value as the left side." }, { level: 2, text: "Write auto after the colon." }], xp: 55 }),
    s27({ id: "basketball-league-max-width", task: "Give the notice a width to be centred within.", inputMode: "guided", files: solvedBasketballLeague(".notice-banner {\n  text-align: center;\n  margin-left: auto;\n  margin-right: auto;\n  max-width: ;\n}"), activeFile: "styles.css", highlightToken: "max-width: ;", tests: [{ id: "basketball-league-max-width-set", kind: "style", selector: ".notice-banner", prop: "max-width", equals: "360px", readable: "360 pixels", label: "The notice stops growing past 360 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the widest it may get." }, { level: 2, text: "Write 360px after the colon." }], xp: 45 }),
    s27({ id: "basketball-league-padding", task: "Give the centred notice room inside.", inputMode: "guided", files: solvedBasketballLeague(".notice-banner {\n  text-align: center;\n  margin-left: auto;\n  margin-right: auto;\n  max-width: 360px;\n  padding: ;\n}"), activeFile: "styles.css", highlightToken: "padding: ;", tests: [{ id: "basketball-league-padding-set", kind: "style", selector: ".notice-banner", prop: "padding-top", equals: "16px", readable: "16 pixels", label: "The notice has room inside of 16 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the inside room." }, { level: 2, text: "Write 16px after the colon." }], xp: 45 }),
    s28({ id: "supply-list-display", task: "Put the two parts of the row on one line.", inputMode: "guided", files: solvedSupplyList(".price-row {\n  display: ;\n}"), activeFile: "styles.css", highlightToken: "display: ;", tests: [{ id: "supply-list-display-set", kind: "style", selector: ".price-row", prop: "display", equals: "flex", readable: "a flex row", label: "The row is laid out as a flex row" }], hints: [{ level: 1, text: "Use the display value that lays children out in a row." }, { level: 2, text: "Write flex after the colon." }], xp: 45 }),
    s28({ id: "supply-list-overflow", task: "Stop long text spilling out of the row.", inputMode: "guided", files: solvedSupplyList(".price-row {\n  display: flex;\n  overflow: ;\n}"), activeFile: "styles.css", highlightToken: "overflow: ;", tests: [{ id: "supply-list-overflow-set", kind: "style", selector: ".price-row", prop: "overflow", equals: "hidden", readable: "clipped", label: "The row has its overflow clipped" }], hints: [{ level: 1, text: "Use the value that clips anything past the edge." }, { level: 2, text: "Write hidden after the colon." }], xp: 45 }),
    s28({ id: "supply-list-white-space", task: "Keep the row on a single line.", inputMode: "guided", files: solvedSupplyList(".price-row {\n  display: flex;\n  overflow: hidden;\n  white-space: ;\n}"), activeFile: "styles.css", highlightToken: "white-space: ;", tests: [{ id: "supply-list-white-space-set", kind: "style", selector: ".price-row", prop: "white-space", equals: "nowrap", readable: "kept on one line", label: "The row has its text kept on one line" }], hints: [{ level: 1, text: "Use the value that refuses to wrap." }, { level: 2, text: "Write nowrap after the colon." }], xp: 45 }),
    s28({ id: "supply-list-text-overflow", task: "Show three dots where the text is cut off.", inputMode: "guided", files: solvedSupplyList(".price-row {\n  display: flex;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ;\n}"), activeFile: "styles.css", highlightToken: "text-overflow: ;", tests: [{ id: "supply-list-text-overflow-set", kind: "style", selector: ".price-row", prop: "text-overflow", equals: "ellipsis", readable: "ends with dots", label: "The row shows clipped text that ends with dots" }], hints: [{ level: 1, text: "Use the value that ends clipped text with dots." }, { level: 2, text: "Write ellipsis after the colon." }], xp: 45 }),
    s28({ id: "supply-list-gap", task: "Keep a gap between the two parts.", inputMode: "guided", files: solvedSupplyList(".price-row {\n  display: flex;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  gap: ;\n}"), activeFile: "styles.css", highlightToken: "gap: ;", tests: [{ id: "supply-list-gap-set", kind: "style", selector: ".price-row", prop: "column-gap", equals: "8px", readable: "8 pixels", label: "The row keeps a gap of 8 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the gap." }, { level: 2, text: "Write 8px after the colon." }], xp: 45 }),
    s29({ id: "fare-table-position", task: "Make the notice the anchor for anything pinned to it.", inputMode: "guided", files: solvedFareTable(".notice-banner {\n  position: ;\n}"), activeFile: "styles.css", highlightToken: "position: ;", tests: [{ id: "fare-table-position-set", kind: "style", selector: ".notice-banner", prop: "position", equals: "relative", readable: "positioned", label: "The notice is positioned" }], hints: [{ level: 1, text: "Use the position value that keeps an element in place but anchors its children." }, { level: 2, text: "Write relative after the colon." }], xp: 45 }),
    s29({ id: "fare-table-padding-top", task: "Leave room at the top for a pinned badge.", inputMode: "guided", files: solvedFareTable(".notice-banner {\n  position: relative;\n  padding-top: ;\n}"), activeFile: "styles.css", highlightToken: "padding-top: ;", tests: [{ id: "fare-table-padding-top-set", kind: "style", selector: ".notice-banner", prop: "padding-top", equals: "28px", readable: "28 pixels", label: "The notice has room above of 28 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the space above." }, { level: 2, text: "Write 28px after the colon." }], xp: 45 }),
    s29({ id: "fare-table-min-height", task: "Stop the notice collapsing when it is short.", inputMode: "guided", files: solvedFareTable(".notice-banner {\n  position: relative;\n  padding-top: 28px;\n  min-height: ;\n}"), activeFile: "styles.css", highlightToken: "min-height: ;", tests: [{ id: "fare-table-min-height-set", kind: "style", selector: ".notice-banner", prop: "min-height", equals: "80px", readable: "80 pixels", label: "The notice stays at least 80 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the shortest it may be." }, { level: 2, text: "Write 80px after the colon." }], xp: 45 }),
    s29({ id: "fare-table-background-color", task: "Tint the notice so the badge will stand out.", inputMode: "guided", files: solvedFareTable(".notice-banner {\n  position: relative;\n  padding-top: 28px;\n  min-height: 80px;\n  background-color: ;\n}"), activeFile: "styles.css", highlightToken: "background-color: ;", tests: [{ id: "fare-table-background-color-set", kind: "style", selector: ".notice-banner", prop: "background-color", equals: "rgb(239, 246, 255)", readable: "pale blue", label: "The notice has a background of pale blue" }], hints: [{ level: 1, text: "Use the pale blue code." }, { level: 2, text: "Write #eff6ff after the colon." }], xp: 45 }),
    s29({ id: "fare-table-border-radius", task: "Round the notice corners.", inputMode: "guided", files: solvedFareTable(".notice-banner {\n  position: relative;\n  padding-top: 28px;\n  min-height: 80px;\n  background-color: #eff6ff;\n  border-radius: ;\n}"), activeFile: "styles.css", highlightToken: "border-radius: ;", tests: [{ id: "fare-table-border-radius-set", kind: "style", selector: ".notice-banner", prop: "border-top-left-radius", equals: "8px", readable: "8 pixels", label: "The notice has corners curved by 8 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the corner curve." }, { level: 2, text: "Write 8px after the colon." }], xp: 45 }),
    s30({ id: "order-slip-var-card-ink", task: "Store the card ink colour under a name you can reuse.", inputMode: "guided", files: solvedOrderSlip(".info-card {\n  --card-ink: ;\n}"), activeFile: "styles.css", highlightToken: "--card-ink: ;", tests: [{ id: "order-slip-var-card-ink-set", kind: "source-matches", file: "styles.css", pattern: "--card-ink\s*:\s*#0f172a", flags: "i", because: "A custom property starts with two dashes and holds a value for later.", label: "The card stores its ink colour as a stored colour" }], hints: [{ level: 1, text: "A name you invent starts with two dashes." }, { level: 2, text: "Write #0f172a after the colon." }], xp: 55 }),
    s30({ id: "order-slip-color", task: "Use the stored colour for the card text.", inputMode: "guided", files: solvedOrderSlip(".info-card {\n  --card-ink: #0f172a;\n  color: ;\n}"), activeFile: "styles.css", highlightToken: "color: ;", tests: [{ id: "order-slip-color-set", kind: "style", selector: ".info-card", prop: "color", equals: "rgb(15, 23, 42)", readable: "the stored ink colour", label: "The card shows its words in the stored ink colour" }], hints: [{ level: 1, text: "Read a stored value with var and the name in brackets." }, { level: 2, text: "Write var(--card-ink) after the colon." }], xp: 45 }),
    s30({ id: "order-slip-var-card-pad", task: "Store the card spacing under a name too.", inputMode: "guided", files: solvedOrderSlip(".info-card {\n  --card-ink: #0f172a;\n  color: var(--card-ink);\n  --card-pad: ;\n}"), activeFile: "styles.css", highlightToken: "--card-pad: ;", tests: [{ id: "order-slip-var-card-pad-set", kind: "source-matches", file: "styles.css", pattern: "--card-pad\s*:\s*18px", flags: "i", because: "Spacing can be stored under a name in the same way a colour can.", label: "The card stores its spacing as a stored size" }], hints: [{ level: 1, text: "Use two dashes, then a pixel value." }, { level: 2, text: "Write 18px after the colon." }], xp: 55 }),
    s30({ id: "order-slip-padding", task: "Use the stored spacing for the card padding.", inputMode: "guided", files: solvedOrderSlip(".info-card {\n  --card-ink: #0f172a;\n  color: var(--card-ink);\n  --card-pad: 18px;\n  padding: ;\n}"), activeFile: "styles.css", highlightToken: "padding: ;", tests: [{ id: "order-slip-padding-set", kind: "style", selector: ".info-card", prop: "padding-top", equals: "18px", readable: "the stored spacing", label: "The card has room inside of the stored spacing" }], hints: [{ level: 1, text: "Read the stored value with var." }, { level: 2, text: "Write var(--card-pad) after the colon." }], xp: 45 }),
    s30({ id: "order-slip-border-radius", task: "Round the card corners.", inputMode: "guided", files: solvedOrderSlip(".info-card {\n  --card-ink: #0f172a;\n  color: var(--card-ink);\n  --card-pad: 18px;\n  padding: var(--card-pad);\n  border-radius: ;\n}"), activeFile: "styles.css", highlightToken: "border-radius: ;", tests: [{ id: "order-slip-border-radius-set", kind: "style", selector: ".info-card", prop: "border-top-left-radius", equals: "10px", readable: "10 pixels", label: "The card has corners curved by 10 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the corner curve." }, { level: 2, text: "Write 10px after the colon." }], xp: 45 }),
    s31({ id: "refill-station-display", task: "Lay the stalls out as a grid.", inputMode: "guided", files: solvedRefillStation(".stall-grid {\n  display: ;\n}"), activeFile: "styles.css", highlightToken: "display: ;", tests: [{ id: "refill-station-display-set", kind: "style", selector: ".stall-grid", prop: "display", equals: "grid", readable: "a grid", label: "The grid is laid out as a grid" }], hints: [{ level: 1, text: "Use the display value made for rows and columns together." }, { level: 2, text: "Write grid after the colon." }], xp: 45 }),
    s31({ id: "refill-station-grid-template-columns", task: "Give the grid two equal columns.", inputMode: "guided", files: solvedRefillStation(".stall-grid {\n  display: grid;\n  grid-template-columns: ;\n}"), activeFile: "styles.css", highlightToken: "grid-template-columns: ;", tests: [{ id: "refill-station-grid-template-columns-set", kind: "source-matches", file: "styles.css", pattern: "grid-template-columns\s*:\s*1fr\s+1fr", flags: "i", because: "Two equal column tracks are written as 1fr 1fr.", label: "The grid is divided into two equal columns" }], hints: [{ level: 1, text: "Name two equal fractions of the free space." }, { level: 2, text: "Write 1fr 1fr after the colon." }], xp: 55 }),
    s31({ id: "refill-station-gap", task: "Space the cells apart.", inputMode: "guided", files: solvedRefillStation(".stall-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: ;\n}"), activeFile: "styles.css", highlightToken: "gap: ;", tests: [{ id: "refill-station-gap-set", kind: "style", selector: ".stall-grid", prop: "row-gap", equals: "12px", readable: "12 pixels", label: "The grid keeps a gap of 12 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the gap." }, { level: 2, text: "Write 12px after the colon." }], xp: 45 }),
    s31({ id: "refill-station-padding", task: "Keep the cells clear of the outer edge.", inputMode: "guided", files: solvedRefillStation(".stall-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n  padding: ;\n}"), activeFile: "styles.css", highlightToken: "padding: ;", tests: [{ id: "refill-station-padding-set", kind: "style", selector: ".stall-grid", prop: "padding-top", equals: "12px", readable: "12 pixels", label: "The grid has room inside of 12 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the inside room." }, { level: 2, text: "Write 12px after the colon." }], xp: 45 }),
    s31({ id: "refill-station-background-color", task: "Tint the grid so the cells read as a set.", inputMode: "guided", files: solvedRefillStation(".stall-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n  padding: 12px;\n  background-color: ;\n}"), activeFile: "styles.css", highlightToken: "background-color: ;", tests: [{ id: "refill-station-background-color-set", kind: "style", selector: ".stall-grid", prop: "background-color", equals: "rgb(241, 245, 249)", readable: "light grey", label: "The grid has a background of light grey" }], hints: [{ level: 1, text: "Use the light grey code." }, { level: 2, text: "Write #f1f5f9 after the colon." }], xp: 45 }),
    s32({ id: "clean-up-max-width", task: "Cap how wide the card can grow.", inputMode: "guided", files: solvedCleanUp(".info-card {\n  max-width: ;\n}"), activeFile: "styles.css", highlightToken: "max-width: ;", tests: [{ id: "clean-up-max-width-set", kind: "style", selector: ".info-card", prop: "max-width", equals: "480px", readable: "480 pixels", label: "The card stops growing past 480 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the widest it may get." }, { level: 2, text: "Write 480px after the colon." }], xp: 45 }),
    s32({ id: "clean-up-width", task: "Let the card shrink to fit a narrow screen.", inputMode: "guided", files: solvedCleanUp(".info-card {\n  max-width: 480px;\n  width: ;\n}"), activeFile: "styles.css", highlightToken: "width: ;", tests: [{ id: "clean-up-width-set", kind: "source-matches", file: "styles.css", pattern: "width\s*:\s*100%", flags: "i", because: "A full-width value lets the card shrink on a narrow screen.", label: "The card takes up the full width available" }], hints: [{ level: 1, text: "Use a percentage of the space available." }, { level: 2, text: "Write 100% after the colon." }], xp: 55 }),
    s32({ id: "clean-up-padding", task: "Give the card room inside.", inputMode: "guided", files: solvedCleanUp(".info-card {\n  max-width: 480px;\n  width: 100%;\n  padding: ;\n}"), activeFile: "styles.css", highlightToken: "padding: ;", tests: [{ id: "clean-up-padding-set", kind: "style", selector: ".info-card", prop: "padding-top", equals: "16px", readable: "16 pixels", label: "The card has room inside of 16 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the inside room." }, { level: 2, text: "Write 16px after the colon." }], xp: 45 }),
    s32({ id: "clean-up-font-size", task: "Set a comfortable reading size.", inputMode: "guided", files: solvedCleanUp(".info-card {\n  max-width: 480px;\n  width: 100%;\n  padding: 16px;\n  font-size: ;\n}"), activeFile: "styles.css", highlightToken: "font-size: ;", tests: [{ id: "clean-up-font-size-set", kind: "style", selector: ".info-card", prop: "font-size", equals: "16px", readable: "16 pixels", label: "The card sets its text at 16 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the text size." }, { level: 2, text: "Write 16px after the colon." }], xp: 45 }),
    s32({ id: "clean-up-box-sizing", task: "Count the padding inside the width, not on top of it.", inputMode: "guided", files: solvedCleanUp(".info-card {\n  max-width: 480px;\n  width: 100%;\n  padding: 16px;\n  font-size: 16px;\n  box-sizing: ;\n}"), activeFile: "styles.css", highlightToken: "box-sizing: ;", tests: [{ id: "clean-up-box-sizing-set", kind: "style", selector: ".info-card", prop: "box-sizing", equals: "border-box", readable: "border box", label: "The card measures itself as border box" }], hints: [{ level: 1, text: "Use the sizing value that includes padding and border." }, { level: 2, text: "Write border-box after the colon." }], xp: 45 }),
    s33({ id: "shop-rate-background-color", task: "Make the card white so a shadow will show.", inputMode: "guided", files: solvedShopRate(".info-card {\n  background-color: ;\n}"), activeFile: "styles.css", highlightToken: "background-color: ;", tests: [{ id: "shop-rate-background-color-set", kind: "style", selector: ".info-card", prop: "background-color", equals: "rgb(255, 255, 255)", readable: "white", label: "The card has a background of white" }], hints: [{ level: 1, text: "Use the white colour code." }, { level: 2, text: "Write #ffffff after the colon." }], xp: 45 }),
    s33({ id: "shop-rate-border-radius", task: "Round the card corners.", inputMode: "guided", files: solvedShopRate(".info-card {\n  background-color: #ffffff;\n  border-radius: ;\n}"), activeFile: "styles.css", highlightToken: "border-radius: ;", tests: [{ id: "shop-rate-border-radius-set", kind: "style", selector: ".info-card", prop: "border-top-left-radius", equals: "10px", readable: "10 pixels", label: "The card has corners curved by 10 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the corner curve." }, { level: 2, text: "Write 10px after the colon." }], xp: 45 }),
    s33({ id: "shop-rate-box-shadow", task: "Lift the card slightly off the page.", inputMode: "guided", files: solvedShopRate(".info-card {\n  background-color: #ffffff;\n  border-radius: 10px;\n  box-shadow: ;\n}"), activeFile: "styles.css", highlightToken: "box-shadow: ;", tests: [{ id: "shop-rate-box-shadow-set", kind: "source-matches", file: "styles.css", pattern: "box-shadow\s*:\s*0\s+1px\s+3px", flags: "i", because: "The shadow needs an offset, a blur, and a colour.", label: "The card carries a soft shadow" }], hints: [{ level: 1, text: "A shadow needs a sideways offset, a downward offset, a blur, and a colour." }, { level: 2, text: "Write 0 1px 3px rgba(15, 23, 42, 0.2) after the colon." }], xp: 55 }),
    s33({ id: "shop-rate-padding", task: "Give the lifted card room inside.", inputMode: "guided", files: solvedShopRate(".info-card {\n  background-color: #ffffff;\n  border-radius: 10px;\n  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.2);\n  padding: ;\n}"), activeFile: "styles.css", highlightToken: "padding: ;", tests: [{ id: "shop-rate-padding-set", kind: "style", selector: ".info-card", prop: "padding-top", equals: "20px", readable: "20 pixels", label: "The card has room inside of 20 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the inside room." }, { level: 2, text: "Write 20px after the colon." }], xp: 45 }),
    s33({ id: "shop-rate-border", task: "Add a faint edge so the card reads on a white page.", inputMode: "guided", files: solvedShopRate(".info-card {\n  background-color: #ffffff;\n  border-radius: 10px;\n  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.2);\n  padding: 20px;\n  border: ;\n}"), activeFile: "styles.css", highlightToken: "border: ;", tests: [{ id: "shop-rate-border-set", kind: "style", selector: ".info-card", prop: "border-top-width", equals: "1px", readable: "a thin grey edge", label: "The card has an edge of a thin grey edge" }], hints: [{ level: 1, text: "A border needs a width, a style, and a colour." }, { level: 2, text: "Write 1px solid #e2e8f0 after the colon." }], xp: 45 }),
    s34({ id: "programme-alignment-text-align", task: "Centre the words in the notice.", inputMode: "guided", files: solvedProgrammeAlignment(".notice-banner {\n  text-align: ;\n}"), activeFile: "styles.css", highlightToken: "text-align: ;", tests: [{ id: "programme-alignment-text-align-set", kind: "style", selector: ".notice-banner", prop: "text-align", equals: "center", readable: "centred", label: "The notice aligns its words centred" }], hints: [{ level: 1, text: "Use the alignment value that puts text in the middle." }, { level: 2, text: "Write center after the colon." }], xp: 45 }),
    s34({ id: "programme-alignment-margin-left", task: "Let the browser share the space on the left.", inputMode: "guided", files: solvedProgrammeAlignment(".notice-banner {\n  text-align: center;\n  margin-left: ;\n}"), activeFile: "styles.css", highlightToken: "margin-left: ;", tests: [{ id: "programme-alignment-margin-left-set", kind: "source-matches", file: "styles.css", pattern: "margin-left\s*:\s*auto", flags: "i", because: "An automatic left margin is half of centring a block.", label: "The notice has its left margin shared automatically" }], hints: [{ level: 1, text: "Use the value that lets the browser decide." }, { level: 2, text: "Write auto after the colon." }], xp: 55 }),
    s34({ id: "programme-alignment-margin-right", task: "Do the same on the right so the notice sits in the middle.", inputMode: "guided", files: solvedProgrammeAlignment(".notice-banner {\n  text-align: center;\n  margin-left: auto;\n  margin-right: ;\n}"), activeFile: "styles.css", highlightToken: "margin-right: ;", tests: [{ id: "programme-alignment-margin-right-set", kind: "source-matches", file: "styles.css", pattern: "margin-right\s*:\s*auto", flags: "i", because: "With both margins automatic, the block sits in the middle.", label: "The notice has its right margin shared automatically" }], hints: [{ level: 1, text: "Use the same value as the left side." }, { level: 2, text: "Write auto after the colon." }], xp: 55 }),
    s34({ id: "programme-alignment-max-width", task: "Give the notice a width to be centred within.", inputMode: "guided", files: solvedProgrammeAlignment(".notice-banner {\n  text-align: center;\n  margin-left: auto;\n  margin-right: auto;\n  max-width: ;\n}"), activeFile: "styles.css", highlightToken: "max-width: ;", tests: [{ id: "programme-alignment-max-width-set", kind: "style", selector: ".notice-banner", prop: "max-width", equals: "360px", readable: "360 pixels", label: "The notice stops growing past 360 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the widest it may get." }, { level: 2, text: "Write 360px after the colon." }], xp: 45 }),
    s34({ id: "programme-alignment-padding", task: "Give the centred notice room inside.", inputMode: "guided", files: solvedProgrammeAlignment(".notice-banner {\n  text-align: center;\n  margin-left: auto;\n  margin-right: auto;\n  max-width: 360px;\n  padding: ;\n}"), activeFile: "styles.css", highlightToken: "padding: ;", tests: [{ id: "programme-alignment-padding-set", kind: "style", selector: ".notice-banner", prop: "padding-top", equals: "16px", readable: "16 pixels", label: "The notice has room inside of 16 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the inside room." }, { level: 2, text: "Write 16px after the colon." }], xp: 45 }),
    s35({ id: "retailer-price-display", task: "Put the two parts of the row on one line.", inputMode: "guided", files: solvedRetailerPrice(".price-row {\n  display: ;\n}"), activeFile: "styles.css", highlightToken: "display: ;", tests: [{ id: "retailer-price-display-set", kind: "style", selector: ".price-row", prop: "display", equals: "flex", readable: "a flex row", label: "The row is laid out as a flex row" }], hints: [{ level: 1, text: "Use the display value that lays children out in a row." }, { level: 2, text: "Write flex after the colon." }], xp: 45 }),
    s35({ id: "retailer-price-overflow", task: "Stop long text spilling out of the row.", inputMode: "guided", files: solvedRetailerPrice(".price-row {\n  display: flex;\n  overflow: ;\n}"), activeFile: "styles.css", highlightToken: "overflow: ;", tests: [{ id: "retailer-price-overflow-set", kind: "style", selector: ".price-row", prop: "overflow", equals: "hidden", readable: "clipped", label: "The row has its overflow clipped" }], hints: [{ level: 1, text: "Use the value that clips anything past the edge." }, { level: 2, text: "Write hidden after the colon." }], xp: 45 }),
    s35({ id: "retailer-price-white-space", task: "Keep the row on a single line.", inputMode: "guided", files: solvedRetailerPrice(".price-row {\n  display: flex;\n  overflow: hidden;\n  white-space: ;\n}"), activeFile: "styles.css", highlightToken: "white-space: ;", tests: [{ id: "retailer-price-white-space-set", kind: "style", selector: ".price-row", prop: "white-space", equals: "nowrap", readable: "kept on one line", label: "The row has its text kept on one line" }], hints: [{ level: 1, text: "Use the value that refuses to wrap." }, { level: 2, text: "Write nowrap after the colon." }], xp: 45 }),
    s35({ id: "retailer-price-text-overflow", task: "Show three dots where the text is cut off.", inputMode: "guided", files: solvedRetailerPrice(".price-row {\n  display: flex;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ;\n}"), activeFile: "styles.css", highlightToken: "text-overflow: ;", tests: [{ id: "retailer-price-text-overflow-set", kind: "style", selector: ".price-row", prop: "text-overflow", equals: "ellipsis", readable: "ends with dots", label: "The row shows clipped text that ends with dots" }], hints: [{ level: 1, text: "Use the value that ends clipped text with dots." }, { level: 2, text: "Write ellipsis after the colon." }], xp: 45 }),
    s35({ id: "retailer-price-gap", task: "Keep a gap between the two parts.", inputMode: "guided", files: solvedRetailerPrice(".price-row {\n  display: flex;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  gap: ;\n}"), activeFile: "styles.css", highlightToken: "gap: ;", tests: [{ id: "retailer-price-gap-set", kind: "style", selector: ".price-row", prop: "column-gap", equals: "8px", readable: "8 pixels", label: "The row keeps a gap of 8 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the gap." }, { level: 2, text: "Write 8px after the colon." }], xp: 45 }),
    s36({ id: "shop-receipt-position", task: "Make the notice the anchor for anything pinned to it.", inputMode: "guided", files: solvedShopReceipt(".notice-banner {\n  position: ;\n}"), activeFile: "styles.css", highlightToken: "position: ;", tests: [{ id: "shop-receipt-position-set", kind: "style", selector: ".notice-banner", prop: "position", equals: "relative", readable: "positioned", label: "The notice is positioned" }], hints: [{ level: 1, text: "Use the position value that keeps an element in place but anchors its children." }, { level: 2, text: "Write relative after the colon." }], xp: 45 }),
    s36({ id: "shop-receipt-padding-top", task: "Leave room at the top for a pinned badge.", inputMode: "guided", files: solvedShopReceipt(".notice-banner {\n  position: relative;\n  padding-top: ;\n}"), activeFile: "styles.css", highlightToken: "padding-top: ;", tests: [{ id: "shop-receipt-padding-top-set", kind: "style", selector: ".notice-banner", prop: "padding-top", equals: "28px", readable: "28 pixels", label: "The notice has room above of 28 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the space above." }, { level: 2, text: "Write 28px after the colon." }], xp: 45 }),
    s36({ id: "shop-receipt-min-height", task: "Stop the notice collapsing when it is short.", inputMode: "guided", files: solvedShopReceipt(".notice-banner {\n  position: relative;\n  padding-top: 28px;\n  min-height: ;\n}"), activeFile: "styles.css", highlightToken: "min-height: ;", tests: [{ id: "shop-receipt-min-height-set", kind: "style", selector: ".notice-banner", prop: "min-height", equals: "80px", readable: "80 pixels", label: "The notice stays at least 80 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the shortest it may be." }, { level: 2, text: "Write 80px after the colon." }], xp: 45 }),
    s36({ id: "shop-receipt-background-color", task: "Tint the notice so the badge will stand out.", inputMode: "guided", files: solvedShopReceipt(".notice-banner {\n  position: relative;\n  padding-top: 28px;\n  min-height: 80px;\n  background-color: ;\n}"), activeFile: "styles.css", highlightToken: "background-color: ;", tests: [{ id: "shop-receipt-background-color-set", kind: "style", selector: ".notice-banner", prop: "background-color", equals: "rgb(239, 246, 255)", readable: "pale blue", label: "The notice has a background of pale blue" }], hints: [{ level: 1, text: "Use the pale blue code." }, { level: 2, text: "Write #eff6ff after the colon." }], xp: 45 }),
    s36({ id: "shop-receipt-border-radius", task: "Round the notice corners.", inputMode: "guided", files: solvedShopReceipt(".notice-banner {\n  position: relative;\n  padding-top: 28px;\n  min-height: 80px;\n  background-color: #eff6ff;\n  border-radius: ;\n}"), activeFile: "styles.css", highlightToken: "border-radius: ;", tests: [{ id: "shop-receipt-border-radius-set", kind: "style", selector: ".notice-banner", prop: "border-top-left-radius", equals: "8px", readable: "8 pixels", label: "The notice has corners curved by 8 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the corner curve." }, { level: 2, text: "Write 8px after the colon." }], xp: 45 }),
    s37({ id: "stock-list-var-card-ink", task: "Store the card ink colour under a name you can reuse.", inputMode: "guided", files: solvedStockList(".info-card {\n  --card-ink: ;\n}"), activeFile: "styles.css", highlightToken: "--card-ink: ;", tests: [{ id: "stock-list-var-card-ink-set", kind: "source-matches", file: "styles.css", pattern: "--card-ink\s*:\s*#0f172a", flags: "i", because: "A custom property starts with two dashes and holds a value for later.", label: "The card stores its ink colour as a stored colour" }], hints: [{ level: 1, text: "A name you invent starts with two dashes." }, { level: 2, text: "Write #0f172a after the colon." }], xp: 55 }),
    s37({ id: "stock-list-color", task: "Use the stored colour for the card text.", inputMode: "guided", files: solvedStockList(".info-card {\n  --card-ink: #0f172a;\n  color: ;\n}"), activeFile: "styles.css", highlightToken: "color: ;", tests: [{ id: "stock-list-color-set", kind: "style", selector: ".info-card", prop: "color", equals: "rgb(15, 23, 42)", readable: "the stored ink colour", label: "The card shows its words in the stored ink colour" }], hints: [{ level: 1, text: "Read a stored value with var and the name in brackets." }, { level: 2, text: "Write var(--card-ink) after the colon." }], xp: 45 }),
    s37({ id: "stock-list-var-card-pad", task: "Store the card spacing under a name too.", inputMode: "guided", files: solvedStockList(".info-card {\n  --card-ink: #0f172a;\n  color: var(--card-ink);\n  --card-pad: ;\n}"), activeFile: "styles.css", highlightToken: "--card-pad: ;", tests: [{ id: "stock-list-var-card-pad-set", kind: "source-matches", file: "styles.css", pattern: "--card-pad\s*:\s*18px", flags: "i", because: "Spacing can be stored under a name in the same way a colour can.", label: "The card stores its spacing as a stored size" }], hints: [{ level: 1, text: "Use two dashes, then a pixel value." }, { level: 2, text: "Write 18px after the colon." }], xp: 55 }),
    s37({ id: "stock-list-padding", task: "Use the stored spacing for the card padding.", inputMode: "guided", files: solvedStockList(".info-card {\n  --card-ink: #0f172a;\n  color: var(--card-ink);\n  --card-pad: 18px;\n  padding: ;\n}"), activeFile: "styles.css", highlightToken: "padding: ;", tests: [{ id: "stock-list-padding-set", kind: "style", selector: ".info-card", prop: "padding-top", equals: "18px", readable: "the stored spacing", label: "The card has room inside of the stored spacing" }], hints: [{ level: 1, text: "Read the stored value with var." }, { level: 2, text: "Write var(--card-pad) after the colon." }], xp: 45 }),
    s37({ id: "stock-list-border-radius", task: "Round the card corners.", inputMode: "guided", files: solvedStockList(".info-card {\n  --card-ink: #0f172a;\n  color: var(--card-ink);\n  --card-pad: 18px;\n  padding: var(--card-pad);\n  border-radius: ;\n}"), activeFile: "styles.css", highlightToken: "border-radius: ;", tests: [{ id: "stock-list-border-radius-set", kind: "style", selector: ".info-card", prop: "border-top-left-radius", equals: "10px", readable: "10 pixels", label: "The card has corners curved by 10 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the corner curve." }, { level: 2, text: "Write 10px after the colon." }], xp: 45 }),
    s38({ id: "id-application-padding", task: "Give the card room inside its edges.", inputMode: "guided", files: solvedIdApplication(".info-card {\n  padding: ;\n}"), activeFile: "styles.css", highlightToken: "padding: ;", tests: [{ id: "id-application-padding-set", kind: "style", selector: ".info-card", prop: "padding-top", equals: "16px", readable: "16 pixels", label: "The card has room inside of 16 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the inside room." }, { level: 2, text: "Write 16px after the colon." }], xp: 45 }),
    s38({ id: "id-application-background-color", task: "Make the card stand out from the page.", inputMode: "guided", files: solvedIdApplication(".info-card {\n  padding: 16px;\n  background-color: ;\n}"), activeFile: "styles.css", highlightToken: "background-color: ;", tests: [{ id: "id-application-background-color-set", kind: "style", selector: ".info-card", prop: "background-color", equals: "rgb(255, 255, 255)", readable: "white", label: "The card has a background of white" }], hints: [{ level: 1, text: "Use the white colour code." }, { level: 2, text: "Write #ffffff after the colon." }], xp: 45 }),
    s38({ id: "id-application-border-radius", task: "Soften the corners of the card.", inputMode: "guided", files: solvedIdApplication(".info-card {\n  padding: 16px;\n  background-color: #ffffff;\n  border-radius: ;\n}"), activeFile: "styles.css", highlightToken: "border-radius: ;", tests: [{ id: "id-application-border-radius-set", kind: "style", selector: ".info-card", prop: "border-top-left-radius", equals: "12px", readable: "12 pixels", label: "The card has corners curved by 12 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the corner curve." }, { level: 2, text: "Write 12px after the colon." }], xp: 45 }),
    s38({ id: "id-application-margin-bottom", task: "Leave space below the card.", inputMode: "guided", files: solvedIdApplication(".info-card {\n  padding: 16px;\n  background-color: #ffffff;\n  border-radius: 12px;\n  margin-bottom: ;\n}"), activeFile: "styles.css", highlightToken: "margin-bottom: ;", tests: [{ id: "id-application-margin-bottom-set", kind: "style", selector: ".info-card", prop: "margin-bottom", equals: "24px", readable: "24 pixels", label: "The card leaves a gap below of 24 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the gap below." }, { level: 2, text: "Write 24px after the colon." }], xp: 45 }),
    s38({ id: "id-application-max-width", task: "Stop the card growing too wide to read.", inputMode: "guided", files: solvedIdApplication(".info-card {\n  padding: 16px;\n  background-color: #ffffff;\n  border-radius: 12px;\n  margin-bottom: 24px;\n  max-width: ;\n}"), activeFile: "styles.css", highlightToken: "max-width: ;", tests: [{ id: "id-application-max-width-set", kind: "style", selector: ".info-card", prop: "max-width", equals: "400px", readable: "400 pixels", label: "The card stops growing past 400 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the widest it may get." }, { level: 2, text: "Write 400px after the colon." }], xp: 45 }),
    s39({ id: "store-credit-border-left-width", task: "Give the notice a thick stripe down its left side.", inputMode: "guided", files: solvedStoreCredit(".notice-banner {\n  border-left-width: ;\n}"), activeFile: "styles.css", highlightToken: "border-left-width: ;", tests: [{ id: "store-credit-border-left-width-set", kind: "style", selector: ".notice-banner", prop: "border-left-width", equals: "4px", readable: "4 pixels", label: "The notice has a left stripe of 4 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the stripe width." }, { level: 2, text: "Write 4px after the colon." }], xp: 45 }),
    s39({ id: "store-credit-border-left-style", task: "Make the left stripe a solid line.", inputMode: "guided", files: solvedStoreCredit(".notice-banner {\n  border-left-width: 4px;\n  border-left-style: ;\n}"), activeFile: "styles.css", highlightToken: "border-left-style: ;", tests: [{ id: "store-credit-border-left-style-set", kind: "style", selector: ".notice-banner", prop: "border-left-style", equals: "solid", readable: "a solid line", label: "The notice draws its stripe as a solid line" }], hints: [{ level: 1, text: "Use the plain unbroken line style." }, { level: 2, text: "Write solid after the colon." }], xp: 45 }),
    s39({ id: "store-credit-border-left-color", task: "Colour the stripe amber so it reads as a warning.", inputMode: "guided", files: solvedStoreCredit(".notice-banner {\n  border-left-width: 4px;\n  border-left-style: solid;\n  border-left-color: ;\n}"), activeFile: "styles.css", highlightToken: "border-left-color: ;", tests: [{ id: "store-credit-border-left-color-set", kind: "style", selector: ".notice-banner", prop: "border-left-color", equals: "rgb(180, 83, 9)", readable: "amber", label: "The notice has a stripe coloured amber" }], hints: [{ level: 1, text: "Use the amber colour code named in the task." }, { level: 2, text: "Write #b45309 after the colon." }], xp: 45 }),
    s39({ id: "store-credit-background-color", task: "Tint the notice background to match the stripe.", inputMode: "guided", files: solvedStoreCredit(".notice-banner {\n  border-left-width: 4px;\n  border-left-style: solid;\n  border-left-color: #b45309;\n  background-color: ;\n}"), activeFile: "styles.css", highlightToken: "background-color: ;", tests: [{ id: "store-credit-background-color-set", kind: "style", selector: ".notice-banner", prop: "background-color", equals: "rgb(255, 251, 235)", readable: "pale amber", label: "The notice has a background of pale amber" }], hints: [{ level: 1, text: "Use the pale amber code." }, { level: 2, text: "Write #fffbeb after the colon." }], xp: 45 }),
    s39({ id: "store-credit-padding-left", task: "Keep the words clear of the stripe.", inputMode: "guided", files: solvedStoreCredit(".notice-banner {\n  border-left-width: 4px;\n  border-left-style: solid;\n  border-left-color: #b45309;\n  background-color: #fffbeb;\n  padding-left: ;\n}"), activeFile: "styles.css", highlightToken: "padding-left: ;", tests: [{ id: "store-credit-padding-left-set", kind: "style", selector: ".notice-banner", prop: "padding-left", equals: "16px", readable: "16 pixels", label: "The notice keeps its words clear by 16 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the space after the stripe." }, { level: 2, text: "Write 16px after the colon." }], xp: 45 }),
    s40({ id: "notice-typography-font-size", task: "Make the card text large enough to read on a phone.", inputMode: "guided", files: solvedNoticeTypography(".info-card {\n  font-size: ;\n}"), activeFile: "styles.css", highlightToken: "font-size: ;", tests: [{ id: "notice-typography-font-size-set", kind: "style", selector: ".info-card", prop: "font-size", equals: "18px", readable: "18 pixels", label: "The card text sets its text at 18 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the text size." }, { level: 2, text: "Write 18px after the colon." }], xp: 45 }),
    s40({ id: "notice-typography-line-height", task: "Open up the space between lines.", inputMode: "guided", files: solvedNoticeTypography(".info-card {\n  font-size: 18px;\n  line-height: ;\n}"), activeFile: "styles.css", highlightToken: "line-height: ;", tests: [{ id: "notice-typography-line-height-set", kind: "style", selector: ".info-card", prop: "line-height", equals: "28.8px", readable: "1.6 times the text size", label: "The card text spaces its lines by 1.6 times the text size" }], hints: [{ level: 1, text: "Use a number with no unit." }, { level: 2, text: "Write 1.6 after the colon." }], xp: 45 }),
    s40({ id: "notice-typography-color", task: "Darken the words so they have enough contrast.", inputMode: "guided", files: solvedNoticeTypography(".info-card {\n  font-size: 18px;\n  line-height: 1.6;\n  color: ;\n}"), activeFile: "styles.css", highlightToken: "color: ;", tests: [{ id: "notice-typography-color-set", kind: "style", selector: ".info-card", prop: "color", equals: "rgb(31, 41, 55)", readable: "dark slate", label: "The card text shows its words in dark slate" }], hints: [{ level: 1, text: "Use the dark slate code named in the task." }, { level: 2, text: "Write #1f2937 after the colon." }], xp: 45 }),
    s40({ id: "notice-typography-font-weight", task: "Give the card text a little more weight.", inputMode: "guided", files: solvedNoticeTypography(".info-card {\n  font-size: 18px;\n  line-height: 1.6;\n  color: #1f2937;\n  font-weight: ;\n}"), activeFile: "styles.css", highlightToken: "font-weight: ;", tests: [{ id: "notice-typography-font-weight-set", kind: "style", selector: ".info-card", prop: "font-weight", equals: "500", readable: "medium", label: "The card text sets its weight to medium" }], hints: [{ level: 1, text: "Use the medium weight number." }, { level: 2, text: "Write 500 after the colon." }], xp: 45 }),
    s40({ id: "notice-typography-letter-spacing", task: "Loosen the letters very slightly.", inputMode: "guided", files: solvedNoticeTypography(".info-card {\n  font-size: 18px;\n  line-height: 1.6;\n  color: #1f2937;\n  font-weight: 500;\n  letter-spacing: ;\n}"), activeFile: "styles.css", highlightToken: "letter-spacing: ;", tests: [{ id: "notice-typography-letter-spacing-set", kind: "style", selector: ".info-card", prop: "letter-spacing", equals: "0.2px", readable: "0.2 pixels", label: "The card text spaces its letters by 0.2 pixels" }], hints: [{ level: 1, text: "Use a small pixel value." }, { level: 2, text: "Write 0.2px after the colon." }], xp: 45 }),
    s41({ id: "flex-row-display", task: "Put the label and the amount on one line.", inputMode: "guided", files: solvedFlexRow(".price-row {\n  display: ;\n}"), activeFile: "styles.css", highlightToken: "display: ;", tests: [{ id: "flex-row-display-set", kind: "style", selector: ".price-row", prop: "display", equals: "flex", readable: "a flex row", label: "The row is laid out as a flex row" }], hints: [{ level: 1, text: "Use the display value that lays children out in a row." }, { level: 2, text: "Write flex after the colon." }], xp: 45 }),
    s41({ id: "flex-row-justify-content", task: "Push the amount to the far right.", inputMode: "guided", files: solvedFlexRow(".price-row {\n  display: flex;\n  justify-content: ;\n}"), activeFile: "styles.css", highlightToken: "justify-content: ;", tests: [{ id: "flex-row-justify-content-set", kind: "style", selector: ".price-row", prop: "justify-content", equals: "space-between", readable: "pushed apart", label: "The row spaces its children pushed apart" }], hints: [{ level: 1, text: "Use the value that puts all spare space between the two." }, { level: 2, text: "Write space-between after the colon." }], xp: 45 }),
    s41({ id: "flex-row-align-items", task: "Line the two up through their middles.", inputMode: "guided", files: solvedFlexRow(".price-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: ;\n}"), activeFile: "styles.css", highlightToken: "align-items: ;", tests: [{ id: "flex-row-align-items-set", kind: "style", selector: ".price-row", prop: "align-items", equals: "center", readable: "centred across", label: "The row lines its children up centred across" }], hints: [{ level: 1, text: "Use the value that centres children across the row." }, { level: 2, text: "Write center after the colon." }], xp: 45 }),
    s41({ id: "flex-row-gap", task: "Keep a minimum gap between the two.", inputMode: "guided", files: solvedFlexRow(".price-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: ;\n}"), activeFile: "styles.css", highlightToken: "gap: ;", tests: [{ id: "flex-row-gap-set", kind: "style", selector: ".price-row", prop: "column-gap", equals: "12px", readable: "12 pixels", label: "The row keeps a gap of 12 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the gap." }, { level: 2, text: "Write 12px after the colon." }], xp: 45 }),
    s41({ id: "flex-row-padding", task: "Give the row room inside.", inputMode: "guided", files: solvedFlexRow(".price-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n  padding: ;\n}"), activeFile: "styles.css", highlightToken: "padding: ;", tests: [{ id: "flex-row-padding-set", kind: "style", selector: ".price-row", prop: "padding-top", equals: "12px", readable: "12 pixels", label: "The row has room inside of 12 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the inside room." }, { level: 2, text: "Write 12px after the colon." }], xp: 45 }),
    s42({ id: "price-list-display", task: "Take control of how the list stacks.", inputMode: "guided", files: solvedPriceList(".item-list {\n  display: ;\n}"), activeFile: "styles.css", highlightToken: "display: ;", tests: [{ id: "price-list-display-set", kind: "style", selector: ".item-list", prop: "display", equals: "flex", readable: "a flex box", label: "The list is laid out as a flex box" }], hints: [{ level: 1, text: "Use the display value that lets you control direction and gaps." }, { level: 2, text: "Write flex after the colon." }], xp: 45 }),
    s42({ id: "price-list-flex-direction", task: "Stack the heading and the list top to bottom.", inputMode: "guided", files: solvedPriceList(".item-list {\n  display: flex;\n  flex-direction: ;\n}"), activeFile: "styles.css", highlightToken: "flex-direction: ;", tests: [{ id: "price-list-flex-direction-set", kind: "style", selector: ".item-list", prop: "flex-direction", equals: "column", readable: "top to bottom", label: "The list runs top to bottom" }], hints: [{ level: 1, text: "Use the direction value that runs down the page." }, { level: 2, text: "Write column after the colon." }], xp: 45 }),
    s42({ id: "price-list-gap", task: "Space the stacked parts evenly.", inputMode: "guided", files: solvedPriceList(".item-list {\n  display: flex;\n  flex-direction: column;\n  gap: ;\n}"), activeFile: "styles.css", highlightToken: "gap: ;", tests: [{ id: "price-list-gap-set", kind: "style", selector: ".item-list", prop: "row-gap", equals: "8px", readable: "8 pixels", label: "The list keeps a gap of 8 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the gap." }, { level: 2, text: "Write 8px after the colon." }], xp: 45 }),
    s42({ id: "price-list-background-color", task: "Tint the list so it reads as one block.", inputMode: "guided", files: solvedPriceList(".item-list {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  background-color: ;\n}"), activeFile: "styles.css", highlightToken: "background-color: ;", tests: [{ id: "price-list-background-color-set", kind: "style", selector: ".item-list", prop: "background-color", equals: "rgb(248, 250, 252)", readable: "pale grey", label: "The list has a background of pale grey" }], hints: [{ level: 1, text: "Use the pale grey code." }, { level: 2, text: "Write #f8fafc after the colon." }], xp: 45 }),
    s42({ id: "price-list-padding", task: "Keep the list clear of its own edges.", inputMode: "guided", files: solvedPriceList(".item-list {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  background-color: #f8fafc;\n  padding: ;\n}"), activeFile: "styles.css", highlightToken: "padding: ;", tests: [{ id: "price-list-padding-set", kind: "style", selector: ".item-list", prop: "padding-top", equals: "16px", readable: "16 pixels", label: "The list has room inside of 16 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the inside room." }, { level: 2, text: "Write 16px after the colon." }], xp: 45 }),
    s43({ id: "centre-notice-display", task: "Lay the stalls out as a grid.", inputMode: "guided", files: solvedCentreNotice(".stall-grid {\n  display: ;\n}"), activeFile: "styles.css", highlightToken: "display: ;", tests: [{ id: "centre-notice-display-set", kind: "style", selector: ".stall-grid", prop: "display", equals: "grid", readable: "a grid", label: "The grid is laid out as a grid" }], hints: [{ level: 1, text: "Use the display value made for rows and columns together." }, { level: 2, text: "Write grid after the colon." }], xp: 45 }),
    s43({ id: "centre-notice-grid-template-columns", task: "Give the grid two equal columns.", inputMode: "guided", files: solvedCentreNotice(".stall-grid {\n  display: grid;\n  grid-template-columns: ;\n}"), activeFile: "styles.css", highlightToken: "grid-template-columns: ;", tests: [{ id: "centre-notice-grid-template-columns-set", kind: "source-matches", file: "styles.css", pattern: "grid-template-columns\s*:\s*1fr\s+1fr", flags: "i", because: "Two equal column tracks are written as 1fr 1fr.", label: "The grid is divided into two equal columns" }], hints: [{ level: 1, text: "Name two equal fractions of the free space." }, { level: 2, text: "Write 1fr 1fr after the colon." }], xp: 55 }),
    s43({ id: "centre-notice-gap", task: "Space the cells apart.", inputMode: "guided", files: solvedCentreNotice(".stall-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: ;\n}"), activeFile: "styles.css", highlightToken: "gap: ;", tests: [{ id: "centre-notice-gap-set", kind: "style", selector: ".stall-grid", prop: "row-gap", equals: "12px", readable: "12 pixels", label: "The grid keeps a gap of 12 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the gap." }, { level: 2, text: "Write 12px after the colon." }], xp: 45 }),
    s43({ id: "centre-notice-padding", task: "Keep the cells clear of the outer edge.", inputMode: "guided", files: solvedCentreNotice(".stall-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n  padding: ;\n}"), activeFile: "styles.css", highlightToken: "padding: ;", tests: [{ id: "centre-notice-padding-set", kind: "style", selector: ".stall-grid", prop: "padding-top", equals: "12px", readable: "12 pixels", label: "The grid has room inside of 12 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the inside room." }, { level: 2, text: "Write 12px after the colon." }], xp: 45 }),
    s43({ id: "centre-notice-background-color", task: "Tint the grid so the cells read as a set.", inputMode: "guided", files: solvedCentreNotice(".stall-grid {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 12px;\n  padding: 12px;\n  background-color: ;\n}"), activeFile: "styles.css", highlightToken: "background-color: ;", tests: [{ id: "centre-notice-background-color-set", kind: "style", selector: ".stall-grid", prop: "background-color", equals: "rgb(241, 245, 249)", readable: "light grey", label: "The grid has a background of light grey" }], hints: [{ level: 1, text: "Use the light grey code." }, { level: 2, text: "Write #f1f5f9 after the colon." }], xp: 45 }),
    s44({ id: "board-responsive-max-width", task: "Cap how wide the card can grow.", inputMode: "guided", files: solvedBoardResponsive(".info-card {\n  max-width: ;\n}"), activeFile: "styles.css", highlightToken: "max-width: ;", tests: [{ id: "board-responsive-max-width-set", kind: "style", selector: ".info-card", prop: "max-width", equals: "480px", readable: "480 pixels", label: "The card stops growing past 480 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the widest it may get." }, { level: 2, text: "Write 480px after the colon." }], xp: 45 }),
    s44({ id: "board-responsive-width", task: "Let the card shrink to fit a narrow screen.", inputMode: "guided", files: solvedBoardResponsive(".info-card {\n  max-width: 480px;\n  width: ;\n}"), activeFile: "styles.css", highlightToken: "width: ;", tests: [{ id: "board-responsive-width-set", kind: "source-matches", file: "styles.css", pattern: "width\s*:\s*100%", flags: "i", because: "A full-width value lets the card shrink on a narrow screen.", label: "The card takes up the full width available" }], hints: [{ level: 1, text: "Use a percentage of the space available." }, { level: 2, text: "Write 100% after the colon." }], xp: 55 }),
    s44({ id: "board-responsive-padding", task: "Give the card room inside.", inputMode: "guided", files: solvedBoardResponsive(".info-card {\n  max-width: 480px;\n  width: 100%;\n  padding: ;\n}"), activeFile: "styles.css", highlightToken: "padding: ;", tests: [{ id: "board-responsive-padding-set", kind: "style", selector: ".info-card", prop: "padding-top", equals: "16px", readable: "16 pixels", label: "The card has room inside of 16 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the inside room." }, { level: 2, text: "Write 16px after the colon." }], xp: 45 }),
    s44({ id: "board-responsive-font-size", task: "Set a comfortable reading size.", inputMode: "guided", files: solvedBoardResponsive(".info-card {\n  max-width: 480px;\n  width: 100%;\n  padding: 16px;\n  font-size: ;\n}"), activeFile: "styles.css", highlightToken: "font-size: ;", tests: [{ id: "board-responsive-font-size-set", kind: "style", selector: ".info-card", prop: "font-size", equals: "16px", readable: "16 pixels", label: "The card sets its text at 16 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the text size." }, { level: 2, text: "Write 16px after the colon." }], xp: 45 }),
    s44({ id: "board-responsive-box-sizing", task: "Count the padding inside the width, not on top of it.", inputMode: "guided", files: solvedBoardResponsive(".info-card {\n  max-width: 480px;\n  width: 100%;\n  padding: 16px;\n  font-size: 16px;\n  box-sizing: ;\n}"), activeFile: "styles.css", highlightToken: "box-sizing: ;", tests: [{ id: "board-responsive-box-sizing-set", kind: "style", selector: ".info-card", prop: "box-sizing", equals: "border-box", readable: "border box", label: "The card measures itself as border box" }], hints: [{ level: 1, text: "Use the sizing value that includes padding and border." }, { level: 2, text: "Write border-box after the colon." }], xp: 45 }),
    s45({ id: "stall-sign-background-color", task: "Make the card white so a shadow will show.", inputMode: "guided", files: solvedStallSign(".info-card {\n  background-color: ;\n}"), activeFile: "styles.css", highlightToken: "background-color: ;", tests: [{ id: "stall-sign-background-color-set", kind: "style", selector: ".info-card", prop: "background-color", equals: "rgb(255, 255, 255)", readable: "white", label: "The card has a background of white" }], hints: [{ level: 1, text: "Use the white colour code." }, { level: 2, text: "Write #ffffff after the colon." }], xp: 45 }),
    s45({ id: "stall-sign-border-radius", task: "Round the card corners.", inputMode: "guided", files: solvedStallSign(".info-card {\n  background-color: #ffffff;\n  border-radius: ;\n}"), activeFile: "styles.css", highlightToken: "border-radius: ;", tests: [{ id: "stall-sign-border-radius-set", kind: "style", selector: ".info-card", prop: "border-top-left-radius", equals: "10px", readable: "10 pixels", label: "The card has corners curved by 10 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the corner curve." }, { level: 2, text: "Write 10px after the colon." }], xp: 45 }),
    s45({ id: "stall-sign-box-shadow", task: "Lift the card slightly off the page.", inputMode: "guided", files: solvedStallSign(".info-card {\n  background-color: #ffffff;\n  border-radius: 10px;\n  box-shadow: ;\n}"), activeFile: "styles.css", highlightToken: "box-shadow: ;", tests: [{ id: "stall-sign-box-shadow-set", kind: "source-matches", file: "styles.css", pattern: "box-shadow\s*:\s*0\s+1px\s+3px", flags: "i", because: "The shadow needs an offset, a blur, and a colour.", label: "The card carries a soft shadow" }], hints: [{ level: 1, text: "A shadow needs a sideways offset, a downward offset, a blur, and a colour." }, { level: 2, text: "Write 0 1px 3px rgba(15, 23, 42, 0.2) after the colon." }], xp: 55 }),
    s45({ id: "stall-sign-padding", task: "Give the lifted card room inside.", inputMode: "guided", files: solvedStallSign(".info-card {\n  background-color: #ffffff;\n  border-radius: 10px;\n  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.2);\n  padding: ;\n}"), activeFile: "styles.css", highlightToken: "padding: ;", tests: [{ id: "stall-sign-padding-set", kind: "style", selector: ".info-card", prop: "padding-top", equals: "20px", readable: "20 pixels", label: "The card has room inside of 20 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the inside room." }, { level: 2, text: "Write 20px after the colon." }], xp: 45 }),
    s45({ id: "stall-sign-border", task: "Add a faint edge so the card reads on a white page.", inputMode: "guided", files: solvedStallSign(".info-card {\n  background-color: #ffffff;\n  border-radius: 10px;\n  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.2);\n  padding: 20px;\n  border: ;\n}"), activeFile: "styles.css", highlightToken: "border: ;", tests: [{ id: "stall-sign-border-set", kind: "style", selector: ".info-card", prop: "border-top-width", equals: "1px", readable: "a thin grey edge", label: "The card has an edge of a thin grey edge" }], hints: [{ level: 1, text: "A border needs a width, a style, and a colour." }, { level: 2, text: "Write 1px solid #e2e8f0 after the colon." }], xp: 45 }),
    s46({ id: "menu-alignment-text-align", task: "Centre the words in the notice.", inputMode: "guided", files: solvedMenuAlignment(".notice-banner {\n  text-align: ;\n}"), activeFile: "styles.css", highlightToken: "text-align: ;", tests: [{ id: "menu-alignment-text-align-set", kind: "style", selector: ".notice-banner", prop: "text-align", equals: "center", readable: "centred", label: "The notice aligns its words centred" }], hints: [{ level: 1, text: "Use the alignment value that puts text in the middle." }, { level: 2, text: "Write center after the colon." }], xp: 45 }),
    s46({ id: "menu-alignment-margin-left", task: "Let the browser share the space on the left.", inputMode: "guided", files: solvedMenuAlignment(".notice-banner {\n  text-align: center;\n  margin-left: ;\n}"), activeFile: "styles.css", highlightToken: "margin-left: ;", tests: [{ id: "menu-alignment-margin-left-set", kind: "source-matches", file: "styles.css", pattern: "margin-left\s*:\s*auto", flags: "i", because: "An automatic left margin is half of centring a block.", label: "The notice has its left margin shared automatically" }], hints: [{ level: 1, text: "Use the value that lets the browser decide." }, { level: 2, text: "Write auto after the colon." }], xp: 55 }),
    s46({ id: "menu-alignment-margin-right", task: "Do the same on the right so the notice sits in the middle.", inputMode: "guided", files: solvedMenuAlignment(".notice-banner {\n  text-align: center;\n  margin-left: auto;\n  margin-right: ;\n}"), activeFile: "styles.css", highlightToken: "margin-right: ;", tests: [{ id: "menu-alignment-margin-right-set", kind: "source-matches", file: "styles.css", pattern: "margin-right\s*:\s*auto", flags: "i", because: "With both margins automatic, the block sits in the middle.", label: "The notice has its right margin shared automatically" }], hints: [{ level: 1, text: "Use the same value as the left side." }, { level: 2, text: "Write auto after the colon." }], xp: 55 }),
    s46({ id: "menu-alignment-max-width", task: "Give the notice a width to be centred within.", inputMode: "guided", files: solvedMenuAlignment(".notice-banner {\n  text-align: center;\n  margin-left: auto;\n  margin-right: auto;\n  max-width: ;\n}"), activeFile: "styles.css", highlightToken: "max-width: ;", tests: [{ id: "menu-alignment-max-width-set", kind: "style", selector: ".notice-banner", prop: "max-width", equals: "360px", readable: "360 pixels", label: "The notice stops growing past 360 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the widest it may get." }, { level: 2, text: "Write 360px after the colon." }], xp: 45 }),
    s46({ id: "menu-alignment-padding", task: "Give the centred notice room inside.", inputMode: "guided", files: solvedMenuAlignment(".notice-banner {\n  text-align: center;\n  margin-left: auto;\n  margin-right: auto;\n  max-width: 360px;\n  padding: ;\n}"), activeFile: "styles.css", highlightToken: "padding: ;", tests: [{ id: "menu-alignment-padding-set", kind: "style", selector: ".notice-banner", prop: "padding-top", equals: "16px", readable: "16 pixels", label: "The notice has room inside of 16 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the inside room." }, { level: 2, text: "Write 16px after the colon." }], xp: 45 }),
    s47({ id: "league-schedule-display", task: "Put the two parts of the row on one line.", inputMode: "guided", files: solvedLeagueSchedule(".price-row {\n  display: ;\n}"), activeFile: "styles.css", highlightToken: "display: ;", tests: [{ id: "league-schedule-display-set", kind: "style", selector: ".price-row", prop: "display", equals: "flex", readable: "a flex row", label: "The row is laid out as a flex row" }], hints: [{ level: 1, text: "Use the display value that lays children out in a row." }, { level: 2, text: "Write flex after the colon." }], xp: 45 }),
    s47({ id: "league-schedule-overflow", task: "Stop long text spilling out of the row.", inputMode: "guided", files: solvedLeagueSchedule(".price-row {\n  display: flex;\n  overflow: ;\n}"), activeFile: "styles.css", highlightToken: "overflow: ;", tests: [{ id: "league-schedule-overflow-set", kind: "style", selector: ".price-row", prop: "overflow", equals: "hidden", readable: "clipped", label: "The row has its overflow clipped" }], hints: [{ level: 1, text: "Use the value that clips anything past the edge." }, { level: 2, text: "Write hidden after the colon." }], xp: 45 }),
    s47({ id: "league-schedule-white-space", task: "Keep the row on a single line.", inputMode: "guided", files: solvedLeagueSchedule(".price-row {\n  display: flex;\n  overflow: hidden;\n  white-space: ;\n}"), activeFile: "styles.css", highlightToken: "white-space: ;", tests: [{ id: "league-schedule-white-space-set", kind: "style", selector: ".price-row", prop: "white-space", equals: "nowrap", readable: "kept on one line", label: "The row has its text kept on one line" }], hints: [{ level: 1, text: "Use the value that refuses to wrap." }, { level: 2, text: "Write nowrap after the colon." }], xp: 45 }),
    s47({ id: "league-schedule-text-overflow", task: "Show three dots where the text is cut off.", inputMode: "guided", files: solvedLeagueSchedule(".price-row {\n  display: flex;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ;\n}"), activeFile: "styles.css", highlightToken: "text-overflow: ;", tests: [{ id: "league-schedule-text-overflow-set", kind: "style", selector: ".price-row", prop: "text-overflow", equals: "ellipsis", readable: "ends with dots", label: "The row shows clipped text that ends with dots" }], hints: [{ level: 1, text: "Use the value that ends clipped text with dots." }, { level: 2, text: "Write ellipsis after the colon." }], xp: 45 }),
    s47({ id: "league-schedule-gap", task: "Keep a gap between the two parts.", inputMode: "guided", files: solvedLeagueSchedule(".price-row {\n  display: flex;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  gap: ;\n}"), activeFile: "styles.css", highlightToken: "gap: ;", tests: [{ id: "league-schedule-gap-set", kind: "style", selector: ".price-row", prop: "column-gap", equals: "8px", readable: "8 pixels", label: "The row keeps a gap of 8 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the gap." }, { level: 2, text: "Write 8px after the colon." }], xp: 45 }),
    s48({ id: "list-position-position", task: "Make the notice the anchor for anything pinned to it.", inputMode: "guided", files: solvedListPosition(".notice-banner {\n  position: ;\n}"), activeFile: "styles.css", highlightToken: "position: ;", tests: [{ id: "list-position-position-set", kind: "style", selector: ".notice-banner", prop: "position", equals: "relative", readable: "positioned", label: "The notice is positioned" }], hints: [{ level: 1, text: "Use the position value that keeps an element in place but anchors its children." }, { level: 2, text: "Write relative after the colon." }], xp: 45 }),
    s48({ id: "list-position-padding-top", task: "Leave room at the top for a pinned badge.", inputMode: "guided", files: solvedListPosition(".notice-banner {\n  position: relative;\n  padding-top: ;\n}"), activeFile: "styles.css", highlightToken: "padding-top: ;", tests: [{ id: "list-position-padding-top-set", kind: "style", selector: ".notice-banner", prop: "padding-top", equals: "28px", readable: "28 pixels", label: "The notice has room above of 28 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the space above." }, { level: 2, text: "Write 28px after the colon." }], xp: 45 }),
    s48({ id: "list-position-min-height", task: "Stop the notice collapsing when it is short.", inputMode: "guided", files: solvedListPosition(".notice-banner {\n  position: relative;\n  padding-top: 28px;\n  min-height: ;\n}"), activeFile: "styles.css", highlightToken: "min-height: ;", tests: [{ id: "list-position-min-height-set", kind: "style", selector: ".notice-banner", prop: "min-height", equals: "80px", readable: "80 pixels", label: "The notice stays at least 80 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the shortest it may be." }, { level: 2, text: "Write 80px after the colon." }], xp: 45 }),
    s48({ id: "list-position-background-color", task: "Tint the notice so the badge will stand out.", inputMode: "guided", files: solvedListPosition(".notice-banner {\n  position: relative;\n  padding-top: 28px;\n  min-height: 80px;\n  background-color: ;\n}"), activeFile: "styles.css", highlightToken: "background-color: ;", tests: [{ id: "list-position-background-color-set", kind: "style", selector: ".notice-banner", prop: "background-color", equals: "rgb(239, 246, 255)", readable: "pale blue", label: "The notice has a background of pale blue" }], hints: [{ level: 1, text: "Use the pale blue code." }, { level: 2, text: "Write #eff6ff after the colon." }], xp: 45 }),
    s48({ id: "list-position-border-radius", task: "Round the notice corners.", inputMode: "guided", files: solvedListPosition(".notice-banner {\n  position: relative;\n  padding-top: 28px;\n  min-height: 80px;\n  background-color: #eff6ff;\n  border-radius: ;\n}"), activeFile: "styles.css", highlightToken: "border-radius: ;", tests: [{ id: "list-position-border-radius-set", kind: "style", selector: ".notice-banner", prop: "border-top-left-radius", equals: "8px", readable: "8 pixels", label: "The notice has corners curved by 8 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the corner curve." }, { level: 2, text: "Write 8px after the colon." }], xp: 45 }),
    s49({ id: "custom-properties-var-card-ink", task: "Store the card ink colour under a name you can reuse.", inputMode: "guided", files: solvedCustomProperties(".info-card {\n  --card-ink: ;\n}"), activeFile: "styles.css", highlightToken: "--card-ink: ;", tests: [{ id: "custom-properties-var-card-ink-set", kind: "source-matches", file: "styles.css", pattern: "--card-ink\s*:\s*#0f172a", flags: "i", because: "A custom property starts with two dashes and holds a value for later.", label: "The card stores its ink colour as a stored colour" }], hints: [{ level: 1, text: "A name you invent starts with two dashes." }, { level: 2, text: "Write #0f172a after the colon." }], xp: 55 }),
    s49({ id: "custom-properties-color", task: "Use the stored colour for the card text.", inputMode: "guided", files: solvedCustomProperties(".info-card {\n  --card-ink: #0f172a;\n  color: ;\n}"), activeFile: "styles.css", highlightToken: "color: ;", tests: [{ id: "custom-properties-color-set", kind: "style", selector: ".info-card", prop: "color", equals: "rgb(15, 23, 42)", readable: "the stored ink colour", label: "The card shows its words in the stored ink colour" }], hints: [{ level: 1, text: "Read a stored value with var and the name in brackets." }, { level: 2, text: "Write var(--card-ink) after the colon." }], xp: 45 }),
    s49({ id: "custom-properties-var-card-pad", task: "Store the card spacing under a name too.", inputMode: "guided", files: solvedCustomProperties(".info-card {\n  --card-ink: #0f172a;\n  color: var(--card-ink);\n  --card-pad: ;\n}"), activeFile: "styles.css", highlightToken: "--card-pad: ;", tests: [{ id: "custom-properties-var-card-pad-set", kind: "source-matches", file: "styles.css", pattern: "--card-pad\s*:\s*18px", flags: "i", because: "Spacing can be stored under a name in the same way a colour can.", label: "The card stores its spacing as a stored size" }], hints: [{ level: 1, text: "Use two dashes, then a pixel value." }, { level: 2, text: "Write 18px after the colon." }], xp: 55 }),
    s49({ id: "custom-properties-padding", task: "Use the stored spacing for the card padding.", inputMode: "guided", files: solvedCustomProperties(".info-card {\n  --card-ink: #0f172a;\n  color: var(--card-ink);\n  --card-pad: 18px;\n  padding: ;\n}"), activeFile: "styles.css", highlightToken: "padding: ;", tests: [{ id: "custom-properties-padding-set", kind: "style", selector: ".info-card", prop: "padding-top", equals: "18px", readable: "the stored spacing", label: "The card has room inside of the stored spacing" }], hints: [{ level: 1, text: "Read the stored value with var." }, { level: 2, text: "Write var(--card-pad) after the colon." }], xp: 45 }),
    s49({ id: "custom-properties-border-radius", task: "Round the card corners.", inputMode: "guided", files: solvedCustomProperties(".info-card {\n  --card-ink: #0f172a;\n  color: var(--card-ink);\n  --card-pad: 18px;\n  padding: var(--card-pad);\n  border-radius: ;\n}"), activeFile: "styles.css", highlightToken: "border-radius: ;", tests: [{ id: "custom-properties-border-radius-set", kind: "style", selector: ".info-card", prop: "border-top-left-radius", equals: "10px", readable: "10 pixels", label: "The card has corners curved by 10 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the corner curve." }, { level: 2, text: "Write 10px after the colon." }], xp: 45 }),
    s50({ id: "box-spacing-padding", task: "Give the card room inside its edges.", inputMode: "guided", files: solvedBoxSpacing(".info-card {\n  padding: ;\n}"), activeFile: "styles.css", highlightToken: "padding: ;", tests: [{ id: "box-spacing-padding-set", kind: "style", selector: ".info-card", prop: "padding-top", equals: "16px", readable: "16 pixels", label: "The card has room inside of 16 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the inside room." }, { level: 2, text: "Write 16px after the colon." }], xp: 45 }),
    s50({ id: "box-spacing-background-color", task: "Make the card stand out from the page.", inputMode: "guided", files: solvedBoxSpacing(".info-card {\n  padding: 16px;\n  background-color: ;\n}"), activeFile: "styles.css", highlightToken: "background-color: ;", tests: [{ id: "box-spacing-background-color-set", kind: "style", selector: ".info-card", prop: "background-color", equals: "rgb(255, 255, 255)", readable: "white", label: "The card has a background of white" }], hints: [{ level: 1, text: "Use the white colour code." }, { level: 2, text: "Write #ffffff after the colon." }], xp: 45 }),
    s50({ id: "box-spacing-border-radius", task: "Soften the corners of the card.", inputMode: "guided", files: solvedBoxSpacing(".info-card {\n  padding: 16px;\n  background-color: #ffffff;\n  border-radius: ;\n}"), activeFile: "styles.css", highlightToken: "border-radius: ;", tests: [{ id: "box-spacing-border-radius-set", kind: "style", selector: ".info-card", prop: "border-top-left-radius", equals: "12px", readable: "12 pixels", label: "The card has corners curved by 12 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the corner curve." }, { level: 2, text: "Write 12px after the colon." }], xp: 45 }),
    s50({ id: "box-spacing-margin-bottom", task: "Leave space below the card.", inputMode: "guided", files: solvedBoxSpacing(".info-card {\n  padding: 16px;\n  background-color: #ffffff;\n  border-radius: 12px;\n  margin-bottom: ;\n}"), activeFile: "styles.css", highlightToken: "margin-bottom: ;", tests: [{ id: "box-spacing-margin-bottom-set", kind: "style", selector: ".info-card", prop: "margin-bottom", equals: "24px", readable: "24 pixels", label: "The card leaves a gap below of 24 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the gap below." }, { level: 2, text: "Write 24px after the colon." }], xp: 45 }),
    s50({ id: "box-spacing-max-width", task: "Stop the card growing too wide to read.", inputMode: "guided", files: solvedBoxSpacing(".info-card {\n  padding: 16px;\n  background-color: #ffffff;\n  border-radius: 12px;\n  margin-bottom: 24px;\n  max-width: ;\n}"), activeFile: "styles.css", highlightToken: "max-width: ;", tests: [{ id: "box-spacing-max-width-set", kind: "style", selector: ".info-card", prop: "max-width", equals: "400px", readable: "400 pixels", label: "The card stops growing past 400 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the widest it may get." }, { level: 2, text: "Write 400px after the colon." }], xp: 45 }),
    s51({ id: "station-notice-border-left-width", task: "Give the notice a thick stripe down its left side.", inputMode: "guided", files: solvedStationNotice(".notice-banner {\n  border-left-width: ;\n}"), activeFile: "styles.css", highlightToken: "border-left-width: ;", tests: [{ id: "station-notice-border-left-width-set", kind: "style", selector: ".notice-banner", prop: "border-left-width", equals: "4px", readable: "4 pixels", label: "The notice has a left stripe of 4 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the stripe width." }, { level: 2, text: "Write 4px after the colon." }], xp: 45 }),
    s51({ id: "station-notice-border-left-style", task: "Make the left stripe a solid line.", inputMode: "guided", files: solvedStationNotice(".notice-banner {\n  border-left-width: 4px;\n  border-left-style: ;\n}"), activeFile: "styles.css", highlightToken: "border-left-style: ;", tests: [{ id: "station-notice-border-left-style-set", kind: "style", selector: ".notice-banner", prop: "border-left-style", equals: "solid", readable: "a solid line", label: "The notice draws its stripe as a solid line" }], hints: [{ level: 1, text: "Use the plain unbroken line style." }, { level: 2, text: "Write solid after the colon." }], xp: 45 }),
    s51({ id: "station-notice-border-left-color", task: "Colour the stripe amber so it reads as a warning.", inputMode: "guided", files: solvedStationNotice(".notice-banner {\n  border-left-width: 4px;\n  border-left-style: solid;\n  border-left-color: ;\n}"), activeFile: "styles.css", highlightToken: "border-left-color: ;", tests: [{ id: "station-notice-border-left-color-set", kind: "style", selector: ".notice-banner", prop: "border-left-color", equals: "rgb(180, 83, 9)", readable: "amber", label: "The notice has a stripe coloured amber" }], hints: [{ level: 1, text: "Use the amber colour code named in the task." }, { level: 2, text: "Write #b45309 after the colon." }], xp: 45 }),
    s51({ id: "station-notice-background-color", task: "Tint the notice background to match the stripe.", inputMode: "guided", files: solvedStationNotice(".notice-banner {\n  border-left-width: 4px;\n  border-left-style: solid;\n  border-left-color: #b45309;\n  background-color: ;\n}"), activeFile: "styles.css", highlightToken: "background-color: ;", tests: [{ id: "station-notice-background-color-set", kind: "style", selector: ".notice-banner", prop: "background-color", equals: "rgb(255, 251, 235)", readable: "pale amber", label: "The notice has a background of pale amber" }], hints: [{ level: 1, text: "Use the pale amber code." }, { level: 2, text: "Write #fffbeb after the colon." }], xp: 45 }),
    s51({ id: "station-notice-padding-left", task: "Keep the words clear of the stripe.", inputMode: "guided", files: solvedStationNotice(".notice-banner {\n  border-left-width: 4px;\n  border-left-style: solid;\n  border-left-color: #b45309;\n  background-color: #fffbeb;\n  padding-left: ;\n}"), activeFile: "styles.css", highlightToken: "padding-left: ;", tests: [{ id: "station-notice-padding-left-set", kind: "style", selector: ".notice-banner", prop: "padding-left", equals: "16px", readable: "16 pixels", label: "The notice keeps its words clear by 16 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the space after the stripe." }, { level: 2, text: "Write 16px after the colon." }], xp: 45 }),
    s52({ id: "up-announcement-font-size", task: "Make the card text large enough to read on a phone.", inputMode: "guided", files: solvedUpAnnouncement(".info-card {\n  font-size: ;\n}"), activeFile: "styles.css", highlightToken: "font-size: ;", tests: [{ id: "up-announcement-font-size-set", kind: "style", selector: ".info-card", prop: "font-size", equals: "18px", readable: "18 pixels", label: "The card text sets its text at 18 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the text size." }, { level: 2, text: "Write 18px after the colon." }], xp: 45 }),
    s52({ id: "up-announcement-line-height", task: "Open up the space between lines.", inputMode: "guided", files: solvedUpAnnouncement(".info-card {\n  font-size: 18px;\n  line-height: ;\n}"), activeFile: "styles.css", highlightToken: "line-height: ;", tests: [{ id: "up-announcement-line-height-set", kind: "style", selector: ".info-card", prop: "line-height", equals: "28.8px", readable: "1.6 times the text size", label: "The card text spaces its lines by 1.6 times the text size" }], hints: [{ level: 1, text: "Use a number with no unit." }, { level: 2, text: "Write 1.6 after the colon." }], xp: 45 }),
    s52({ id: "up-announcement-color", task: "Darken the words so they have enough contrast.", inputMode: "guided", files: solvedUpAnnouncement(".info-card {\n  font-size: 18px;\n  line-height: 1.6;\n  color: ;\n}"), activeFile: "styles.css", highlightToken: "color: ;", tests: [{ id: "up-announcement-color-set", kind: "style", selector: ".info-card", prop: "color", equals: "rgb(31, 41, 55)", readable: "dark slate", label: "The card text shows its words in dark slate" }], hints: [{ level: 1, text: "Use the dark slate code named in the task." }, { level: 2, text: "Write #1f2937 after the colon." }], xp: 45 }),
    s52({ id: "up-announcement-font-weight", task: "Give the card text a little more weight.", inputMode: "guided", files: solvedUpAnnouncement(".info-card {\n  font-size: 18px;\n  line-height: 1.6;\n  color: #1f2937;\n  font-weight: ;\n}"), activeFile: "styles.css", highlightToken: "font-weight: ;", tests: [{ id: "up-announcement-font-weight-set", kind: "style", selector: ".info-card", prop: "font-weight", equals: "500", readable: "medium", label: "The card text sets its weight to medium" }], hints: [{ level: 1, text: "Use the medium weight number." }, { level: 2, text: "Write 500 after the colon." }], xp: 45 }),
    s52({ id: "up-announcement-letter-spacing", task: "Loosen the letters very slightly.", inputMode: "guided", files: solvedUpAnnouncement(".info-card {\n  font-size: 18px;\n  line-height: 1.6;\n  color: #1f2937;\n  font-weight: 500;\n  letter-spacing: ;\n}"), activeFile: "styles.css", highlightToken: "letter-spacing: ;", tests: [{ id: "up-announcement-letter-spacing-set", kind: "style", selector: ".info-card", prop: "letter-spacing", equals: "0.2px", readable: "0.2 pixels", label: "The card text spaces its letters by 0.2 pixels" }], hints: [{ level: 1, text: "Use a small pixel value." }, { level: 2, text: "Write 0.2px after the colon." }], xp: 45 }),
    s53({ id: "rate-card-display", task: "Put the label and the amount on one line.", inputMode: "guided", files: solvedRateCard(".price-row {\n  display: ;\n}"), activeFile: "styles.css", highlightToken: "display: ;", tests: [{ id: "rate-card-display-set", kind: "style", selector: ".price-row", prop: "display", equals: "flex", readable: "a flex row", label: "The row is laid out as a flex row" }], hints: [{ level: 1, text: "Use the display value that lays children out in a row." }, { level: 2, text: "Write flex after the colon." }], xp: 45 }),
    s53({ id: "rate-card-justify-content", task: "Push the amount to the far right.", inputMode: "guided", files: solvedRateCard(".price-row {\n  display: flex;\n  justify-content: ;\n}"), activeFile: "styles.css", highlightToken: "justify-content: ;", tests: [{ id: "rate-card-justify-content-set", kind: "style", selector: ".price-row", prop: "justify-content", equals: "space-between", readable: "pushed apart", label: "The row spaces its children pushed apart" }], hints: [{ level: 1, text: "Use the value that puts all spare space between the two." }, { level: 2, text: "Write space-between after the colon." }], xp: 45 }),
    s53({ id: "rate-card-align-items", task: "Line the two up through their middles.", inputMode: "guided", files: solvedRateCard(".price-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: ;\n}"), activeFile: "styles.css", highlightToken: "align-items: ;", tests: [{ id: "rate-card-align-items-set", kind: "style", selector: ".price-row", prop: "align-items", equals: "center", readable: "centred across", label: "The row lines its children up centred across" }], hints: [{ level: 1, text: "Use the value that centres children across the row." }, { level: 2, text: "Write center after the colon." }], xp: 45 }),
    s53({ id: "rate-card-gap", task: "Keep a minimum gap between the two.", inputMode: "guided", files: solvedRateCard(".price-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: ;\n}"), activeFile: "styles.css", highlightToken: "gap: ;", tests: [{ id: "rate-card-gap-set", kind: "style", selector: ".price-row", prop: "column-gap", equals: "12px", readable: "12 pixels", label: "The row keeps a gap of 12 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the gap." }, { level: 2, text: "Write 12px after the colon." }], xp: 45 }),
    s53({ id: "rate-card-padding", task: "Give the row room inside.", inputMode: "guided", files: solvedRateCard(".price-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n  padding: ;\n}"), activeFile: "styles.css", highlightToken: "padding: ;", tests: [{ id: "rate-card-padding-set", kind: "style", selector: ".price-row", prop: "padding-top", equals: "12px", readable: "12 pixels", label: "The row has room inside of 12 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the inside room." }, { level: 2, text: "Write 12px after the colon." }], xp: 45 }),
    s54({ id: "flex-column-display", task: "Take control of how the list stacks.", inputMode: "guided", files: solvedFlexColumn(".item-list {\n  display: ;\n}"), activeFile: "styles.css", highlightToken: "display: ;", tests: [{ id: "flex-column-display-set", kind: "style", selector: ".item-list", prop: "display", equals: "flex", readable: "a flex box", label: "The list is laid out as a flex box" }], hints: [{ level: 1, text: "Use the display value that lets you control direction and gaps." }, { level: 2, text: "Write flex after the colon." }], xp: 45 }),
    s54({ id: "flex-column-flex-direction", task: "Stack the heading and the list top to bottom.", inputMode: "guided", files: solvedFlexColumn(".item-list {\n  display: flex;\n  flex-direction: ;\n}"), activeFile: "styles.css", highlightToken: "flex-direction: ;", tests: [{ id: "flex-column-flex-direction-set", kind: "style", selector: ".item-list", prop: "flex-direction", equals: "column", readable: "top to bottom", label: "The list runs top to bottom" }], hints: [{ level: 1, text: "Use the direction value that runs down the page." }, { level: 2, text: "Write column after the colon." }], xp: 45 }),
    s54({ id: "flex-column-gap", task: "Space the stacked parts evenly.", inputMode: "guided", files: solvedFlexColumn(".item-list {\n  display: flex;\n  flex-direction: column;\n  gap: ;\n}"), activeFile: "styles.css", highlightToken: "gap: ;", tests: [{ id: "flex-column-gap-set", kind: "style", selector: ".item-list", prop: "row-gap", equals: "8px", readable: "8 pixels", label: "The list keeps a gap of 8 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the gap." }, { level: 2, text: "Write 8px after the colon." }], xp: 45 }),
    s54({ id: "flex-column-background-color", task: "Tint the list so it reads as one block.", inputMode: "guided", files: solvedFlexColumn(".item-list {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  background-color: ;\n}"), activeFile: "styles.css", highlightToken: "background-color: ;", tests: [{ id: "flex-column-background-color-set", kind: "style", selector: ".item-list", prop: "background-color", equals: "rgb(248, 250, 252)", readable: "pale grey", label: "The list has a background of pale grey" }], hints: [{ level: 1, text: "Use the pale grey code." }, { level: 2, text: "Write #f8fafc after the colon." }], xp: 45 }),
    s54({ id: "flex-column-padding", task: "Keep the list clear of its own edges.", inputMode: "guided", files: solvedFlexColumn(".item-list {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  background-color: #f8fafc;\n  padding: ;\n}"), activeFile: "styles.css", highlightToken: "padding: ;", tests: [{ id: "flex-column-padding-set", kind: "style", selector: ".item-list", prop: "padding-top", equals: "16px", readable: "16 pixels", label: "The list has room inside of 16 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the inside room." }, { level: 2, text: "Write 16px after the colon." }], xp: 45 }),
    s55({ id: "price-board-background-color", task: "Tint the banner pale green.", inputMode: "guided", files: solvedPriceBoard(".notice-banner {\n  background-color: ;\n}"), activeFile: "styles.css", highlightToken: "background-color: ;", tests: [{ id: "price-board-background-color-set", kind: "style", selector: ".notice-banner", prop: "background-color", equals: "rgb(236, 253, 245)", readable: "pale green", label: "The banner has a background of pale green" }], hints: [{ level: 1, text: "Use the pale green code named in the task." }, { level: 2, text: "Write #ecfdf5 after the colon." }], xp: 45 }),
    s55({ id: "price-board-background-image", task: "Fade the banner from its top colour into a deeper one.", inputMode: "guided", files: solvedPriceBoard(".notice-banner {\n  background-color: #ecfdf5;\n  background-image: ;\n}"), activeFile: "styles.css", highlightToken: "background-image: ;", tests: [{ id: "price-board-background-image-set", kind: "source-matches", file: "styles.css", pattern: "background-image\s*:\s*linear-gradient", flags: "i", because: "A gradient names the colours it fades between.", label: "The banner is set to a colour that fades down" }], hints: [{ level: 1, text: "Name the two colours the fade runs between." }, { level: 2, text: "Write linear-gradient(#ecfdf5, #d1fae5) after the colon." }], xp: 55 }),
    s55({ id: "price-board-background-clip", task: "Stop the background running under the border.", inputMode: "guided", files: solvedPriceBoard(".notice-banner {\n  background-color: #ecfdf5;\n  background-image: linear-gradient(#ecfdf5, #d1fae5);\n  background-clip: ;\n}"), activeFile: "styles.css", highlightToken: "background-clip: ;", tests: [{ id: "price-board-background-clip-set", kind: "style", selector: ".notice-banner", prop: "background-clip", equals: "padding-box", readable: "kept inside the padding", label: "The banner is set to kept inside the padding" }], hints: [{ level: 1, text: "Name the box the background should stop at." }, { level: 2, text: "Write padding-box after the colon." }], xp: 45 }),
    s55({ id: "price-board-padding", task: "Give the banner room inside.", inputMode: "guided", files: solvedPriceBoard(".notice-banner {\n  background-color: #ecfdf5;\n  background-image: linear-gradient(#ecfdf5, #d1fae5);\n  background-clip: padding-box;\n  padding: ;\n}"), activeFile: "styles.css", highlightToken: "padding: ;", tests: [{ id: "price-board-padding-set", kind: "style", selector: ".notice-banner", prop: "padding-top", equals: "18px", readable: "18 pixels", label: "The banner has room inside of 18 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the inside room." }, { level: 2, text: "Write 18px after the colon." }], xp: 45 }),
    s55({ id: "price-board-border-radius", task: "Round the banner corners.", inputMode: "guided", files: solvedPriceBoard(".notice-banner {\n  background-color: #ecfdf5;\n  background-image: linear-gradient(#ecfdf5, #d1fae5);\n  background-clip: padding-box;\n  padding: 18px;\n  border-radius: ;\n}"), activeFile: "styles.css", highlightToken: "border-radius: ;", tests: [{ id: "price-board-border-radius-set", kind: "style", selector: ".notice-banner", prop: "border-top-left-radius", equals: "8px", readable: "8 pixels", label: "The banner has corners curved by 8 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the corner curve." }, { level: 2, text: "Write 8px after the colon." }], xp: 45 }),
    s56({ id: "receipt-units-font-size", task: "Size the card text from the page setting instead of a fixed number.", inputMode: "guided", files: solvedReceiptUnits(".info-card {\n  font-size: ;\n}"), activeFile: "styles.css", highlightToken: "font-size: ;", tests: [{ id: "receipt-units-font-size-set", kind: "style", selector: ".info-card", prop: "font-size", equals: "16px", readable: "one root size", label: "The card sets its text at one root size" }], hints: [{ level: 1, text: "Use the unit that means one root font size." }, { level: 2, text: "Write 1rem after the colon." }], xp: 45 }),
    s56({ id: "receipt-units-padding", task: "Set the inside room in the same scaling unit.", inputMode: "guided", files: solvedReceiptUnits(".info-card {\n  font-size: 1rem;\n  padding: ;\n}"), activeFile: "styles.css", highlightToken: "padding: ;", tests: [{ id: "receipt-units-padding-set", kind: "style", selector: ".info-card", prop: "padding-top", equals: "20px", readable: "1.25 root sizes", label: "The card has room inside of 1.25 root sizes" }], hints: [{ level: 1, text: "Use a rem value a little over one." }, { level: 2, text: "Write 1.25rem after the colon." }], xp: 45 }),
    s56({ id: "receipt-units-max-width", task: "Cap the card width in the same unit.", inputMode: "guided", files: solvedReceiptUnits(".info-card {\n  font-size: 1rem;\n  padding: 1.25rem;\n  max-width: ;\n}"), activeFile: "styles.css", highlightToken: "max-width: ;", tests: [{ id: "receipt-units-max-width-set", kind: "style", selector: ".info-card", prop: "max-width", equals: "480px", readable: "30 root sizes", label: "The card stops growing past 30 root sizes" }], hints: [{ level: 1, text: "Use a rem value for the widest it may get." }, { level: 2, text: "Write 30rem after the colon." }], xp: 45 }),
    s56({ id: "receipt-units-line-height", task: "Space the lines relative to the text size.", inputMode: "guided", files: solvedReceiptUnits(".info-card {\n  font-size: 1rem;\n  padding: 1.25rem;\n  max-width: 30rem;\n  line-height: ;\n}"), activeFile: "styles.css", highlightToken: "line-height: ;", tests: [{ id: "receipt-units-line-height-set", kind: "style", selector: ".info-card", prop: "line-height", equals: "24px", readable: "1.5 times the text size", label: "The card spaces its lines by 1.5 times the text size" }], hints: [{ level: 1, text: "Use a number with no unit." }, { level: 2, text: "Write 1.5 after the colon." }], xp: 45 }),
    s56({ id: "receipt-units-border-radius", task: "Round the corners in the same scaling unit.", inputMode: "guided", files: solvedReceiptUnits(".info-card {\n  font-size: 1rem;\n  padding: 1.25rem;\n  max-width: 30rem;\n  line-height: 1.5;\n  border-radius: ;\n}"), activeFile: "styles.css", highlightToken: "border-radius: ;", tests: [{ id: "receipt-units-border-radius-set", kind: "style", selector: ".info-card", prop: "border-top-left-radius", equals: "8px", readable: "half a root size", label: "The card has corners curved by half a root size" }], hints: [{ level: 1, text: "Use a rem value below one." }, { level: 2, text: "Write 0.5rem after the colon." }], xp: 45 }),
    s57({ id: "list-styling-list-style-type", task: "Take the bullets off the list.", inputMode: "guided", files: solvedListStyling(".item-list {\n  list-style-type: ;\n}"), activeFile: "styles.css", highlightToken: "list-style-type: ;", tests: [{ id: "list-styling-list-style-type-set", kind: "style", selector: ".item-list", prop: "list-style-type", equals: "none", readable: "no bullets", label: "The list is set to no bullets" }], hints: [{ level: 1, text: "Use the value that means no marker at all." }, { level: 2, text: "Write none after the colon." }], xp: 45 }),
    s57({ id: "list-styling-padding-left", task: "Remove the indent the bullets left behind.", inputMode: "guided", files: solvedListStyling(".item-list {\n  list-style-type: none;\n  padding-left: ;\n}"), activeFile: "styles.css", highlightToken: "padding-left: ;", tests: [{ id: "list-styling-padding-left-set", kind: "style", selector: ".item-list", prop: "padding-left", equals: "0px", readable: "no left indent", label: "The list keeps its words clear by no left indent" }], hints: [{ level: 1, text: "Use zero pixels." }, { level: 2, text: "Write 0px after the colon." }], xp: 45 }),
    s57({ id: "list-styling-background-color", task: "Tint the list so it reads as one block.", inputMode: "guided", files: solvedListStyling(".item-list {\n  list-style-type: none;\n  padding-left: 0px;\n  background-color: ;\n}"), activeFile: "styles.css", highlightToken: "background-color: ;", tests: [{ id: "list-styling-background-color-set", kind: "style", selector: ".item-list", prop: "background-color", equals: "rgb(248, 250, 252)", readable: "pale grey", label: "The list has a background of pale grey" }], hints: [{ level: 1, text: "Use the pale grey code." }, { level: 2, text: "Write #f8fafc after the colon." }], xp: 45 }),
    s57({ id: "list-styling-border-radius", task: "Round the list corners.", inputMode: "guided", files: solvedListStyling(".item-list {\n  list-style-type: none;\n  padding-left: 0px;\n  background-color: #f8fafc;\n  border-radius: ;\n}"), activeFile: "styles.css", highlightToken: "border-radius: ;", tests: [{ id: "list-styling-border-radius-set", kind: "style", selector: ".item-list", prop: "border-top-left-radius", equals: "8px", readable: "8 pixels", label: "The list has corners curved by 8 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the corner curve." }, { level: 2, text: "Write 8px after the colon." }], xp: 45 }),
    s57({ id: "list-styling-padding-top", task: "Keep the first item clear of the top edge.", inputMode: "guided", files: solvedListStyling(".item-list {\n  list-style-type: none;\n  padding-left: 0px;\n  background-color: #f8fafc;\n  border-radius: 8px;\n  padding-top: ;\n}"), activeFile: "styles.css", highlightToken: "padding-top: ;", tests: [{ id: "list-styling-padding-top-set", kind: "style", selector: ".item-list", prop: "padding-top", equals: "12px", readable: "12 pixels", label: "The list has room above of 12 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the space above." }, { level: 2, text: "Write 12px after the colon." }], xp: 45 }),
    s58({ id: "application-notice-padding", task: "Give the row room inside.", inputMode: "guided", files: solvedApplicationNotice(".price-row {\n  padding: ;\n}"), activeFile: "styles.css", highlightToken: "padding: ;", tests: [{ id: "application-notice-padding-set", kind: "style", selector: ".price-row", prop: "padding-top", equals: "12px", readable: "12 pixels", label: "The row has room inside of 12 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the inside room." }, { level: 2, text: "Write 12px after the colon." }], xp: 45 }),
    s58({ id: "application-notice-cursor", task: "Show that the row can be clicked.", inputMode: "guided", files: solvedApplicationNotice(".price-row {\n  padding: 12px;\n  cursor: ;\n}"), activeFile: "styles.css", highlightToken: "cursor: ;", tests: [{ id: "application-notice-cursor-set", kind: "style", selector: ".price-row", prop: "cursor", equals: "pointer", readable: "a pointing hand", label: "The row is set to a pointing hand" }], hints: [{ level: 1, text: "Use the cursor value that shows a pointing hand." }, { level: 2, text: "Write pointer after the colon." }], xp: 45 }),
    s58({ id: "application-notice-transition-property", task: "Name what should change smoothly rather than snapping.", inputMode: "guided", files: solvedApplicationNotice(".price-row {\n  padding: 12px;\n  cursor: pointer;\n  transition-property: ;\n}"), activeFile: "styles.css", highlightToken: "transition-property: ;", tests: [{ id: "application-notice-transition-property-set", kind: "style", selector: ".price-row", prop: "transition-property", equals: "background-color", readable: "a smooth colour change", label: "The row is set to a smooth colour change" }], hints: [{ level: 1, text: "Name the property that will change." }, { level: 2, text: "Write background-color after the colon." }], xp: 45 }),
    s58({ id: "application-notice-transition-duration", task: "Set how long that change takes.", inputMode: "guided", files: solvedApplicationNotice(".price-row {\n  padding: 12px;\n  cursor: pointer;\n  transition-property: background-color;\n  transition-duration: ;\n}"), activeFile: "styles.css", highlightToken: "transition-duration: ;", tests: [{ id: "application-notice-transition-duration-set", kind: "style", selector: ".price-row", prop: "transition-duration", equals: "0.15s", readable: "150 milliseconds", label: "The row is set to 150 milliseconds" }], hints: [{ level: 1, text: "Use a value in milliseconds." }, { level: 2, text: "Write 150ms after the colon." }], xp: 45 }),
    s58({ id: "application-notice-transition-timing-function", task: "Make the change start quickly and settle gently.", inputMode: "guided", files: solvedApplicationNotice(".price-row {\n  padding: 12px;\n  cursor: pointer;\n  transition-property: background-color;\n  transition-duration: 150ms;\n  transition-timing-function: ;\n}"), activeFile: "styles.css", highlightToken: "transition-timing-function: ;", tests: [{ id: "application-notice-transition-timing-function-set", kind: "style", selector: ".price-row", prop: "transition-timing-function", equals: "ease-out", readable: "quick then gentle", label: "The row is set to quick then gentle" }], hints: [{ level: 1, text: "Use the timing value that eases at the end." }, { level: 2, text: "Write ease-out after the colon." }], xp: 45 }),
    s59({ id: "credit-reminder-display", task: "Lay the cells out as a grid.", inputMode: "guided", files: solvedCreditReminder(".stall-grid {\n  display: ;\n}"), activeFile: "styles.css", highlightToken: "display: ;", tests: [{ id: "credit-reminder-display-set", kind: "style", selector: ".stall-grid", prop: "display", equals: "grid", readable: "a grid", label: "The grid is laid out as a grid" }], hints: [{ level: 1, text: "Use the display value made for rows and columns together." }, { level: 2, text: "Write grid after the colon." }], xp: 45 }),
    s59({ id: "credit-reminder-grid-template-columns", task: "Ask for two equal columns without writing the track twice.", inputMode: "guided", files: solvedCreditReminder(".stall-grid {\n  display: grid;\n  grid-template-columns: ;\n}"), activeFile: "styles.css", highlightToken: "grid-template-columns: ;", tests: [{ id: "credit-reminder-grid-template-columns-set", kind: "source-matches", file: "styles.css", pattern: "grid-template-columns\s*:\s*repeat\(2,\s*1fr\)", flags: "i", because: "Repeat asks for the same track twice without writing it twice.", label: "The grid is divided into two repeated columns" }], hints: [{ level: 1, text: "Use the function that repeats a track a number of times." }, { level: 2, text: "Write repeat(2, 1fr) after the colon." }], xp: 55 }),
    s59({ id: "credit-reminder-row-gap", task: "Space the rows apart.", inputMode: "guided", files: solvedCreditReminder(".stall-grid {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  row-gap: ;\n}"), activeFile: "styles.css", highlightToken: "row-gap: ;", tests: [{ id: "credit-reminder-row-gap-set", kind: "style", selector: ".stall-grid", prop: "row-gap", equals: "10px", readable: "10 pixels between rows", label: "The grid is set to 10 pixels between rows" }], hints: [{ level: 1, text: "Use a pixel value for the gap between rows." }, { level: 2, text: "Write 10px after the colon." }], xp: 45 }),
    s59({ id: "credit-reminder-column-gap", task: "Use a wider gap between the columns.", inputMode: "guided", files: solvedCreditReminder(".stall-grid {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  row-gap: 10px;\n  column-gap: ;\n}"), activeFile: "styles.css", highlightToken: "column-gap: ;", tests: [{ id: "credit-reminder-column-gap-set", kind: "style", selector: ".stall-grid", prop: "column-gap", equals: "16px", readable: "16 pixels between columns", label: "The grid is set to 16 pixels between columns" }], hints: [{ level: 1, text: "Use a pixel value for the gap between columns." }, { level: 2, text: "Write 16px after the colon." }], xp: 45 }),
    s59({ id: "credit-reminder-align-items", task: "Make every cell in a row the same height.", inputMode: "guided", files: solvedCreditReminder(".stall-grid {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  row-gap: 10px;\n  column-gap: 16px;\n  align-items: ;\n}"), activeFile: "styles.css", highlightToken: "align-items: ;", tests: [{ id: "credit-reminder-align-items-set", kind: "style", selector: ".stall-grid", prop: "align-items", equals: "stretch", readable: "cells of equal height", label: "The grid lines its children up cells of equal height" }], hints: [{ level: 1, text: "Use the value that stretches children to fill the row." }, { level: 2, text: "Write stretch after the colon." }], xp: 45 }),
    s60({ id: "opacity-layer-padding", task: "Give the notice room inside.", inputMode: "guided", files: solvedOpacityLayer(".notice-banner {\n  padding: ;\n}"), activeFile: "styles.css", highlightToken: "padding: ;", tests: [{ id: "opacity-layer-padding-set", kind: "style", selector: ".notice-banner", prop: "padding-top", equals: "16px", readable: "16 pixels", label: "The notice has room inside of 16 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the inside room." }, { level: 2, text: "Write 16px after the colon." }], xp: 45 }),
    s60({ id: "opacity-layer-opacity", task: "Soften the notice very slightly.", inputMode: "guided", files: solvedOpacityLayer(".notice-banner {\n  padding: 16px;\n  opacity: ;\n}"), activeFile: "styles.css", highlightToken: "opacity: ;", tests: [{ id: "opacity-layer-opacity-set", kind: "style", selector: ".notice-banner", prop: "opacity", equals: "0.95", readable: "very slightly see-through", label: "The notice is set to very slightly see-through" }], hints: [{ level: 1, text: "Use a number just below one." }, { level: 2, text: "Write 0.95 after the colon." }], xp: 45 }),
    s60({ id: "opacity-layer-z-index", task: "Keep the notice above anything it overlaps.", inputMode: "guided", files: solvedOpacityLayer(".notice-banner {\n  padding: 16px;\n  opacity: 0.95;\n  z-index: ;\n}"), activeFile: "styles.css", highlightToken: "z-index: ;", tests: [{ id: "opacity-layer-z-index-set", kind: "style", selector: ".notice-banner", prop: "z-index", equals: "10", readable: "stacked above", label: "The notice is set to stacked above" }], hints: [{ level: 1, text: "Use a whole number; higher sits on top." }, { level: 2, text: "Write 10 after the colon." }], xp: 45 }),
    s60({ id: "opacity-layer-position", task: "Give the stacking order something to apply to.", inputMode: "guided", files: solvedOpacityLayer(".notice-banner {\n  padding: 16px;\n  opacity: 0.95;\n  z-index: 10;\n  position: ;\n}"), activeFile: "styles.css", highlightToken: "position: ;", tests: [{ id: "opacity-layer-position-set", kind: "style", selector: ".notice-banner", prop: "position", equals: "relative", readable: "positioned", label: "The notice is positioned" }], hints: [{ level: 1, text: "Stacking only applies to a positioned element." }, { level: 2, text: "Write relative after the colon." }], xp: 45 }),
    s60({ id: "opacity-layer-background-color", task: "Tint the notice so it reads as urgent.", inputMode: "guided", files: solvedOpacityLayer(".notice-banner {\n  padding: 16px;\n  opacity: 0.95;\n  z-index: 10;\n  position: relative;\n  background-color: ;\n}"), activeFile: "styles.css", highlightToken: "background-color: ;", tests: [{ id: "opacity-layer-background-color-set", kind: "style", selector: ".notice-banner", prop: "background-color", equals: "rgb(254, 242, 242)", readable: "pale red", label: "The notice has a background of pale red" }], hints: [{ level: 1, text: "Use the pale red code." }, { level: 2, text: "Write #fef2f2 after the colon." }], xp: 45 }),
    s61({ id: "text-detail-text-transform", task: "Put the card text in capitals.", inputMode: "guided", files: solvedTextDetail(".info-card {\n  text-transform: ;\n}"), activeFile: "styles.css", highlightToken: "text-transform: ;", tests: [{ id: "text-detail-text-transform-set", kind: "style", selector: ".info-card", prop: "text-transform", equals: "uppercase", readable: "capital letters", label: "The card text is set to capital letters" }], hints: [{ level: 1, text: "Use the value that makes every letter a capital." }, { level: 2, text: "Write uppercase after the colon." }], xp: 45 }),
    s61({ id: "text-detail-font-style", task: "Keep the text upright rather than slanted.", inputMode: "guided", files: solvedTextDetail(".info-card {\n  text-transform: uppercase;\n  font-style: ;\n}"), activeFile: "styles.css", highlightToken: "font-style: ;", tests: [{ id: "text-detail-font-style-set", kind: "style", selector: ".info-card", prop: "font-style", equals: "normal", readable: "upright", label: "The card text is set to upright" }], hints: [{ level: 1, text: "Use the value that means not italic." }, { level: 2, text: "Write normal after the colon." }], xp: 45 }),
    s61({ id: "text-detail-text-decoration-line", task: "Underline the card text.", inputMode: "guided", files: solvedTextDetail(".info-card {\n  text-transform: uppercase;\n  font-style: normal;\n  text-decoration-line: ;\n}"), activeFile: "styles.css", highlightToken: "text-decoration-line: ;", tests: [{ id: "text-detail-text-decoration-line-set", kind: "style", selector: ".info-card", prop: "text-decoration-line", equals: "underline", readable: "underlined", label: "The card text is set to underlined" }], hints: [{ level: 1, text: "Use the value that draws a line under the words." }, { level: 2, text: "Write underline after the colon." }], xp: 45 }),
    s61({ id: "text-detail-text-indent", task: "Indent the first line.", inputMode: "guided", files: solvedTextDetail(".info-card {\n  text-transform: uppercase;\n  font-style: normal;\n  text-decoration-line: underline;\n  text-indent: ;\n}"), activeFile: "styles.css", highlightToken: "text-indent: ;", tests: [{ id: "text-detail-text-indent-set", kind: "style", selector: ".info-card", prop: "text-indent", equals: "8px", readable: "8 pixels of indent", label: "The card text is set to 8 pixels of indent" }], hints: [{ level: 1, text: "Use a pixel value for the first-line indent." }, { level: 2, text: "Write 8px after the colon." }], xp: 45 }),
    s61({ id: "text-detail-word-spacing", task: "Loosen the gaps between words slightly.", inputMode: "guided", files: solvedTextDetail(".info-card {\n  text-transform: uppercase;\n  font-style: normal;\n  text-decoration-line: underline;\n  text-indent: 8px;\n  word-spacing: ;\n}"), activeFile: "styles.css", highlightToken: "word-spacing: ;", tests: [{ id: "text-detail-word-spacing-set", kind: "style", selector: ".info-card", prop: "word-spacing", equals: "1px", readable: "1 pixel between words", label: "The card text is set to 1 pixel between words" }], hints: [{ level: 1, text: "Use a small pixel value." }, { level: 2, text: "Write 1px after the colon." }], xp: 45 }),
    s62({ id: "sizing-limits-min-width", task: "Stop the card shrinking below a readable width.", inputMode: "guided", files: solvedSizingLimits(".info-card {\n  min-width: ;\n}"), activeFile: "styles.css", highlightToken: "min-width: ;", tests: [{ id: "sizing-limits-min-width-set", kind: "style", selector: ".info-card", prop: "min-width", equals: "240px", readable: "240 pixels", label: "The card is set to 240 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the narrowest it may get." }, { level: 2, text: "Write 240px after the colon." }], xp: 45 }),
    s62({ id: "sizing-limits-max-width", task: "Stop the card growing past a comfortable line length.", inputMode: "guided", files: solvedSizingLimits(".info-card {\n  min-width: 240px;\n  max-width: ;\n}"), activeFile: "styles.css", highlightToken: "max-width: ;", tests: [{ id: "sizing-limits-max-width-set", kind: "style", selector: ".info-card", prop: "max-width", equals: "520px", readable: "520 pixels", label: "The card stops growing past 520 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the widest it may get." }, { level: 2, text: "Write 520px after the colon." }], xp: 45 }),
    s62({ id: "sizing-limits-min-height", task: "Keep the card from collapsing when it holds little text.", inputMode: "guided", files: solvedSizingLimits(".info-card {\n  min-width: 240px;\n  max-width: 520px;\n  min-height: ;\n}"), activeFile: "styles.css", highlightToken: "min-height: ;", tests: [{ id: "sizing-limits-min-height-set", kind: "style", selector: ".info-card", prop: "min-height", equals: "120px", readable: "120 pixels", label: "The card stays at least 120 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the shortest it may be." }, { level: 2, text: "Write 120px after the colon." }], xp: 45 }),
    s62({ id: "sizing-limits-box-sizing", task: "Count the padding inside those limits rather than on top of them.", inputMode: "guided", files: solvedSizingLimits(".info-card {\n  min-width: 240px;\n  max-width: 520px;\n  min-height: 120px;\n  box-sizing: ;\n}"), activeFile: "styles.css", highlightToken: "box-sizing: ;", tests: [{ id: "sizing-limits-box-sizing-set", kind: "style", selector: ".info-card", prop: "box-sizing", equals: "border-box", readable: "border box", label: "The card measures itself as border box" }], hints: [{ level: 1, text: "Use the sizing value that includes padding and border." }, { level: 2, text: "Write border-box after the colon." }], xp: 45 }),
    s62({ id: "sizing-limits-padding", task: "Give the card room inside its limits.", inputMode: "guided", files: solvedSizingLimits(".info-card {\n  min-width: 240px;\n  max-width: 520px;\n  min-height: 120px;\n  box-sizing: border-box;\n  padding: ;\n}"), activeFile: "styles.css", highlightToken: "padding: ;", tests: [{ id: "sizing-limits-padding-set", kind: "style", selector: ".info-card", prop: "padding-top", equals: "20px", readable: "20 pixels", label: "The card has room inside of 20 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the inside room." }, { level: 2, text: "Write 20px after the colon." }], xp: 45 }),
    s63({ id: "centre-backgrounds-background-color", task: "Tint the banner pale green.", inputMode: "guided", files: solvedCentreBackgrounds(".notice-banner {\n  background-color: ;\n}"), activeFile: "styles.css", highlightToken: "background-color: ;", tests: [{ id: "centre-backgrounds-background-color-set", kind: "style", selector: ".notice-banner", prop: "background-color", equals: "rgb(236, 253, 245)", readable: "pale green", label: "The banner has a background of pale green" }], hints: [{ level: 1, text: "Use the pale green code named in the task." }, { level: 2, text: "Write #ecfdf5 after the colon." }], xp: 45 }),
    s63({ id: "centre-backgrounds-background-image", task: "Fade the banner from its top colour into a deeper one.", inputMode: "guided", files: solvedCentreBackgrounds(".notice-banner {\n  background-color: #ecfdf5;\n  background-image: ;\n}"), activeFile: "styles.css", highlightToken: "background-image: ;", tests: [{ id: "centre-backgrounds-background-image-set", kind: "source-matches", file: "styles.css", pattern: "background-image\s*:\s*linear-gradient", flags: "i", because: "A gradient names the colours it fades between.", label: "The banner is set to a colour that fades down" }], hints: [{ level: 1, text: "Name the two colours the fade runs between." }, { level: 2, text: "Write linear-gradient(#ecfdf5, #d1fae5) after the colon." }], xp: 55 }),
    s63({ id: "centre-backgrounds-background-clip", task: "Stop the background running under the border.", inputMode: "guided", files: solvedCentreBackgrounds(".notice-banner {\n  background-color: #ecfdf5;\n  background-image: linear-gradient(#ecfdf5, #d1fae5);\n  background-clip: ;\n}"), activeFile: "styles.css", highlightToken: "background-clip: ;", tests: [{ id: "centre-backgrounds-background-clip-set", kind: "style", selector: ".notice-banner", prop: "background-clip", equals: "padding-box", readable: "kept inside the padding", label: "The banner is set to kept inside the padding" }], hints: [{ level: 1, text: "Name the box the background should stop at." }, { level: 2, text: "Write padding-box after the colon." }], xp: 45 }),
    s63({ id: "centre-backgrounds-padding", task: "Give the banner room inside.", inputMode: "guided", files: solvedCentreBackgrounds(".notice-banner {\n  background-color: #ecfdf5;\n  background-image: linear-gradient(#ecfdf5, #d1fae5);\n  background-clip: padding-box;\n  padding: ;\n}"), activeFile: "styles.css", highlightToken: "padding: ;", tests: [{ id: "centre-backgrounds-padding-set", kind: "style", selector: ".notice-banner", prop: "padding-top", equals: "18px", readable: "18 pixels", label: "The banner has room inside of 18 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the inside room." }, { level: 2, text: "Write 18px after the colon." }], xp: 45 }),
    s63({ id: "centre-backgrounds-border-radius", task: "Round the banner corners.", inputMode: "guided", files: solvedCentreBackgrounds(".notice-banner {\n  background-color: #ecfdf5;\n  background-image: linear-gradient(#ecfdf5, #d1fae5);\n  background-clip: padding-box;\n  padding: 18px;\n  border-radius: ;\n}"), activeFile: "styles.css", highlightToken: "border-radius: ;", tests: [{ id: "centre-backgrounds-border-radius-set", kind: "style", selector: ".notice-banner", prop: "border-top-left-radius", equals: "8px", readable: "8 pixels", label: "The banner has corners curved by 8 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the corner curve." }, { level: 2, text: "Write 8px after the colon." }], xp: 45 }),
    s64({ id: "board-units-font-size", task: "Size the card text from the page setting instead of a fixed number.", inputMode: "guided", files: solvedBoardUnits(".info-card {\n  font-size: ;\n}"), activeFile: "styles.css", highlightToken: "font-size: ;", tests: [{ id: "board-units-font-size-set", kind: "style", selector: ".info-card", prop: "font-size", equals: "16px", readable: "one root size", label: "The card sets its text at one root size" }], hints: [{ level: 1, text: "Use the unit that means one root font size." }, { level: 2, text: "Write 1rem after the colon." }], xp: 45 }),
    s64({ id: "board-units-padding", task: "Set the inside room in the same scaling unit.", inputMode: "guided", files: solvedBoardUnits(".info-card {\n  font-size: 1rem;\n  padding: ;\n}"), activeFile: "styles.css", highlightToken: "padding: ;", tests: [{ id: "board-units-padding-set", kind: "style", selector: ".info-card", prop: "padding-top", equals: "20px", readable: "1.25 root sizes", label: "The card has room inside of 1.25 root sizes" }], hints: [{ level: 1, text: "Use a rem value a little over one." }, { level: 2, text: "Write 1.25rem after the colon." }], xp: 45 }),
    s64({ id: "board-units-max-width", task: "Cap the card width in the same unit.", inputMode: "guided", files: solvedBoardUnits(".info-card {\n  font-size: 1rem;\n  padding: 1.25rem;\n  max-width: ;\n}"), activeFile: "styles.css", highlightToken: "max-width: ;", tests: [{ id: "board-units-max-width-set", kind: "style", selector: ".info-card", prop: "max-width", equals: "480px", readable: "30 root sizes", label: "The card stops growing past 30 root sizes" }], hints: [{ level: 1, text: "Use a rem value for the widest it may get." }, { level: 2, text: "Write 30rem after the colon." }], xp: 45 }),
    s64({ id: "board-units-line-height", task: "Space the lines relative to the text size.", inputMode: "guided", files: solvedBoardUnits(".info-card {\n  font-size: 1rem;\n  padding: 1.25rem;\n  max-width: 30rem;\n  line-height: ;\n}"), activeFile: "styles.css", highlightToken: "line-height: ;", tests: [{ id: "board-units-line-height-set", kind: "style", selector: ".info-card", prop: "line-height", equals: "24px", readable: "1.5 times the text size", label: "The card spaces its lines by 1.5 times the text size" }], hints: [{ level: 1, text: "Use a number with no unit." }, { level: 2, text: "Write 1.5 after the colon." }], xp: 45 }),
    s64({ id: "board-units-border-radius", task: "Round the corners in the same scaling unit.", inputMode: "guided", files: solvedBoardUnits(".info-card {\n  font-size: 1rem;\n  padding: 1.25rem;\n  max-width: 30rem;\n  line-height: 1.5;\n  border-radius: ;\n}"), activeFile: "styles.css", highlightToken: "border-radius: ;", tests: [{ id: "board-units-border-radius-set", kind: "style", selector: ".info-card", prop: "border-top-left-radius", equals: "8px", readable: "half a root size", label: "The card has corners curved by half a root size" }], hints: [{ level: 1, text: "Use a rem value below one." }, { level: 2, text: "Write 0.5rem after the colon." }], xp: 45 }),
    s65({ id: "stall-2-list-style-type", task: "Take the bullets off the list.", inputMode: "guided", files: solvedStall2(".item-list {\n  list-style-type: ;\n}"), activeFile: "styles.css", highlightToken: "list-style-type: ;", tests: [{ id: "stall-2-list-style-type-set", kind: "style", selector: ".item-list", prop: "list-style-type", equals: "none", readable: "no bullets", label: "The list is set to no bullets" }], hints: [{ level: 1, text: "Use the value that means no marker at all." }, { level: 2, text: "Write none after the colon." }], xp: 45 }),
    s65({ id: "stall-2-padding-left", task: "Remove the indent the bullets left behind.", inputMode: "guided", files: solvedStall2(".item-list {\n  list-style-type: none;\n  padding-left: ;\n}"), activeFile: "styles.css", highlightToken: "padding-left: ;", tests: [{ id: "stall-2-padding-left-set", kind: "style", selector: ".item-list", prop: "padding-left", equals: "0px", readable: "no left indent", label: "The list keeps its words clear by no left indent" }], hints: [{ level: 1, text: "Use zero pixels." }, { level: 2, text: "Write 0px after the colon." }], xp: 45 }),
    s65({ id: "stall-2-background-color", task: "Tint the list so it reads as one block.", inputMode: "guided", files: solvedStall2(".item-list {\n  list-style-type: none;\n  padding-left: 0px;\n  background-color: ;\n}"), activeFile: "styles.css", highlightToken: "background-color: ;", tests: [{ id: "stall-2-background-color-set", kind: "style", selector: ".item-list", prop: "background-color", equals: "rgb(248, 250, 252)", readable: "pale grey", label: "The list has a background of pale grey" }], hints: [{ level: 1, text: "Use the pale grey code." }, { level: 2, text: "Write #f8fafc after the colon." }], xp: 45 }),
    s65({ id: "stall-2-border-radius", task: "Round the list corners.", inputMode: "guided", files: solvedStall2(".item-list {\n  list-style-type: none;\n  padding-left: 0px;\n  background-color: #f8fafc;\n  border-radius: ;\n}"), activeFile: "styles.css", highlightToken: "border-radius: ;", tests: [{ id: "stall-2-border-radius-set", kind: "style", selector: ".item-list", prop: "border-top-left-radius", equals: "8px", readable: "8 pixels", label: "The list has corners curved by 8 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the corner curve." }, { level: 2, text: "Write 8px after the colon." }], xp: 45 }),
    s65({ id: "stall-2-padding-top", task: "Keep the first item clear of the top edge.", inputMode: "guided", files: solvedStall2(".item-list {\n  list-style-type: none;\n  padding-left: 0px;\n  background-color: #f8fafc;\n  border-radius: 8px;\n  padding-top: ;\n}"), activeFile: "styles.css", highlightToken: "padding-top: ;", tests: [{ id: "stall-2-padding-top-set", kind: "style", selector: ".item-list", prop: "padding-top", equals: "12px", readable: "12 pixels", label: "The list has room above of 12 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the space above." }, { level: 2, text: "Write 12px after the colon." }], xp: 45 }),
    s66({ id: "hover-state-padding", task: "Give the row room inside.", inputMode: "guided", files: solvedHoverState(".price-row {\n  padding: ;\n}"), activeFile: "styles.css", highlightToken: "padding: ;", tests: [{ id: "hover-state-padding-set", kind: "style", selector: ".price-row", prop: "padding-top", equals: "12px", readable: "12 pixels", label: "The row has room inside of 12 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the inside room." }, { level: 2, text: "Write 12px after the colon." }], xp: 45 }),
    s66({ id: "hover-state-cursor", task: "Show that the row can be clicked.", inputMode: "guided", files: solvedHoverState(".price-row {\n  padding: 12px;\n  cursor: ;\n}"), activeFile: "styles.css", highlightToken: "cursor: ;", tests: [{ id: "hover-state-cursor-set", kind: "style", selector: ".price-row", prop: "cursor", equals: "pointer", readable: "a pointing hand", label: "The row is set to a pointing hand" }], hints: [{ level: 1, text: "Use the cursor value that shows a pointing hand." }, { level: 2, text: "Write pointer after the colon." }], xp: 45 }),
    s66({ id: "hover-state-transition-property", task: "Name what should change smoothly rather than snapping.", inputMode: "guided", files: solvedHoverState(".price-row {\n  padding: 12px;\n  cursor: pointer;\n  transition-property: ;\n}"), activeFile: "styles.css", highlightToken: "transition-property: ;", tests: [{ id: "hover-state-transition-property-set", kind: "style", selector: ".price-row", prop: "transition-property", equals: "background-color", readable: "a smooth colour change", label: "The row is set to a smooth colour change" }], hints: [{ level: 1, text: "Name the property that will change." }, { level: 2, text: "Write background-color after the colon." }], xp: 45 }),
    s66({ id: "hover-state-transition-duration", task: "Set how long that change takes.", inputMode: "guided", files: solvedHoverState(".price-row {\n  padding: 12px;\n  cursor: pointer;\n  transition-property: background-color;\n  transition-duration: ;\n}"), activeFile: "styles.css", highlightToken: "transition-duration: ;", tests: [{ id: "hover-state-transition-duration-set", kind: "style", selector: ".price-row", prop: "transition-duration", equals: "0.15s", readable: "150 milliseconds", label: "The row is set to 150 milliseconds" }], hints: [{ level: 1, text: "Use a value in milliseconds." }, { level: 2, text: "Write 150ms after the colon." }], xp: 45 }),
    s66({ id: "hover-state-transition-timing-function", task: "Make the change start quickly and settle gently.", inputMode: "guided", files: solvedHoverState(".price-row {\n  padding: 12px;\n  cursor: pointer;\n  transition-property: background-color;\n  transition-duration: 150ms;\n  transition-timing-function: ;\n}"), activeFile: "styles.css", highlightToken: "transition-timing-function: ;", tests: [{ id: "hover-state-transition-timing-function-set", kind: "style", selector: ".price-row", prop: "transition-timing-function", equals: "ease-out", readable: "quick then gentle", label: "The row is set to quick then gentle" }], hints: [{ level: 1, text: "Use the timing value that eases at the end." }, { level: 2, text: "Write ease-out after the colon." }], xp: 45 }),
    s67({ id: "grid-repeat-display", task: "Lay the cells out as a grid.", inputMode: "guided", files: solvedGridRepeat(".stall-grid {\n  display: ;\n}"), activeFile: "styles.css", highlightToken: "display: ;", tests: [{ id: "grid-repeat-display-set", kind: "style", selector: ".stall-grid", prop: "display", equals: "grid", readable: "a grid", label: "The grid is laid out as a grid" }], hints: [{ level: 1, text: "Use the display value made for rows and columns together." }, { level: 2, text: "Write grid after the colon." }], xp: 45 }),
    s67({ id: "grid-repeat-grid-template-columns", task: "Ask for two equal columns without writing the track twice.", inputMode: "guided", files: solvedGridRepeat(".stall-grid {\n  display: grid;\n  grid-template-columns: ;\n}"), activeFile: "styles.css", highlightToken: "grid-template-columns: ;", tests: [{ id: "grid-repeat-grid-template-columns-set", kind: "source-matches", file: "styles.css", pattern: "grid-template-columns\s*:\s*repeat\(2,\s*1fr\)", flags: "i", because: "Repeat asks for the same track twice without writing it twice.", label: "The grid is divided into two repeated columns" }], hints: [{ level: 1, text: "Use the function that repeats a track a number of times." }, { level: 2, text: "Write repeat(2, 1fr) after the colon." }], xp: 55 }),
    s67({ id: "grid-repeat-row-gap", task: "Space the rows apart.", inputMode: "guided", files: solvedGridRepeat(".stall-grid {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  row-gap: ;\n}"), activeFile: "styles.css", highlightToken: "row-gap: ;", tests: [{ id: "grid-repeat-row-gap-set", kind: "style", selector: ".stall-grid", prop: "row-gap", equals: "10px", readable: "10 pixels between rows", label: "The grid is set to 10 pixels between rows" }], hints: [{ level: 1, text: "Use a pixel value for the gap between rows." }, { level: 2, text: "Write 10px after the colon." }], xp: 45 }),
    s67({ id: "grid-repeat-column-gap", task: "Use a wider gap between the columns.", inputMode: "guided", files: solvedGridRepeat(".stall-grid {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  row-gap: 10px;\n  column-gap: ;\n}"), activeFile: "styles.css", highlightToken: "column-gap: ;", tests: [{ id: "grid-repeat-column-gap-set", kind: "style", selector: ".stall-grid", prop: "column-gap", equals: "16px", readable: "16 pixels between columns", label: "The grid is set to 16 pixels between columns" }], hints: [{ level: 1, text: "Use a pixel value for the gap between columns." }, { level: 2, text: "Write 16px after the colon." }], xp: 45 }),
    s67({ id: "grid-repeat-align-items", task: "Make every cell in a row the same height.", inputMode: "guided", files: solvedGridRepeat(".stall-grid {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  row-gap: 10px;\n  column-gap: 16px;\n  align-items: ;\n}"), activeFile: "styles.css", highlightToken: "align-items: ;", tests: [{ id: "grid-repeat-align-items-set", kind: "style", selector: ".stall-grid", prop: "align-items", equals: "stretch", readable: "cells of equal height", label: "The grid lines its children up cells of equal height" }], hints: [{ level: 1, text: "Use the value that stretches children to fill the row." }, { level: 2, text: "Write stretch after the colon." }], xp: 45 }),
    s68({ id: "list-2-padding", task: "Give the notice room inside.", inputMode: "guided", files: solvedList2(".notice-banner {\n  padding: ;\n}"), activeFile: "styles.css", highlightToken: "padding: ;", tests: [{ id: "list-2-padding-set", kind: "style", selector: ".notice-banner", prop: "padding-top", equals: "16px", readable: "16 pixels", label: "The notice has room inside of 16 pixels" }], hints: [{ level: 1, text: "Use a pixel value for the inside room." }, { level: 2, text: "Write 16px after the colon." }], xp: 45 }),
    s68({ id: "list-2-opacity", task: "Soften the notice very slightly.", inputMode: "guided", files: solvedList2(".notice-banner {\n  padding: 16px;\n  opacity: ;\n}"), activeFile: "styles.css", highlightToken: "opacity: ;", tests: [{ id: "list-2-opacity-set", kind: "style", selector: ".notice-banner", prop: "opacity", equals: "0.95", readable: "very slightly see-through", label: "The notice is set to very slightly see-through" }], hints: [{ level: 1, text: "Use a number just below one." }, { level: 2, text: "Write 0.95 after the colon." }], xp: 45 }),
    s68({ id: "list-2-z-index", task: "Keep the notice above anything it overlaps.", inputMode: "guided", files: solvedList2(".notice-banner {\n  padding: 16px;\n  opacity: 0.95;\n  z-index: ;\n}"), activeFile: "styles.css", highlightToken: "z-index: ;", tests: [{ id: "list-2-z-index-set", kind: "style", selector: ".notice-banner", prop: "z-index", equals: "10", readable: "stacked above", label: "The notice is set to stacked above" }], hints: [{ level: 1, text: "Use a whole number; higher sits on top." }, { level: 2, text: "Write 10 after the colon." }], xp: 45 }),
    s68({ id: "list-2-position", task: "Give the stacking order something to apply to.", inputMode: "guided", files: solvedList2(".notice-banner {\n  padding: 16px;\n  opacity: 0.95;\n  z-index: 10;\n  position: ;\n}"), activeFile: "styles.css", highlightToken: "position: ;", tests: [{ id: "list-2-position-set", kind: "style", selector: ".notice-banner", prop: "position", equals: "relative", readable: "positioned", label: "The notice is positioned" }], hints: [{ level: 1, text: "Stacking only applies to a positioned element." }, { level: 2, text: "Write relative after the colon." }], xp: 45 }),
    s68({ id: "list-2-background-color", task: "Tint the notice so it reads as urgent.", inputMode: "guided", files: solvedList2(".notice-banner {\n  padding: 16px;\n  opacity: 0.95;\n  z-index: 10;\n  position: relative;\n  background-color: ;\n}"), activeFile: "styles.css", highlightToken: "background-color: ;", tests: [{ id: "list-2-background-color-set", kind: "style", selector: ".notice-banner", prop: "background-color", equals: "rgb(254, 242, 242)", readable: "pale red", label: "The notice has a background of pale red" }], hints: [{ level: 1, text: "Use the pale red code." }, { level: 2, text: "Write #fef2f2 after the colon." }], xp: 45 }),
    s69({ id: "table-2-text-transform", task: "Put the card text in capitals.", inputMode: "guided", files: solvedTable2(".info-card {\n  text-transform: ;\n}"), activeFile: "styles.css", highlightToken: "text-transform: ;", tests: [{ id: "table-2-text-transform-set", kind: "style", selector: ".info-card", prop: "text-transform", equals: "uppercase", readable: "capital letters", label: "The card text is set to capital letters" }], hints: [{ level: 1, text: "Use the value that makes every letter a capital." }, { level: 2, text: "Write uppercase after the colon." }], xp: 45 }),
    s69({ id: "table-2-font-style", task: "Keep the text upright rather than slanted.", inputMode: "guided", files: solvedTable2(".info-card {\n  text-transform: uppercase;\n  font-style: ;\n}"), activeFile: "styles.css", highlightToken: "font-style: ;", tests: [{ id: "table-2-font-style-set", kind: "style", selector: ".info-card", prop: "font-style", equals: "normal", readable: "upright", label: "The card text is set to upright" }], hints: [{ level: 1, text: "Use the value that means not italic." }, { level: 2, text: "Write normal after the colon." }], xp: 45 }),
    s69({ id: "table-2-text-decoration-line", task: "Underline the card text.", inputMode: "guided", files: solvedTable2(".info-card {\n  text-transform: uppercase;\n  font-style: normal;\n  text-decoration-line: ;\n}"), activeFile: "styles.css", highlightToken: "text-decoration-line: ;", tests: [{ id: "table-2-text-decoration-line-set", kind: "style", selector: ".info-card", prop: "text-decoration-line", equals: "underline", readable: "underlined", label: "The card text is set to underlined" }], hints: [{ level: 1, text: "Use the value that draws a line under the words." }, { level: 2, text: "Write underline after the colon." }], xp: 45 }),
    s69({ id: "table-2-text-indent", task: "Indent the first line.", inputMode: "guided", files: solvedTable2(".info-card {\n  text-transform: uppercase;\n  font-style: normal;\n  text-decoration-line: underline;\n  text-indent: ;\n}"), activeFile: "styles.css", highlightToken: "text-indent: ;", tests: [{ id: "table-2-text-indent-set", kind: "style", selector: ".info-card", prop: "text-indent", equals: "8px", readable: "8 pixels of indent", label: "The card text is set to 8 pixels of indent" }], hints: [{ level: 1, text: "Use a pixel value for the first-line indent." }, { level: 2, text: "Write 8px after the colon." }], xp: 45 }),
    s69({ id: "table-2-word-spacing", task: "Loosen the gaps between words slightly.", inputMode: "guided", files: solvedTable2(".info-card {\n  text-transform: uppercase;\n  font-style: normal;\n  text-decoration-line: underline;\n  text-indent: 8px;\n  word-spacing: ;\n}"), activeFile: "styles.css", highlightToken: "word-spacing: ;", tests: [{ id: "table-2-word-spacing-set", kind: "style", selector: ".info-card", prop: "word-spacing", equals: "1px", readable: "1 pixel between words", label: "The card text is set to 1 pixel between words" }], hints: [{ level: 1, text: "Use a small pixel value." }, { level: 2, text: "Write 1px after the colon." }], xp: 45 }),
  ],
};
