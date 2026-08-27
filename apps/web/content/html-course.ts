import type { Course, Step } from "@/lib/lesson-ir";

/**
 * Course 1 — Learn HTML by Building a Sari-Sari Store Page.
 *
 * freeCodeCamp structure: one project, built across many small steps. Each
 * step changes one thing, starts from where the last step ended, and is
 * checked by assertions the learner can read before running.
 */

let n = 0;

const HEAD = `<!DOCTYPE html>
<html>
  <head>
    <title>Aling Nena's Store</title>
  </head>
  <body>
`;
const TAIL = `  </body>
</html>`;

/** Wraps body markup in the boilerplate the learner is not editing yet. */
const page = (body: string) => `${HEAD}${body}${TAIL}`;

interface StepReference {
  estimatedMinutes: number;
  solution: Record<string, string>;
}

const solved = (body: string): Record<string, string> => ({ "index.html": page(body) });

const ORDER_FOOTER_BODY = `    <header>
      <h1>Aling Nena's Store</h1>
    </header>
    <h2>Order</h2>
    <form>
      <label for="item">What do you need?</label>
      <input type="text" id="item">
      <button>Send Order</button>
    </form>
    <footer>Open daily from 6am to 10pm.</footer>
`;

const MAIN_BODY = `    <header>
      <h1>Aling Nena's Store</h1>
    </header>
    <main>
      <h2>Order</h2>
      <form>
        <label for="item">What do you need?</label>
        <input type="text" id="item">
        <button>Send Order</button>
      </form>
    </main>
    <footer>Open daily from 6am to 10pm.</footer>
`;

const REQUIRED_BODY = MAIN_BODY.replace(
  '<input type="text" id="item">',
  '<input type="text" id="item" required>',
);
const NAMED_INPUT_BODY = REQUIRED_BODY.replace(
  '<input type="text" id="item" required>',
  '<input type="text" id="item" name="item" required>',
);
const SUBMIT_TYPE_BODY = NAMED_INPUT_BODY.replace(
  "<button>Send Order</button>",
  '<button type="submit">Send Order</button>',
);
const FIELDSET_BODY = SUBMIT_TYPE_BODY.replace(
  `      <form>
        <label for="item">What do you need?</label>
        <input type="text" id="item" name="item" required>
        <button type="submit">Send Order</button>
      </form>`,
  `      <form>
        <fieldset>
          <label for="item">What do you need?</label>
          <input type="text" id="item" name="item" required>
          <button type="submit">Send Order</button>
        </fieldset>
      </form>`,
);
const LEGEND_BODY = FIELDSET_BODY.replace(
  "        <fieldset>\n",
  "        <fieldset>\n          <legend>Order details</legend>\n",
);
const QUANTITY_BODY = LEGEND_BODY.replace(
  '          <input type="text" id="item" name="item" required>',
  `          <input type="text" id="item" name="item" required>
          <label for="quantity">How many?</label>
          <input type="text" id="quantity" name="quantity" required>`,
);
const NUMBER_BODY = QUANTITY_BODY.replace(
  '<input type="text" id="quantity" name="quantity" required>',
  '<input type="number" id="quantity" name="quantity" required>',
);
const MINIMUM_BODY = NUMBER_BODY.replace(
  '<input type="number" id="quantity" name="quantity" required>',
  '<input type="number" id="quantity" name="quantity" min="1" required>',
);
const PICKUP_SELECT_BODY = MINIMUM_BODY.replace(
  '          <input type="number" id="quantity" name="quantity" min="1" required>',
  `          <input type="number" id="quantity" name="quantity" min="1" required>
          <label for="pickup">Pickup time</label>
          <select id="pickup" name="pickup"></select>`,
);
const PICKUP_OPTIONS_BODY = PICKUP_SELECT_BODY.replace(
  '          <select id="pickup" name="pickup"></select>',
  `          <select id="pickup" name="pickup">
            <option>Morning</option>
            <option>Afternoon</option>
            <option>Evening</option>
          </select>`,
);
const ORDER_NOTES_BODY = PICKUP_OPTIONS_BODY.replace(
  "          </select>\n",
  `          </select>
          <label for="notes">Order notes</label>
          <textarea id="notes" name="notes"></textarea>
`,
);
const CHECKBOX_BODY = ORDER_NOTES_BODY.replace(
  '          <button type="submit">Send Order</button>',
  `          <label><input type="checkbox" name="agree" required> I agree to pay on pickup.</label>
          <button type="submit">Send Order</button>`,
);
const RADIO_CASH_BODY = CHECKBOX_BODY.replace(
  '          <label><input type="checkbox" name="agree" required> I agree to pay on pickup.</label>',
  `          <label><input type="checkbox" name="agree" required> I agree to pay on pickup.</label>
          <label><input type="radio" name="payment" value="cash"> Cash</label>`,
);
const RADIO_GCASH_BODY = RADIO_CASH_BODY.replace(
  '          <label><input type="radio" name="payment" value="cash"> Cash</label>',
  `          <label><input type="radio" name="payment" value="cash"> Cash</label>
          <label><input type="radio" name="payment" value="gcash"> GCash</label>`,
);
const PLACEHOLDER_BODY = RADIO_GCASH_BODY.replace(
  '<input type="text" id="item" name="item" required>',
  '<input type="text" id="item" name="item" required placeholder="e.g. rice, eggs">',
);
const SMALL_NOTE_BODY = PLACEHOLDER_BODY.replace(
  "        </fieldset>\n      </form>",
  `        </fieldset>
        <small>We call to confirm your order.</small>
      </form>`,
);
const STRONG_EMPHASIS_BODY = SMALL_NOTE_BODY.replace(
  "<small>We call to confirm your order.</small>",
  "<small><strong>We call</strong> to confirm your order.</small>",
);

/**
 * Builds a tap-to-build starting page: one blank line, at a known slotLine,
 * standing in for `marker` inside `body`. `placeBlock` (AGENTS.md rule 1.5)
 * only fills a genuinely blank line, so the marker is stripped after its
 * line number is captured, leaving real whitespace behind.
 */
function slotPage(body: string, marker: string): { page: string; slotLine: number } {
  const withMarker = page(body);
  const index = withMarker.indexOf(marker);
  if (index === -1) throw new Error(`Slot marker not found: ${marker}`);
  return {
    page: withMarker.replace(marker, ""),
    slotLine: withMarker.slice(0, index).split("\n").length,
  };
}

const RADIO_CASH_SLOT = slotPage(
  CHECKBOX_BODY.replace(
    '          <label><input type="checkbox" name="agree" required> I agree to pay on pickup.</label>\n',
    '          <label><input type="checkbox" name="agree" required> I agree to pay on pickup.</label>\n          @@SLOT@@\n',
  ),
  "@@SLOT@@",
);

const STRONG_EMPHASIS_SLOT = slotPage(
  SMALL_NOTE_BODY.replace(
    "<small>We call to confirm your order.</small>",
    "@@SLOT@@",
  ),
  "@@SLOT@@",
);

/**
 * Project 2 — Price List Table. A new project starts a fresh document
 * (decision 24), not a continuation of project 1's finished markup.
 */
const TABLE_SKELETON_SLOT = slotPage("    @@SLOT@@\n", "@@SLOT@@");

const TABLE_SKELETON_BODY = "    <table>\n    </table>\n";
const TABLE_HEADER_BODY =
  "    <table>\n      <tr><th>Item</th><th>Price</th></tr>\n    </table>\n";
const TABLE_ROW_BODY = TABLE_HEADER_BODY.replace(
  "    </table>\n",
  "      <tr><td>Rice</td><td>58</td></tr>\n    </table>\n",
);
const ORDERED_LIST_BODY = `${TABLE_ROW_BODY}    <ol>
      <li>Choose your items</li>
      <li>Tell the cashier</li>
      <li>Pay on pickup</li>
    </ol>
`;
const BLOCKQUOTE_BODY = `${ORDERED_LIST_BODY}    <blockquote>Best rice prices in Divisoria!</blockquote>
`;
const FIGURE_BODY = `${BLOCKQUOTE_BODY}    <figure>
      <img src="store.png" alt="Aling Nena's store front">
      <figcaption>Our store since 1998</figcaption>
    </figure>
`;
const ADDRESS_BODY = `${FIGURE_BODY}    <address>Call 0917-000-0000, Barangay San Roque</address>
`;

/**
 * Project 3 — Barangay Water Notice. This begins with another fresh document
 * so each project remains a small, shareable build (decision 23).
 */
const NOTICE_ARTICLE_SLOT = slotPage("    @@SLOT@@\n", "@@SLOT@@");
const NOTICE_ARTICLE_BODY = "    <article>\n\n\n\n\n    </article>\n";
const NOTICE_TITLE_BODY =
  "    <article>\n      <h2>Water Service Notice</h2>\n\n\n\n    </article>\n";
const NOTICE_COPY_BODY =
  "    <article>\n      <h2>Water Service Notice</h2>\n      <p>Water service stops from 9am to 1pm on Monday.</p>\n\n\n    </article>\n";
const NOTICE_TIME_BODY =
  "    <article>\n      <h2>Water Service Notice</h2>\n      <p>Water service stops from 9am to 1pm on Monday.</p>\n      <time>Monday, 9am to 1pm</time>\n\n    </article>\n";
const NOTICE_DATETIME_BODY = NOTICE_TIME_BODY.replace(
  "<time>Monday, 9am to 1pm</time>",
  '<time datetime="2026-08-24T09:00">Monday, 9am to 1pm</time>',
);
const NOTICE_CONTACT_BODY = NOTICE_DATETIME_BODY.replace(
  "\n\n    </article>",
  "\n      <address>Contact Barangay San Roque: 0917-000-0000</address>\n    </article>",
);

/** Project 4 — Jeepney Route Guide. A fresh document, another small build. */
const ROUTE_NAV_SLOT = slotPage("    @@SLOT@@\n", "@@SLOT@@");
const ROUTE_NAV_BODY = "    <nav>\n\n\n    </nav>\n\n\n";
const ROUTE_TITLE_BODY =
  "    <nav>\n      <h2>Route Stops</h2>\n\n    </nav>\n\n\n";
const ROUTE_LIST_BODY =
  "    <nav>\n      <h2>Route Stops</h2>\n      <ul><li>Palengke</li></ul>\n    </nav>\n\n\n";
const ROUTE_LINK_BODY = ROUTE_LIST_BODY.replace(
  "<ul><li>Palengke</li></ul>",
  '<ul><li><a href="#palengke">Palengke</a></li></ul>',
);
const ROUTE_STOP_BODY = ROUTE_LINK_BODY.replace(
  "\n\n",
  '\n    <h2 id="palengke">Palengke</h2>\n',
);
const ROUTE_COPY_BODY = ROUTE_STOP_BODY.replace(
  "\n\n",
  "\n    <p>Palengke is a public market stop.</p>\n",
);

/** Project 5 — Turo-Turo Food Stall Menu. Starts from another fresh document. */
const MENU_DETAILS_SLOT = slotPage("    @@SLOT@@\n", "@@SLOT@@");
const MENU_DETAILS_BODY = "    <details>\n\n\n\n    </details>\n";
const MENU_SUMMARY_BODY =
  "    <details>\n      <summary>Today's dishes</summary>\n\n\n    </details>\n";
const MENU_ITEM_BODY =
  "    <details>\n      <summary>Today's dishes</summary>\n      <p>Chicken adobo</p>\n\n    </details>\n";
const MENU_PRICE_BODY = MENU_ITEM_BODY.replace(
  "<p>Chicken adobo</p>",
  "<p>Chicken adobo: PHP 85</p>",
);
const MENU_OPEN_BODY = MENU_PRICE_BODY.replace("<details>", "<details open>");
const MENU_NOTE_BODY = MENU_OPEN_BODY.replace(
  "\n\n    </details>",
  "\n      <small>Ask about allergy ingredients.</small>\n    </details>",
);

/** Project 6 — Adobo Recipe Facts. A fresh document for a compact recipe card. */
const RECIPE_LIST_SLOT = slotPage("    @@SLOT@@\n", "@@SLOT@@");
const RECIPE_LIST_BODY = "    <dl>\n\n\n\n\n    </dl>\n\n";
const RECIPE_TIME_TERM_BODY =
  "    <dl>\n      <dt>Cooking time</dt>\n\n\n\n    </dl>\n\n";
const RECIPE_TIME_VALUE_BODY =
  "    <dl>\n      <dt>Cooking time</dt>\n      <dd>30 minutes</dd>\n\n\n    </dl>\n\n";
const RECIPE_SERVINGS_TERM_BODY =
  "    <dl>\n      <dt>Cooking time</dt>\n      <dd>30 minutes</dd>\n      <dt>Serves</dt>\n\n    </dl>\n\n";
const RECIPE_SERVINGS_VALUE_BODY =
  "    <dl>\n      <dt>Cooking time</dt>\n      <dd>30 minutes</dd>\n      <dt>Serves</dt>\n      <dd>4 people</dd>\n    </dl>\n\n";
const RECIPE_NOTE_BODY = RECIPE_SERVINGS_VALUE_BODY.replace(
  "\n\n",
  "\n    <p>Best served with rice.</p>\n",
);

/** Project 7 — Barangay Clinic Bulletin. A fresh document for inline meaning. */
const CLINIC_PARAGRAPH_SLOT = slotPage("    @@SLOT@@\n", "@@SLOT@@");
const CLINIC_PARAGRAPH_BODY = "    <p>\n\n\n\n\n\n\n    </p>\n";
const CLINIC_MESSAGE_BODY =
  "    <p>\n      The BHW clinic is open.\n\n\n\n\n\n    </p>\n";
const CLINIC_ABBREVIATION_BODY = CLINIC_MESSAGE_BODY.replace(
  "The BHW clinic is open.",
  "The <abbr>BHW</abbr> clinic is open.",
);
const CLINIC_TITLE_BODY = CLINIC_ABBREVIATION_BODY.replace(
  "<abbr>BHW</abbr>",
  '<abbr title="Barangay Health Worker">BHW</abbr>',
);
const CLINIC_FREE_BODY = CLINIC_TITLE_BODY.replace(
  "\n\n",
  "\n      <mark>Free</mark> check-ups are available.\n",
);
const CLINIC_CANCELLED_BODY = CLINIC_FREE_BODY.replace(
  "\n\n",
  "\n      <del>Saturday clinic</del>\n",
);
const CLINIC_CORRECTED_BODY = CLINIC_CANCELLED_BODY.replace(
  "\n\n",
  "\n      <ins>Sunday clinic</ins>\n",
);

/** Project 8 — Computer Shop Connection Guide. A fresh document for technical text. */
const COMPUTER_PARAGRAPH_SLOT = slotPage("    @@SLOT@@\n", "@@SLOT@@");
const COMPUTER_PARAGRAPH_BODY = "    <p>\n\n\n\n\n    </p>\n";
const COMPUTER_MESSAGE_BODY =
  "    <p>\n      Press Enter to join the public network.\n\n\n\n    </p>\n";
const COMPUTER_KEY_BODY = COMPUTER_MESSAGE_BODY.replace(
  "Press Enter to join the public network.",
  "Press <kbd>Enter</kbd> to join the public network.",
);
const COMPUTER_CODE_BODY = COMPUTER_KEY_BODY.replace(
  "\n\n",
  "\n      <code>WIFI-2026</code> is the access code.\n",
);
const COMPUTER_STATUS_BODY = COMPUTER_CODE_BODY.replace(
  "\n\n",
  "\n      Status: <samp>Connected</samp>.\n",
);

/** Project 9 — Relief Supply Tracker. A fresh document for native measurements. */
const RELIEF_PROGRESS_SLOT = slotPage("    @@SLOT@@\n", "@@SLOT@@");
const RELIEF_PROGRESS_BODY = "    <label>Relief packs: <progress>\n\n    </progress></label>\n\n";
const RELIEF_PACKS_BODY =
  "    <label>Relief packs: <progress>\n      4 of 10 packs\n    </progress></label>\n\n";
const RELIEF_PROGRESS_VALUE_BODY = RELIEF_PACKS_BODY.replace(
  "<progress>",
  '<progress value="4">',
);
const RELIEF_PROGRESS_MAX_BODY = RELIEF_PROGRESS_VALUE_BODY.replace(
  '<progress value="4">',
  '<progress value="4" max="10">',
);
const RELIEF_METER_SLOT = slotPage(
  RELIEF_PROGRESS_MAX_BODY.replace("\n\n", "\n    @@SLOT@@\n"),
  "@@SLOT@@",
);
const RELIEF_METER_BODY = RELIEF_PROGRESS_MAX_BODY.replace(
  "\n\n",
  "\n    <label>Water level: <meter>Water level</meter></label>\n",
);
const RELIEF_METER_VALUE_BODY = RELIEF_METER_BODY.replace(
  "<meter>",
  '<meter value="60">',
);
const RELIEF_METER_MAX_BODY = RELIEF_METER_VALUE_BODY.replace(
  '<meter value="60">',
  '<meter value="60" max="100">',
);

/** Project 10 — Weather Photo. A fresh document for responsive images. */
const WEATHER_PICTURE_SLOT = slotPage("    @@SLOT@@\n", "@@SLOT@@");
const WEATHER_PICTURE_BODY = "    <picture>\n\n\n\n    </picture>\n";
const WEATHER_SOURCE_BODY =
  '    <picture>\n      <source srcset="rain-small.jpg">\n\n\n    </picture>\n';
const WEATHER_MEDIA_BODY = WEATHER_SOURCE_BODY.replace(
  '<source srcset="rain-small.jpg">',
  '<source media="(max-width: 600px)" srcset="rain-small.jpg">',
);
const WEATHER_IMAGE_BODY = WEATHER_MEDIA_BODY.replace(
  "\n\n",
  '\n      <img src="rain.jpg" alt="Rain clouds over Barangay San Roque">\n',
);
const WEATHER_LAZY_BODY = WEATHER_IMAGE_BODY.replace(
  '<img src="rain.jpg" alt="Rain clouds over Barangay San Roque">',
  '<img src="rain.jpg" alt="Rain clouds over Barangay San Roque" loading="lazy">',
);

/** Project 11 — Water Notice Video. A fresh document for captioned media. */
const VIDEO_TITLE_SLOT = slotPage("    @@SLOT@@\n", "@@SLOT@@");
const VIDEO_TITLE_BODY = "    <h2></h2>\n\n";
const VIDEO_HEADING_BODY = "    <h2>Water Service Notice</h2>\n\n";
const VIDEO_PLAYER_SLOT = slotPage(VIDEO_HEADING_BODY.replace("\n\n", "\n    @@SLOT@@\n"), "@@SLOT@@");
const VIDEO_PLAYER_BODY = "    <h2>Water Service Notice</h2>\n    <video>\n\n\n\n    </video>\n";
const VIDEO_SOURCE_BODY = VIDEO_PLAYER_BODY.replace("\n\n", '\n      <source src="water-notice.mp4" type="video/mp4">\n');
const VIDEO_CONTROLS_BODY = VIDEO_SOURCE_BODY.replace("<video>", "<video controls>");
const VIDEO_CAPTIONS_BODY = VIDEO_CONTROLS_BODY.replace("\n\n", '\n      <track kind="captions" src="water-notice-en.vtt" srclang="en" label="English captions">\n');
const VIDEO_DEFAULT_BODY = VIDEO_CAPTIONS_BODY.replace('label="English captions">', 'label="English captions" default>');

/** Project 12 — Barangay Radio Update. A fresh document for audio playback. */
const AUDIO_TITLE_SLOT = slotPage("    @@SLOT@@\n", "@@SLOT@@");
const AUDIO_TITLE_BODY = "    <h2></h2>\n\n";
const AUDIO_HEADING_BODY = "    <h2>Barangay Radio Update</h2>\n\n";
const AUDIO_PLAYER_SLOT = slotPage(AUDIO_HEADING_BODY.replace("\n\n", "\n    @@SLOT@@\n"), "@@SLOT@@");
const AUDIO_PLAYER_BODY = "    <h2>Barangay Radio Update</h2>\n    <audio>\n\n\n    </audio>\n\n";
const AUDIO_SOURCE_BODY = AUDIO_PLAYER_BODY.replace("\n\n", '\n      <source src="radio-update.mp3" type="audio/mpeg">\n');
const AUDIO_CONTROLS_BODY = AUDIO_SOURCE_BODY.replace("<audio>", "<audio controls>");
const AUDIO_PRELOAD_BODY = AUDIO_CONTROLS_BODY.replace("<audio controls>", '<audio controls preload="metadata">');
const AUDIO_TRANSCRIPT_BODY = AUDIO_PRELOAD_BODY.replace(
  "\n\n",
  "\n    <p>Water service returns at 1pm today.</p>\n",
);

/** Project 13 — Jeepney Stop Search. A fresh document for native suggestions. */
const SEARCH_TITLE_SLOT = slotPage("    @@SLOT@@\n", "@@SLOT@@");
const SEARCH_TITLE_BODY = "    <h2></h2>\n\n\n";
const SEARCH_HEADING_BODY = "    <h2>Jeepney Stop Search</h2>\n\n\n";
const SEARCH_LABEL_BODY =
  '    <h2>Jeepney Stop Search</h2>\n    <label for="stop">Choose a stop</label>\n\n';
const SEARCH_INPUT_BODY =
  '    <h2>Jeepney Stop Search</h2>\n    <label for="stop">Choose a stop</label>\n    <input id="stop">\n';
const SEARCH_LIST_BODY = SEARCH_INPUT_BODY.replace(
  '<input id="stop">',
  '<input id="stop" list="stops">',
);
const SEARCH_DATALIST_SLOT = slotPage(`${SEARCH_LIST_BODY}    @@SLOT@@\n`, "@@SLOT@@");
const SEARCH_DATALIST_BODY = `${SEARCH_LIST_BODY}    <datalist id="stops">



    </datalist>
`;
const SEARCH_FIRST_STOP_BODY = SEARCH_DATALIST_BODY.replace(
  "\n\n",
  '\n      <option value="Palengke">\n',
);
const SEARCH_SECOND_STOP_BODY = SEARCH_FIRST_STOP_BODY.replace(
  "\n\n",
  '\n      <option value="Terminal">\n',
);
const SEARCH_THIRD_STOP_BODY = SEARCH_SECOND_STOP_BODY.replace(
  "\n\n",
  '\n      <option value="City Hall">\n',
);

/** Project 14 — Barangay Help Contacts. A fresh document for useful links. */
const CONTACT_TITLE_SLOT = slotPage("    @@SLOT@@\n", "@@SLOT@@");
const CONTACT_TITLE_BODY = "    <h2></h2>\n\n";
const CONTACT_HEADING_BODY = "    <h2>Barangay Help Contacts</h2>\n\n";
const CONTACT_COPY_BODY = CONTACT_HEADING_BODY.replace(
  "\n\n",
  "\n    <p>Need help? Contact Barangay San Roque.</p>\n",
);
const CONTACT_PHONE_SLOT = slotPage(`${CONTACT_COPY_BODY}    @@SLOT@@\n`, "@@SLOT@@");
const CONTACT_PHONE_BODY = `${CONTACT_COPY_BODY}    <a href=""></a>\n\n`;
const CONTACT_PHONE_LINK_BODY = CONTACT_PHONE_BODY.replace('href=""', 'href="tel:117"');
const CONTACT_PHONE_TEXT_BODY = CONTACT_PHONE_LINK_BODY.replace(
  "></a>",
  ">Call 117</a>",
);
const CONTACT_EMAIL_SLOT = slotPage(`${CONTACT_PHONE_TEXT_BODY}    @@SLOT@@\n`, "@@SLOT@@");
const CONTACT_EMAIL_BODY = `${CONTACT_PHONE_TEXT_BODY}    <a href=""></a>\n`;
const CONTACT_EMAIL_LINK_BODY = CONTACT_EMAIL_BODY.replace(
  'href=""',
  'href="mailto:help@barangay.example"',
);
const CONTACT_EMAIL_TEXT_BODY = CONTACT_EMAIL_LINK_BODY.replace(
  "></a>",
  ">Email the barangay</a>",
);

/** Project 15 — Barangay Bulletin Download. A fresh document for saved files. */
const DOWNLOAD_TITLE_SLOT = slotPage("    @@SLOT@@\n", "@@SLOT@@");
const DOWNLOAD_TITLE_BODY = "    <h2></h2>\n\n\n";
const DOWNLOAD_HEADING_BODY = "    <h2>Barangay Bulletin</h2>\n\n\n";
const DOWNLOAD_COPY_BODY =
  "    <h2>Barangay Bulletin</h2>\n    <p>Read today's service updates.</p>\n\n";
const DOWNLOAD_LINK_SLOT = slotPage(`${DOWNLOAD_COPY_BODY}    @@SLOT@@\n`, "@@SLOT@@");
const DOWNLOAD_LINK_BODY = `${DOWNLOAD_COPY_BODY}    <a href=""></a>\n`;
const DOWNLOAD_HREF_BODY = DOWNLOAD_LINK_BODY.replace(
  'href=""',
  'href="barangay-bulletin.pdf"',
);
const DOWNLOAD_TEXT_BODY = DOWNLOAD_HREF_BODY.replace(
  "></a>",
  ">Download today's bulletin</a>",
);
const DOWNLOAD_ATTRIBUTE_BODY = DOWNLOAD_TEXT_BODY.replace(
  'href="barangay-bulletin.pdf"',
  'href="barangay-bulletin.pdf" download',
);

/** Project 16 — Barangay Safety Tip. A fresh document for supporting content. */
const TIP_TITLE_SLOT = slotPage("    @@SLOT@@\n", "@@SLOT@@");
const TIP_TITLE_BODY = "    <h2></h2>\n\n";
const TIP_HEADING_BODY = "    <h2>Barangay Safety Tip</h2>\n\n";
const TIP_ASIDE_SLOT = slotPage(TIP_HEADING_BODY.replace("\n\n", "\n    @@SLOT@@\n"), "@@SLOT@@");
const TIP_ASIDE_BODY = "    <h2>Barangay Safety Tip</h2>\n    <aside>\n\n\n\n    </aside>\n";
const TIP_COPY_BODY = TIP_ASIDE_BODY.replace("\n\n", "\n      <p>Keep your phone charged during heavy rain.</p>\n");
const TIP_URGENT_BODY = TIP_COPY_BODY.replace("heavy rain", "<mark>heavy rain</mark>");
const TIP_NOTE_BODY = TIP_URGENT_BODY.replace("\n\n", "\n      <small>Call 117 for urgent help.</small>\n");

/** Project 17 — Barangay Office Hours. A fresh document for readable schedules. */
const HOURS_TITLE_SLOT = slotPage("    @@SLOT@@\n", "@@SLOT@@");
const HOURS_TITLE_BODY = "    <h2></h2>\n\n\n";
const HOURS_HEADING_BODY = "    <h2>Barangay Office Hours</h2>\n\n\n";
const HOURS_COPY_BODY = "    <h2>Barangay Office Hours</h2>\n    <p>Office opens at 8am.</p>\n\n";
const HOURS_TIME_SLOT = slotPage(`${HOURS_COPY_BODY}    @@SLOT@@\n`, "@@SLOT@@");
const HOURS_TIME_BODY = `${HOURS_COPY_BODY}    <time></time>\n\n`;
const HOURS_TIME_TEXT_BODY = HOURS_TIME_BODY.replace(
  "></time>",
  ">Monday to Friday, 8am to 5pm</time>",
);
const HOURS_DATETIME_BODY = HOURS_TIME_TEXT_BODY.replace(
  "<time>",
  '<time datetime="08:00">',
);
const HOURS_NOTE_BODY = HOURS_DATETIME_BODY.replace(
  "\n\n",
  "\n    <small>Closed on public holidays.</small>\n",
);

/** Project 18 — Palengke Price Label. A fresh document for machine-readable values. */
const PRICE_TITLE_SLOT = slotPage("    @@SLOT@@\n", "@@SLOT@@");
const PRICE_TITLE_BODY = "    <h2></h2>\n\n\n";
const PRICE_HEADING_BODY = "    <h2>Palengke Price Label</h2>\n\n\n";
const PRICE_COPY_BODY = "    <h2>Palengke Price Label</h2>\n    <p>Rice price today:</p>\n\n";
const PRICE_DATA_SLOT = slotPage(`${PRICE_COPY_BODY}    @@SLOT@@\n`, "@@SLOT@@");
const PRICE_DATA_BODY = `${PRICE_COPY_BODY}    <data></data>\n\n`;
const PRICE_TEXT_BODY = PRICE_DATA_BODY.replace(
  "></data>",
  ">PHP 58</data>",
);
const PRICE_VALUE_BODY = PRICE_TEXT_BODY.replace("<data>", '<data value="58">');
const PRICE_NOTE_BODY = PRICE_VALUE_BODY.replace("\n\n", "\n    <small>Per kilo</small>\n");

/** Project 19 — Barangay Emergency Alert. A fresh document for a native dialog. */
const ALERT_DIALOG_SLOT = slotPage("    @@SLOT@@\n", "@@SLOT@@");
const ALERT_DIALOG_BODY = "    <dialog>\n\n    </dialog>\n\n";
const ALERT_HEADING_BODY = "    <dialog>\n      <h2></h2>\n\n    </dialog>\n\n";
const ALERT_HEADING_TEXT_BODY = ALERT_HEADING_BODY.replace(
  "><\/h2>",
  ">Flood Warning</h2>",
);
const ALERT_COPY_BODY = ALERT_HEADING_TEXT_BODY.replace(
  "\n\n    </dialog>",
  "\n      <p>Evacuate to Barangay Hall now.</p>\n    </dialog>",
);
const ALERT_OPEN_BODY = ALERT_COPY_BODY.replace("<dialog>", "<dialog open>");
const ALERT_NOTE_BODY = ALERT_OPEN_BODY.replace(
  "\n\n",
  "\n    <small>This alert is shown for this example.</small>\n",
);

/** Project 20 — Barangay Service Search. A fresh document for semantic search controls. */
const SERVICE_SEARCH_SLOT = slotPage("    @@SLOT@@\n", "@@SLOT@@");
const SERVICE_SEARCH_BODY = "    <search>\n\n    </search>\n\n";
const SERVICE_HEADING_BODY = "    <search>\n      <h2></h2>\n\n    </search>\n\n";
const SERVICE_HEADING_TEXT_BODY = SERVICE_HEADING_BODY.replace(
  "></h2>",
  ">Barangay Service Search</h2>",
);
const SERVICE_FORM_SLOT = slotPage(
  SERVICE_HEADING_TEXT_BODY.replace("\n\n    </search>", "\n    @@SLOT@@\n    </search>"),
  "@@SLOT@@",
);
const SERVICE_FORM_BODY = "    <search>\n      <h2>Barangay Service Search</h2>\n      <form>\n\n      </form>\n    </search>\n\n";
const SERVICE_LABEL_BODY = SERVICE_FORM_BODY.replace(
  "\n\n      </form>",
  "\n        <label for=\"service\">Find a service</label>\n      </form>",
);
const SERVICE_INPUT_BODY = SERVICE_LABEL_BODY.replace(
  "\n      </form>",
  "\n        <input type=\"search\" id=\"service\">\n      </form>",
);
const SERVICE_PLACEHOLDER_BODY = SERVICE_INPUT_BODY.replace(
  'id="service">',
  'id="service" placeholder="Health center">',
);
const SERVICE_NAME_BODY = SERVICE_PLACEHOLDER_BODY.replace(
  'id="service"',
  'id="service" name="service"',
);

/** Project 21 — Turo-Turo Meal Picker. A fresh document for grouped native choices. */
const MEAL_TITLE_SLOT = slotPage("    @@SLOT@@\n", "@@SLOT@@");
const MEAL_TITLE_BODY = "    <h2></h2>\n\n\n";
const MEAL_HEADING_BODY = "    <h2>Choose a Meal</h2>\n\n\n";
const MEAL_SELECT_SLOT = slotPage(`${MEAL_HEADING_BODY}    @@SLOT@@\n`, "@@SLOT@@");
const MEAL_SELECT_BODY = "    <h2>Choose a Meal</h2>\n    <select>\n\n    </select>\n\n";
const MEAL_GROUP_SLOT = slotPage(
  MEAL_SELECT_BODY.replace("\n\n    </select>", "\n      @@SLOT@@\n    </select>"),
  "@@SLOT@@",
);
const MEAL_GROUP_BODY = "    <h2>Choose a Meal</h2>\n    <select>\n      <optgroup>\n\n      </optgroup>\n    </select>\n\n";
const MEAL_GROUP_LABEL_BODY = MEAL_GROUP_BODY.replace(
  "<optgroup>",
  '<optgroup label="Main dishes">',
);
const MEAL_ADOBO_BODY = MEAL_GROUP_LABEL_BODY.replace(
  "\n\n      </optgroup>",
  "\n        <option>Adobo</option>\n      </optgroup>",
);
const MEAL_SINIGANG_BODY = MEAL_ADOBO_BODY.replace(
  "\n      </optgroup>",
  "\n        <option>Sinigang</option>\n      </optgroup>",
);

/** Project 22 — Palengke Price Board. A fresh document for an accessible table caption. */
const MARKET_TABLE_SLOT = slotPage("    @@SLOT@@\n", "@@SLOT@@");
const MARKET_TABLE_BODY = "    <table>\n\n    </table>\n\n";
const MARKET_CAPTION_SLOT = slotPage(
  MARKET_TABLE_BODY.replace("\n\n    </table>", "\n      @@SLOT@@\n    </table>"),
  "@@SLOT@@",
);
const MARKET_CAPTION_BODY = "    <table>\n      <caption></caption>\n\n    </table>\n\n";
const MARKET_CAPTION_TEXT_BODY = MARKET_CAPTION_BODY.replace(
  "></caption>",
  ">Palengke Prices</caption>",
);
const MARKET_ROW_SLOT = slotPage(
  MARKET_CAPTION_TEXT_BODY.replace("\n\n    </table>", "\n      @@SLOT@@\n    </table>"),
  "@@SLOT@@",
);
const MARKET_ROW_BODY = "    <table>\n      <caption>Palengke Prices</caption>\n      <tr>\n\n      </tr>\n    </table>\n\n";
const MARKET_ITEM_BODY = MARKET_ROW_BODY.replace(
  "\n\n      </tr>",
  "\n        <th>Tomatoes</th>\n      </tr>",
);
const MARKET_PRICE_BODY = MARKET_ITEM_BODY.replace(
  "\n      </tr>",
  "\n        <td>PHP 90</td>\n      </tr>",
);

/** Project 23 — Barangay Resident Contact. A fresh document for saved form details. */
const RESIDENT_TITLE_SLOT = slotPage("    @@SLOT@@\n", "@@SLOT@@");
const RESIDENT_TITLE_BODY = "    <h2></h2>\n\n\n";
const RESIDENT_HEADING_BODY = "    <h2>Resident Contact</h2>\n\n\n";
const RESIDENT_FORM_SLOT = slotPage(`${RESIDENT_HEADING_BODY}    @@SLOT@@\n`, "@@SLOT@@");
const RESIDENT_FORM_BODY = "    <h2>Resident Contact</h2>\n    <form>\n\n    </form>\n\n";
const RESIDENT_LABEL_BODY = RESIDENT_FORM_BODY.replace(
  "\n\n    </form>",
  "\n      <label for=\"resident-name\">Your name</label>\n    </form>",
);
const RESIDENT_INPUT_BODY = RESIDENT_LABEL_BODY.replace(
  "\n    </form>",
  "\n      <input type=\"text\" id=\"resident-name\">\n    </form>",
);
const RESIDENT_AUTOCOMPLETE_BODY = RESIDENT_INPUT_BODY.replace(
  'id="resident-name">',
  'id="resident-name" autocomplete="name">',
);
const RESIDENT_REQUIRED_BODY = RESIDENT_AUTOCOMPLETE_BODY.replace(
  'autocomplete="name">',
  'autocomplete="name" required>',
);

/** Project 24 — Barangay Document Request. A fresh document for a controlled file picker. */
const DOCUMENT_TITLE_SLOT = slotPage("    @@SLOT@@\n", "@@SLOT@@");
const DOCUMENT_TITLE_BODY = "    <h2></h2>\n\n\n";
const DOCUMENT_HEADING_BODY = "    <h2>Document Request</h2>\n\n\n";
const DOCUMENT_FORM_SLOT = slotPage(`${DOCUMENT_HEADING_BODY}    @@SLOT@@\n`, "@@SLOT@@");
const DOCUMENT_FORM_BODY = "    <h2>Document Request</h2>\n    <form>\n\n    </form>\n\n";
const DOCUMENT_LABEL_BODY = DOCUMENT_FORM_BODY.replace(
  "\n\n    </form>",
  "\n      <label for=\"proof\">Upload proof</label>\n    </form>",
);
const DOCUMENT_INPUT_BODY = DOCUMENT_LABEL_BODY.replace(
  "\n    </form>",
  "\n      <input type=\"file\" id=\"proof\">\n    </form>",
);
const DOCUMENT_ACCEPT_BODY = DOCUMENT_INPUT_BODY.replace(
  'id="proof">',
  'id="proof" accept=".pdf">',
);
const DOCUMENT_REQUIRED_BODY = DOCUMENT_ACCEPT_BODY.replace(
  'accept=".pdf">',
  'accept=".pdf" required>',
);

/** Project 25 — Barangay Story Source. A fresh page for naming a cited record. */
const SOURCE_TITLE_SLOT = slotPage("    @@SLOT@@\n", "@@SLOT@@");
const SOURCE_TITLE_BODY = "    <h2></h2>\n\n\n";
const SOURCE_HEADING_BODY = "    <h2>Barangay Story Source</h2>\n\n\n";
const SOURCE_COPY_BODY = "    <h2>Barangay Story Source</h2>\n    <p>Remember the flood history.</p>\n\n";
const SOURCE_CITE_SLOT = slotPage(`${SOURCE_COPY_BODY}    @@SLOT@@\n`, "@@SLOT@@");
const SOURCE_CITE_BODY = `${SOURCE_COPY_BODY}    <cite></cite>\n`;
const SOURCE_CITE_TEXT_BODY = `${SOURCE_COPY_BODY}    <cite>Barangay San Roque Records</cite>\n`;

/** Project 26 — Barangay Abbreviation Guide. A fresh page for a short form and its meaning. */
const ABBREVIATION_TITLE_SLOT = slotPage("    @@SLOT@@\n", "@@SLOT@@");
const ABBREVIATION_TITLE_BODY = "    <h2></h2>\n\n\n";
const ABBREVIATION_HEADING_BODY = "    <h2>Barangay Abbreviation Guide</h2>\n\n\n";
const ABBREVIATION_COPY_BODY = "    <h2>Barangay Abbreviation Guide</h2>\n    <p>Learn the short names used in local notices.</p>\n\n";
const ABBREVIATION_SLOT = slotPage(`${ABBREVIATION_COPY_BODY}    @@SLOT@@\n`, "@@SLOT@@");
const ABBREVIATION_BODY = `${ABBREVIATION_COPY_BODY}    <abbr></abbr>\n`;
const ABBREVIATION_TITLE_BODY_FULL = `${ABBREVIATION_COPY_BODY}    <abbr title="Barangay Health Worker">BHW</abbr>\n`;

/** Project 27 — Barangay Reminder Quote. A fresh page for a short quoted reminder. */
const REMINDER_TITLE_SLOT = slotPage("    @@SLOT@@\n", "@@SLOT@@");
const REMINDER_TITLE_BODY = "    <h2></h2>\n\n\n";
const REMINDER_HEADING_BODY = "    <h2>Barangay Reminder</h2>\n\n\n";
const REMINDER_QUOTE_SLOT = slotPage(`${REMINDER_HEADING_BODY}    @@SLOT@@\n`, "@@SLOT@@");
const REMINDER_QUOTE_BODY = `${REMINDER_HEADING_BODY}    <q></q>\n`;
const REMINDER_QUOTE_TEXT_BODY = `${REMINDER_HEADING_BODY}    <q>Bring your ID.</q>\n`;

function solvedSlot(slot: { page: string; slotLine: number }, block: string): Record<string, string> {
  const lines = slot.page.split("\n");
  const target = lines[slot.slotLine - 1] ?? "";
  const indent = target.match(/^\s*/)?.[0] ?? "";
  lines[slot.slotLine - 1] = indent + block;
  return { "index.html": lines.join("\n"), "styles.css": "" };
}

/** Authored proof for every step. Missing entries stop the course from loading. */
const HEALTH_CENTER_NOTICE_TITLE_SLOT = slotPage("    @@SLOT@@\n", "@@SLOT@@");
const HEALTH_CENTER_NOTICE_TITLE_BODY = `    <h2></h2>\n`;
const HEALTH_CENTER_NOTICE_HEADING_BODY = `    <h2>Important Notice</h2>\n`;
const HEALTH_CENTER_NOTICE_INTRO_BODY = `    <h2>Important Notice</h2>
    <p>Learn about important health tips for your barangay.</p>\n`;
const HEALTH_CENTER_NOTICE_ELEMENT_SLOT = slotPage(`${HEALTH_CENTER_NOTICE_INTRO_BODY}    @@SLOT@@\n`, "@@SLOT@@");
const HEALTH_CENTER_NOTICE_ELEMENT_BODY = `${HEALTH_CENTER_NOTICE_INTRO_BODY}    <i></i>\n`;

const JEEPNEY_ROUTE_TITLE_SLOT = slotPage("    @@SLOT@@\n", "@@SLOT@@");
const JEEPNEY_ROUTE_TITLE_BODY = `    <h2></h2>\n`;
const JEEPNEY_ROUTE_HEADING_BODY = `    <h2>Jeepney Route Notice</h2>\n`;
const JEEPNEY_ROUTE_INTRO_BODY = `    <h2>Jeepney Route Notice</h2>
    <p>Learn how to use the <kbd>element</kbd> in a real-life jeepney route notice.</p>\n`;
const JEEPNEY_ROUTE_ELEMENT_SLOT = slotPage(`${JEEPNEY_ROUTE_INTRO_BODY}    @@SLOT@@\n`, "@@SLOT@@");
const JEEPNEY_ROUTE_ELEMENT_BODY = `${JEEPNEY_ROUTE_INTRO_BODY}    <b></b>\n`;

const SARI_SARI_STORE_TITLE_SLOT = slotPage("    @@SLOT@@\n", "@@SLOT@@");
const SARI_SARI_STORE_TITLE_BODY = `    <h2></h2>\n`;
const SARI_SARI_STORE_HEADING_BODY = `    <h2>Sari-Sari Store Notice</h2>\n`;
const SARI_SARI_STORE_INTRO_BODY = `    <h2>Sari-Sari Store Notice</h2>
    <p>Read the notice at your barangay sari-sari store.</p>\n`;
const SARI_SARI_STORE_ELEMENT_SLOT = slotPage(`${SARI_SARI_STORE_INTRO_BODY}    @@SLOT@@\n`, "@@SLOT@@");
const SARI_SARI_STORE_ELEMENT_BODY = `${SARI_SARI_STORE_INTRO_BODY}    <sub></sub>\n`;

const STORE_PRICES_TITLE_SLOT = slotPage("    @@SLOT@@\n", "@@SLOT@@");
const STORE_PRICES_TITLE_BODY = `    <h2></h2>\n`;
const STORE_PRICES_HEADING_BODY = `    <h2>Sari-Sari Store Prices</h2>\n`;
const STORE_PRICES_INTRO_BODY = `    <h2>Sari-Sari Store Prices</h2>
    <p>Check out the prices of our products at the Sari-Sari store.</p>\n`;
const STORE_PRICES_ELEMENT_SLOT = slotPage(`${STORE_PRICES_INTRO_BODY}    @@SLOT@@\n`, "@@SLOT@@");
const STORE_PRICES_ELEMENT_BODY = `${STORE_PRICES_INTRO_BODY}    <em></em>\n`;

const WATER_BILL_TITLE_SLOT = slotPage("    @@SLOT@@\n", "@@SLOT@@");
const WATER_BILL_TITLE_BODY = `    <h2></h2>\n`;
const WATER_BILL_HEADING_BODY = `    <h2>Barangay Water Bill</h2>\n`;
const WATER_BILL_INTRO_BODY = `    <h2>Barangay Water Bill</h2>
    <p>Learn how to highlight text on a water bill for easier reading.</p>\n`;
const WATER_BILL_ELEMENT_SLOT = slotPage(`${WATER_BILL_INTRO_BODY}    @@SLOT@@\n`, "@@SLOT@@");
const WATER_BILL_ELEMENT_BODY = `${WATER_BILL_INTRO_BODY}    <span></span>\n`;

const STORE_RECEIPT_TITLE_SLOT = slotPage("    @@SLOT@@\n", "@@SLOT@@");
const STORE_RECEIPT_TITLE_BODY = `    <h2></h2>\n`;
const STORE_RECEIPT_HEADING_BODY = `    <h2>Sari-Sari Store Receipt</h2>\n`;
const STORE_RECEIPT_INTRO_BODY = `    <h2>Sari-Sari Store Receipt</h2>
    <p>See how pre keeps the spaces and line breaks in this laundry shop receipt.</p>\n`;
const STORE_RECEIPT_ELEMENT_SLOT = slotPage(`${STORE_RECEIPT_INTRO_BODY}    @@SLOT@@\n`, "@@SLOT@@");
const STORE_RECEIPT_ELEMENT_BODY = `${STORE_RECEIPT_INTRO_BODY}    <pre></pre>\n`;

const STOCK_LIST_TITLE_SLOT = slotPage("    @@SLOT@@\n", "@@SLOT@@");
const STOCK_LIST_TITLE_BODY = `    <h2></h2>\n`;
const STOCK_LIST_HEADING_BODY = `    <h2>Pharmacy Stock List</h2>\n`;
const STOCK_LIST_INTRO_BODY = `    <h2>Pharmacy Stock List</h2>
    <p>A list of water bills for the barangay.</p>\n`;
const STOCK_LIST_ELEMENT_SLOT = slotPage(`${STOCK_LIST_INTRO_BODY}    @@SLOT@@\n`, "@@SLOT@@");
const STOCK_LIST_ELEMENT_BODY = `${STOCK_LIST_INTRO_BODY}    <thead></thead>\n`;

const ID_APPLICATION_TITLE_SLOT = slotPage("    @@SLOT@@\n", "@@SLOT@@");
const ID_APPLICATION_TITLE_BODY = `    <h2></h2>\n`;
const ID_APPLICATION_HEADING_BODY = `    <h2>Barangay ID Application</h2>\n`;
const ID_APPLICATION_INTRO_BODY = `    <h2>Barangay ID Application</h2>
    <p>This notice shows the water bill details of each household.</p>\n`;
const ID_APPLICATION_ELEMENT_SLOT = slotPage(`${ID_APPLICATION_INTRO_BODY}    @@SLOT@@\n`, "@@SLOT@@");
const ID_APPLICATION_ELEMENT_BODY = `${ID_APPLICATION_INTRO_BODY}    <tbody></tbody>\n`;

const STORE_PRICE_TITLE_SLOT = slotPage("    @@SLOT@@\n", "@@SLOT@@");
const STORE_PRICE_TITLE_BODY = `    <h2></h2>\n`;
const STORE_PRICE_HEADING_BODY = `    <h2>Sari Sari Store Price</h2>\n`;
const STORE_PRICE_INTRO_BODY = `    <h2>Sari Sari Store Price</h2>
    <p>Learn how to group total rows on your water bill.</p>\n`;
const STORE_PRICE_ELEMENT_SLOT = slotPage(`${STORE_PRICE_INTRO_BODY}    @@SLOT@@\n`, "@@SLOT@@");
const STORE_PRICE_ELEMENT_BODY = `${STORE_PRICE_INTRO_BODY}    <tfoot></tfoot>\n`;

const HEALTH_CENTRE_TITLE_SLOT = slotPage("    @@SLOT@@\n", "@@SLOT@@");
const HEALTH_CENTRE_TITLE_BODY = `    <h2></h2>\n`;
const HEALTH_CENTRE_HEADING_BODY = `    <h2>Barangay Health Centre</h2>\n`;
const HEALTH_CENTRE_INTRO_BODY = `    <h2>Barangay Health Centre</h2>
    <p>Learn how to mark words that need attention in the health center notice.</p>\n`;
const HEALTH_CENTRE_ELEMENT_SLOT = slotPage(`${HEALTH_CENTRE_INTRO_BODY}    @@SLOT@@\n`, "@@SLOT@@");
const HEALTH_CENTRE_ELEMENT_BODY = `${HEALTH_CENTRE_INTRO_BODY}    <u></u>\n`;

const ROUTE_BOARD_TITLE_SLOT = slotPage("    @@SLOT@@\n", "@@SLOT@@");
const ROUTE_BOARD_TITLE_BODY = `    <h2></h2>\n`;
const ROUTE_BOARD_HEADING_BODY = `    <h2>Jeepney Route Board</h2>\n`;
const ROUTE_BOARD_INTRO_BODY = `    <h2>Jeepney Route Board</h2>
    <p>See how the sup element shows the meter reading on a water bill.</p>\n`;
const ROUTE_BOARD_ELEMENT_SLOT = slotPage(`${ROUTE_BOARD_INTRO_BODY}    @@SLOT@@\n`, "@@SLOT@@");
const ROUTE_BOARD_ELEMENT_BODY = `${ROUTE_BOARD_INTRO_BODY}    <sup></sup>\n`;

const FISH_STALL_TITLE_SLOT = slotPage("    @@SLOT@@\n", "@@SLOT@@");
const FISH_STALL_TITLE_BODY = `    <h2></h2>\n`;
const FISH_STALL_HEADING_BODY = `    <h2>Palengke Fish Stall</h2>\n`;
const FISH_STALL_INTRO_BODY = `    <h2>Palengke Fish Stall</h2>
    <p>Learn how to mark fish names at the market.</p>\n`;
const FISH_STALL_ELEMENT_SLOT = slotPage(`${FISH_STALL_INTRO_BODY}    @@SLOT@@\n`, "@@SLOT@@");
const FISH_STALL_ELEMENT_BODY = `${FISH_STALL_INTRO_BODY}    <dfn></dfn>\n`;

const TURO_MENU_TITLE_SLOT = slotPage("    @@SLOT@@\n", "@@SLOT@@");
const TURO_MENU_TITLE_BODY = `    <h2></h2>\n`;
const TURO_MENU_HEADING_BODY = `    <h2>Turo Turo Menu</h2>\n`;
const TURO_MENU_INTRO_BODY = `    <h2>Turo Turo Menu</h2>
    <p>A list of buttons for paying water bills.</p>\n`;
const TURO_MENU_ELEMENT_SLOT = slotPage(`${TURO_MENU_INTRO_BODY}    @@SLOT@@\n`, "@@SLOT@@");
const TURO_MENU_ELEMENT_BODY = `${TURO_MENU_INTRO_BODY}    <menu></menu>\n`;

const BASKETBALL_LEAGUE_TITLE_SLOT = slotPage("    @@SLOT@@\n", "@@SLOT@@");
const BASKETBALL_LEAGUE_TITLE_BODY = `    <h2></h2>\n`;
const BASKETBALL_LEAGUE_HEADING_BODY = `    <h2>Barangay Basketball League</h2>\n`;
const BASKETBALL_LEAGUE_INTRO_BODY = `    <h2>Barangay Basketball League</h2>
    <p>See how the bdi tag keeps names from mixing up.</p>\n`;
const BASKETBALL_LEAGUE_ELEMENT_SLOT = slotPage(`${BASKETBALL_LEAGUE_INTRO_BODY}    @@SLOT@@\n`, "@@SLOT@@");
const BASKETBALL_LEAGUE_ELEMENT_BODY = `${BASKETBALL_LEAGUE_INTRO_BODY}    <bdi></bdi>\n`;

/* composition: notice-card */
const SUPPLY_LIST_ROOT_SLOT = slotPage("    @@SLOT@@\n", "@@SLOT@@");
const SUPPLY_LIST_B1 = `    <section></section>\n`;
const SUPPLY_LIST_B2 = `    <section>\n      <h2>Backpack Alert</h2>\n    </section>\n`;
const SUPPLY_LIST_B3 = `    <section>\n      <h2>Backpack Alert</h2>\n      <p>Organize your stuff for success!</p>\n    </section>\n`;

const references = {
  "h1-block": { estimatedMinutes: 3, solution: solved("    <h1></h1>\n") },
  "h1-text": {
    estimatedMinutes: 4,
    solution: solved("    <h1>Aling Nena's Store</h1>\n"),
  },
  "p-block": {
    estimatedMinutes: 3,
    solution: solved("    <h1>Aling Nena's Store</h1>\n    <p></p>\n"),
  },
  "p-text": {
    estimatedMinutes: 4,
    solution: solved(
      "    <h1>Aling Nena's Store</h1>\n    <p>Open every day from 6am to 10pm.</p>\n",
    ),
  },
  "h2-section": {
    estimatedMinutes: 5,
    solution: solved(
      "    <h1>Aling Nena's Store</h1>\n    <p>Open every day from 6am to 10pm.</p>\n    <h2>What We Sell</h2>\n",
    ),
  },
  "ul-block": {
    estimatedMinutes: 3,
    solution: solved(
      "    <h1>Aling Nena's Store</h1>\n    <p>Open every day from 6am to 10pm.</p>\n    <h2>What We Sell</h2>\n    <ul></ul>\n",
    ),
  },
  "li-items": {
    estimatedMinutes: 6,
    solution: solved(
      "    <h1>Aling Nena's Store</h1>\n    <p>Open every day from 6am to 10pm.</p>\n    <h2>What We Sell</h2>\n    <ul>\n      <li>Rice</li>\n      <li>Eggs</li>\n      <li>Coffee</li>\n    </ul>\n",
    ),
  },
  "img-block": {
    estimatedMinutes: 3,
    solution: solved(
      "    <h1>Aling Nena's Store</h1>\n    <h2>What We Sell</h2>\n    <ul>\n      <li>Rice</li>\n      <li>Eggs</li>\n      <li>Coffee</li>\n    </ul>\n    <img src=\"store.png\">\n",
    ),
  },
  "img-alt": {
    estimatedMinutes: 5,
    solution: solved(
      "    <h1>Aling Nena's Store</h1>\n    <h2>What We Sell</h2>\n    <ul>\n      <li>Rice</li>\n      <li>Eggs</li>\n      <li>Coffee</li>\n    </ul>\n    <img src=\"store.png\" alt=\"Aling Nena's store front\">\n",
    ),
  },
  anchor: {
    estimatedMinutes: 6,
    solution: solved(
      "    <h1>Aling Nena's Store</h1>\n    <ul>\n      <li>Rice</li>\n      <li>Eggs</li>\n      <li>Coffee</li>\n    </ul>\n    <img src=\"store.png\" alt=\"Store front\">\n    <a href=\"https://example.com\">Find us</a>\n",
    ),
  },
  sectioning: {
    estimatedMinutes: 6,
    solution: solved(
      "    <header>\n      <h1>Aling Nena's Store</h1>\n    </header>\n    <ul>\n      <li>Rice</li>\n      <li>Eggs</li>\n    </ul>\n",
    ),
  },
  "form-input": {
    estimatedMinutes: 6,
    solution: solved(
      "    <header>\n      <h1>Aling Nena's Store</h1>\n    </header>\n    <h2>Order</h2>\n    <form>\n      <input type=\"text\">\n    </form>\n",
    ),
  },
  label: {
    estimatedMinutes: 5,
    solution: solved(
      "    <h2>Order</h2>\n    <form>\n      <label for=\"item\">What do you need?</label>\n      <input type=\"text\" id=\"item\">\n    </form>\n",
    ),
  },
  button: {
    estimatedMinutes: 4,
    solution: solved(
      "    <form>\n      <label for=\"item\">What do you need?</label>\n      <input type=\"text\" id=\"item\">\n      <button>Send Order</button>\n    </form>\n",
    ),
  },
  footer: {
    estimatedMinutes: 4,
    solution: solved(ORDER_FOOTER_BODY),
  },
  "main-region": {
    estimatedMinutes: 6,
    solution: solved(MAIN_BODY),
  },
  "required-input": {
    estimatedMinutes: 5,
    solution: solved(REQUIRED_BODY),
  },
  "input-name": {
    estimatedMinutes: 5,
    solution: solved(NAMED_INPUT_BODY),
  },
  "submit-type": {
    estimatedMinutes: 4,
    solution: solved(SUBMIT_TYPE_BODY),
  },
  fieldset: {
    estimatedMinutes: 7,
    solution: solved(FIELDSET_BODY),
  },
  legend: {
    estimatedMinutes: 5,
    solution: solved(LEGEND_BODY),
  },
  "quantity-field": {
    estimatedMinutes: 6,
    solution: solved(QUANTITY_BODY),
  },
  "quantity-number": {
    estimatedMinutes: 5,
    solution: solved(NUMBER_BODY),
  },
  "quantity-minimum": {
    estimatedMinutes: 5,
    solution: solved(MINIMUM_BODY),
  },
  "pickup-select": {
    estimatedMinutes: 6,
    solution: solved(PICKUP_SELECT_BODY),
  },
  "pickup-options": {
    estimatedMinutes: 6,
    solution: solved(PICKUP_OPTIONS_BODY),
  },
  "order-notes": {
    estimatedMinutes: 6,
    solution: solved(ORDER_NOTES_BODY),
  },
  "checkbox-terms": {
    estimatedMinutes: 4,
    solution: solved(CHECKBOX_BODY),
  },
  "radio-cash": {
    estimatedMinutes: 4,
    solution: solved(RADIO_CASH_BODY),
  },
  "radio-gcash": {
    estimatedMinutes: 3,
    solution: solved(RADIO_GCASH_BODY),
  },
  "placeholder-hint": {
    estimatedMinutes: 4,
    solution: solved(PLACEHOLDER_BODY),
  },
  "small-note": {
    estimatedMinutes: 3,
    solution: solved(SMALL_NOTE_BODY),
  },
  "strong-emphasis": {
    estimatedMinutes: 3,
    solution: solved(STRONG_EMPHASIS_BODY),
  },
  "table-skeleton": {
    estimatedMinutes: 3,
    // Single line: this is what tapping one block actually produces. The
    // next step's `files` uses the pretty two-line TABLE_SKELETON_BODY
    // instead — goNext always loads the next step's authored `files`, never
    // carries the learner's literal code forward, so the two need not match.
    solution: solved("    <table></table>\n"),
  },
  "table-header": {
    estimatedMinutes: 4,
    solution: solved(TABLE_HEADER_BODY),
  },
  "table-row": {
    estimatedMinutes: 4,
    solution: solved(TABLE_ROW_BODY),
  },
  "ordered-list": {
    estimatedMinutes: 4,
    solution: solved(ORDERED_LIST_BODY),
  },
  blockquote: {
    estimatedMinutes: 3,
    solution: solved(BLOCKQUOTE_BODY),
  },
  "figure-caption": {
    estimatedMinutes: 5,
    solution: solved(FIGURE_BODY),
  },
  "address-block": {
    estimatedMinutes: 3,
    solution: solved(ADDRESS_BODY),
  },
  "article-shell": {
    estimatedMinutes: 3,
    solution: solved("    <article></article>\n"),
  },
  "notice-title": {
    estimatedMinutes: 3,
    solution: solved(NOTICE_TITLE_BODY),
  },
  "notice-copy": {
    estimatedMinutes: 4,
    solution: solved(NOTICE_COPY_BODY),
  },
  "notice-time": {
    estimatedMinutes: 4,
    solution: solved(NOTICE_TIME_BODY),
  },
  "notice-datetime": {
    estimatedMinutes: 5,
    solution: solved(NOTICE_DATETIME_BODY),
  },
  "notice-contact": {
    estimatedMinutes: 3,
    solution: solved(NOTICE_CONTACT_BODY),
  },
  "route-nav": {
    estimatedMinutes: 3,
    solution: solved("    <nav></nav>\n"),
  },
  "route-title": {
    estimatedMinutes: 3,
    solution: solved(ROUTE_TITLE_BODY),
  },
  "route-list": {
    estimatedMinutes: 4,
    solution: solved(ROUTE_LIST_BODY),
  },
  "route-link": {
    estimatedMinutes: 4,
    solution: solved(ROUTE_LINK_BODY),
  },
  "route-stop": {
    estimatedMinutes: 4,
    solution: solved(ROUTE_STOP_BODY),
  },
  "route-copy": {
    estimatedMinutes: 3,
    solution: solved(ROUTE_COPY_BODY),
  },
  "menu-details": {
    estimatedMinutes: 3,
    solution: solved("    <details></details>\n"),
  },
  "menu-summary": {
    estimatedMinutes: 3,
    solution: solved(MENU_SUMMARY_BODY),
  },
  "menu-item": {
    estimatedMinutes: 3,
    solution: solved(MENU_ITEM_BODY),
  },
  "menu-price": {
    estimatedMinutes: 3,
    solution: solved(MENU_PRICE_BODY),
  },
  "menu-open": {
    estimatedMinutes: 4,
    solution: solved(MENU_OPEN_BODY),
  },
  "menu-note": {
    estimatedMinutes: 3,
    solution: solved(MENU_NOTE_BODY),
  },
  "recipe-list": {
    estimatedMinutes: 3,
    solution: solved("    <dl></dl>\n"),
  },
  "recipe-time-term": {
    estimatedMinutes: 3,
    solution: solved(RECIPE_TIME_TERM_BODY),
  },
  "recipe-time-value": {
    estimatedMinutes: 3,
    solution: solved(RECIPE_TIME_VALUE_BODY),
  },
  "recipe-servings-term": {
    estimatedMinutes: 3,
    solution: solved(RECIPE_SERVINGS_TERM_BODY),
  },
  "recipe-servings-value": {
    estimatedMinutes: 3,
    solution: solved(RECIPE_SERVINGS_VALUE_BODY),
  },
  "recipe-note": {
    estimatedMinutes: 3,
    solution: solved(RECIPE_NOTE_BODY),
  },
  "clinic-paragraph": {
    estimatedMinutes: 3,
    solution: solved("    <p></p>\n"),
  },
  "clinic-message": {
    estimatedMinutes: 3,
    solution: solved(CLINIC_MESSAGE_BODY),
  },
  "clinic-abbreviation": {
    estimatedMinutes: 3,
    solution: solved(CLINIC_ABBREVIATION_BODY),
  },
  "clinic-title": {
    estimatedMinutes: 3,
    solution: solved(CLINIC_TITLE_BODY),
  },
  "clinic-free": {
    estimatedMinutes: 3,
    solution: solved(CLINIC_FREE_BODY),
  },
  "clinic-cancelled": {
    estimatedMinutes: 3,
    solution: solved(CLINIC_CANCELLED_BODY),
  },
  "clinic-corrected": {
    estimatedMinutes: 3,
    solution: solved(CLINIC_CORRECTED_BODY),
  },
  "computer-paragraph": {
    estimatedMinutes: 3,
    solution: solved("    <p></p>\n"),
  },
  "computer-message": {
    estimatedMinutes: 3,
    solution: solved(COMPUTER_MESSAGE_BODY),
  },
  "computer-key": {
    estimatedMinutes: 3,
    solution: solved(COMPUTER_KEY_BODY),
  },
  "computer-code": {
    estimatedMinutes: 3,
    solution: solved(COMPUTER_CODE_BODY),
  },
  "computer-status": {
    estimatedMinutes: 3,
    solution: solved(COMPUTER_STATUS_BODY),
  },
  "relief-progress": {
    estimatedMinutes: 3,
    solution: solved("    <label>Relief packs: <progress></progress></label>\n"),
  },
  "relief-packs": {
    estimatedMinutes: 3,
    solution: solved(RELIEF_PACKS_BODY),
  },
  "relief-progress-value": {
    estimatedMinutes: 3,
    solution: solved(RELIEF_PROGRESS_VALUE_BODY),
  },
  "relief-progress-max": {
    estimatedMinutes: 3,
    solution: solved(RELIEF_PROGRESS_MAX_BODY),
  },
  "relief-meter": {
    estimatedMinutes: 3,
    solution: solved(RELIEF_METER_BODY),
  },
  "relief-meter-value": {
    estimatedMinutes: 3,
    solution: solved(RELIEF_METER_VALUE_BODY),
  },
  "relief-meter-max": {
    estimatedMinutes: 3,
    solution: solved(RELIEF_METER_MAX_BODY),
  },
  "weather-picture": { estimatedMinutes: 3, solution: solved("    <picture></picture>\n") },
  "weather-source": { estimatedMinutes: 3, solution: solved(WEATHER_SOURCE_BODY) },
  "weather-media": { estimatedMinutes: 3, solution: solved(WEATHER_MEDIA_BODY) },
  "weather-image": { estimatedMinutes: 3, solution: solved(WEATHER_IMAGE_BODY) },
  "weather-lazy": { estimatedMinutes: 3, solution: solved(WEATHER_LAZY_BODY) },
  "video-title": { estimatedMinutes: 3, solution: solved("    <h2></h2>\n") },
  "video-heading": { estimatedMinutes: 3, solution: solved(VIDEO_HEADING_BODY) },
  "video-player": { estimatedMinutes: 3, solution: solved("    <h2>Water Service Notice</h2>\n    <video></video>\n") },
  "video-source": { estimatedMinutes: 3, solution: solved(VIDEO_SOURCE_BODY) },
  "video-controls": { estimatedMinutes: 3, solution: solved(VIDEO_CONTROLS_BODY) },
  "video-captions": { estimatedMinutes: 3, solution: solved(VIDEO_CAPTIONS_BODY) },
  "video-default-captions": { estimatedMinutes: 3, solution: solved(VIDEO_DEFAULT_BODY) },
  "audio-title": { estimatedMinutes: 3, solution: solved("    <h2></h2>\n") },
  "audio-heading": { estimatedMinutes: 3, solution: solved(AUDIO_HEADING_BODY) },
  "audio-player": { estimatedMinutes: 3, solution: solved("    <h2>Barangay Radio Update</h2>\n    <audio></audio>\n") },
  "audio-source": { estimatedMinutes: 3, solution: solved(AUDIO_SOURCE_BODY) },
  "audio-controls": { estimatedMinutes: 3, solution: solved(AUDIO_CONTROLS_BODY) },
  "audio-preload": { estimatedMinutes: 3, solution: solved(AUDIO_PRELOAD_BODY) },
  "audio-transcript": { estimatedMinutes: 3, solution: solved(AUDIO_TRANSCRIPT_BODY) },
  "search-title": { estimatedMinutes: 3, solution: solved("    <h2></h2>\n") },
  "search-heading": { estimatedMinutes: 3, solution: solved(SEARCH_HEADING_BODY) },
  "search-label": { estimatedMinutes: 3, solution: solved(SEARCH_LABEL_BODY) },
  "search-input": { estimatedMinutes: 3, solution: solved(SEARCH_INPUT_BODY) },
  "search-list": { estimatedMinutes: 3, solution: solved(SEARCH_LIST_BODY) },
  "search-datalist": { estimatedMinutes: 3, solution: solved(`${SEARCH_LIST_BODY}    <datalist id="stops"></datalist>\n`) },
  "search-palengke": { estimatedMinutes: 3, solution: solved(SEARCH_FIRST_STOP_BODY) },
  "search-terminal": { estimatedMinutes: 3, solution: solved(SEARCH_SECOND_STOP_BODY) },
  "search-city-hall": { estimatedMinutes: 3, solution: solved(SEARCH_THIRD_STOP_BODY) },
  "contact-title": { estimatedMinutes: 3, solution: solved("    <h2></h2>\n") },
  "contact-heading": { estimatedMinutes: 3, solution: solved(CONTACT_HEADING_BODY) },
  "contact-copy": { estimatedMinutes: 3, solution: solved(CONTACT_COPY_BODY) },
  "contact-phone": { estimatedMinutes: 3, solution: solved(`${CONTACT_COPY_BODY}    <a></a>\n`) },
  "contact-phone-link": { estimatedMinutes: 3, solution: solved(CONTACT_PHONE_LINK_BODY) },
  "contact-phone-text": { estimatedMinutes: 3, solution: solved(CONTACT_PHONE_TEXT_BODY) },
  "contact-email": { estimatedMinutes: 3, solution: solved(`${CONTACT_PHONE_TEXT_BODY}    <a></a>\n`) },
  "contact-email-link": { estimatedMinutes: 3, solution: solved(CONTACT_EMAIL_LINK_BODY) },
  "contact-email-text": { estimatedMinutes: 3, solution: solved(CONTACT_EMAIL_TEXT_BODY) },
  "download-title": { estimatedMinutes: 3, solution: solved("    <h2></h2>\n") },
  "download-heading": { estimatedMinutes: 3, solution: solved(DOWNLOAD_HEADING_BODY) },
  "download-copy": { estimatedMinutes: 3, solution: solved(DOWNLOAD_COPY_BODY) },
  "download-link": { estimatedMinutes: 3, solution: solved(`${DOWNLOAD_COPY_BODY}    <a></a>\n`) },
  "download-href": { estimatedMinutes: 3, solution: solved(DOWNLOAD_HREF_BODY) },
  "download-text": { estimatedMinutes: 3, solution: solved(DOWNLOAD_TEXT_BODY) },
  "download-attribute": { estimatedMinutes: 3, solution: solved(DOWNLOAD_ATTRIBUTE_BODY) },
  "tip-title": { estimatedMinutes: 3, solution: solved("    <h2></h2>\n") },
  "tip-heading": { estimatedMinutes: 3, solution: solved(TIP_HEADING_BODY) },
  "tip-aside": { estimatedMinutes: 3, solution: solved("    <h2>Barangay Safety Tip</h2>\n    <aside></aside>\n") },
  "tip-copy": { estimatedMinutes: 3, solution: solved(TIP_COPY_BODY) },
  "tip-urgent": { estimatedMinutes: 3, solution: solved(TIP_URGENT_BODY) },
  "tip-note": { estimatedMinutes: 3, solution: solved(TIP_NOTE_BODY) },
  "hours-title": { estimatedMinutes: 3, solution: solved("    <h2></h2>\n") },
  "hours-heading": { estimatedMinutes: 3, solution: solved(HOURS_HEADING_BODY) },
  "hours-copy": { estimatedMinutes: 3, solution: solved(HOURS_COPY_BODY) },
  "hours-time": { estimatedMinutes: 3, solution: solved(`${HOURS_COPY_BODY}    <time></time>\n`) },
  "hours-time-text": { estimatedMinutes: 3, solution: solved(HOURS_TIME_TEXT_BODY) },
  "hours-datetime": { estimatedMinutes: 3, solution: solved(HOURS_DATETIME_BODY) },
  "hours-note": { estimatedMinutes: 3, solution: solved(HOURS_NOTE_BODY) },
  "price-title": { estimatedMinutes: 3, solution: solved("    <h2></h2>\n") },
  "price-heading": { estimatedMinutes: 3, solution: solved(PRICE_HEADING_BODY) },
  "price-copy": { estimatedMinutes: 3, solution: solved(PRICE_COPY_BODY) },
  "price-data": { estimatedMinutes: 3, solution: solved(`${PRICE_COPY_BODY}    <data></data>\n`) },
  "price-text": { estimatedMinutes: 3, solution: solved(PRICE_TEXT_BODY) },
  "price-value": { estimatedMinutes: 3, solution: solved(PRICE_VALUE_BODY) },
  "price-note": { estimatedMinutes: 3, solution: solved(PRICE_NOTE_BODY) },
  "alert-dialog": { estimatedMinutes: 3, solution: solved("    <dialog></dialog>\n") },
  "alert-heading": { estimatedMinutes: 3, solution: solved(ALERT_HEADING_BODY) },
  "alert-heading-text": { estimatedMinutes: 3, solution: solved(ALERT_HEADING_TEXT_BODY) },
  "alert-copy": { estimatedMinutes: 3, solution: solved(ALERT_COPY_BODY) },
  "alert-open": { estimatedMinutes: 3, solution: solved(ALERT_OPEN_BODY) },
  "alert-note": { estimatedMinutes: 3, solution: solved(ALERT_NOTE_BODY) },
  "service-search": { estimatedMinutes: 3, solution: solved("    <search></search>\n") },
  "service-heading": { estimatedMinutes: 3, solution: solved(SERVICE_HEADING_BODY) },
  "service-heading-text": { estimatedMinutes: 3, solution: solved(SERVICE_HEADING_TEXT_BODY) },
  "service-form": { estimatedMinutes: 3, solution: solvedSlot(SERVICE_FORM_SLOT, "<form></form>") },
  "service-label": { estimatedMinutes: 3, solution: solved(SERVICE_LABEL_BODY) },
  "service-input": { estimatedMinutes: 3, solution: solved(SERVICE_INPUT_BODY) },
  "service-placeholder": { estimatedMinutes: 3, solution: solved(SERVICE_PLACEHOLDER_BODY) },
  "service-name": { estimatedMinutes: 3, solution: solved(SERVICE_NAME_BODY) },
  "meal-title": { estimatedMinutes: 3, solution: solved("    <h2></h2>\n") },
  "meal-heading": { estimatedMinutes: 3, solution: solved(MEAL_HEADING_BODY) },
  "meal-select": { estimatedMinutes: 3, solution: solvedSlot(MEAL_SELECT_SLOT, "<select></select>") },
  "meal-group": { estimatedMinutes: 3, solution: solvedSlot(MEAL_GROUP_SLOT, "<optgroup></optgroup>") },
  "meal-group-label": { estimatedMinutes: 3, solution: solved(MEAL_GROUP_LABEL_BODY) },
  "meal-adobo": { estimatedMinutes: 3, solution: solved(MEAL_ADOBO_BODY) },
  "meal-sinigang": { estimatedMinutes: 3, solution: solved(MEAL_SINIGANG_BODY) },
  "market-table": { estimatedMinutes: 3, solution: solved("    <table></table>\n") },
  "market-caption": { estimatedMinutes: 3, solution: solvedSlot(MARKET_CAPTION_SLOT, "<caption></caption>") },
  "market-caption-text": { estimatedMinutes: 3, solution: solved(MARKET_CAPTION_TEXT_BODY) },
  "market-row": { estimatedMinutes: 3, solution: solvedSlot(MARKET_ROW_SLOT, "<tr></tr>") },
  "market-item": { estimatedMinutes: 3, solution: solved(MARKET_ITEM_BODY) },
  "market-price": { estimatedMinutes: 3, solution: solved(MARKET_PRICE_BODY) },
  "resident-title": { estimatedMinutes: 3, solution: solved("    <h2></h2>\n") },
  "resident-heading": { estimatedMinutes: 3, solution: solved(RESIDENT_HEADING_BODY) },
  "resident-form": { estimatedMinutes: 3, solution: solvedSlot(RESIDENT_FORM_SLOT, "<form></form>") },
  "resident-label": { estimatedMinutes: 3, solution: solved(RESIDENT_LABEL_BODY) },
  "resident-input": { estimatedMinutes: 3, solution: solved(RESIDENT_INPUT_BODY) },
  "resident-autocomplete": { estimatedMinutes: 3, solution: solved(RESIDENT_AUTOCOMPLETE_BODY) },
  "resident-required": { estimatedMinutes: 3, solution: solved(RESIDENT_REQUIRED_BODY) },
  "document-title": { estimatedMinutes: 3, solution: solved("    <h2></h2>\n") },
  "document-heading": { estimatedMinutes: 3, solution: solved(DOCUMENT_HEADING_BODY) },
  "document-form": { estimatedMinutes: 3, solution: solvedSlot(DOCUMENT_FORM_SLOT, "<form></form>") },
  "document-label": { estimatedMinutes: 3, solution: solved(DOCUMENT_LABEL_BODY) },
  "document-input": { estimatedMinutes: 3, solution: solved(DOCUMENT_INPUT_BODY) },
  "document-accept": { estimatedMinutes: 3, solution: solved(DOCUMENT_ACCEPT_BODY) },
  "document-required": { estimatedMinutes: 3, solution: solved(DOCUMENT_REQUIRED_BODY) },
  "source-title": { estimatedMinutes: 3, solution: solvedSlot(SOURCE_TITLE_SLOT, "<h2></h2>") },
  "source-heading": { estimatedMinutes: 3, solution: solved(SOURCE_HEADING_BODY) },
  "source-copy": { estimatedMinutes: 3, solution: solved(SOURCE_COPY_BODY) },
  "source-cite": { estimatedMinutes: 3, solution: solvedSlot(SOURCE_CITE_SLOT, "<cite></cite>") },
  "source-cite-text": { estimatedMinutes: 3, solution: solved(SOURCE_CITE_TEXT_BODY) },
  "abbreviation-title": { estimatedMinutes: 3, solution: solvedSlot(ABBREVIATION_TITLE_SLOT, "<h2></h2>") },
  "abbreviation-heading": { estimatedMinutes: 3, solution: solved(ABBREVIATION_HEADING_BODY) },
  "abbreviation-copy": { estimatedMinutes: 3, solution: solved(ABBREVIATION_COPY_BODY) },
  "abbreviation-mark": { estimatedMinutes: 3, solution: solvedSlot(ABBREVIATION_SLOT, "<abbr></abbr>") },
  "abbreviation-title-attribute": { estimatedMinutes: 3, solution: solved(ABBREVIATION_TITLE_BODY_FULL) },
  "reminder-title": { estimatedMinutes: 3, solution: solvedSlot(REMINDER_TITLE_SLOT, "<h2></h2>") },
  "reminder-heading": { estimatedMinutes: 3, solution: solved(REMINDER_HEADING_BODY) },
  "reminder-quote": { estimatedMinutes: 3, solution: solvedSlot(REMINDER_QUOTE_SLOT, "<q></q>") },
  "reminder-quote-text": { estimatedMinutes: 3, solution: solved(REMINDER_QUOTE_TEXT_BODY) },
  "reminder-quote-source": { estimatedMinutes: 3, solution: solved(`${REMINDER_QUOTE_TEXT_BODY}    <cite>Barangay Hall Notice</cite>\n`) },
  "health-center-notice-title": { estimatedMinutes: 4, solution: solvedSlot(HEALTH_CENTER_NOTICE_TITLE_SLOT, "<h2></h2>") },
  "health-center-notice-heading": { estimatedMinutes: 4, solution: solved(HEALTH_CENTER_NOTICE_HEADING_BODY) },
  "health-center-notice-copy": { estimatedMinutes: 4, solution: solved(HEALTH_CENTER_NOTICE_INTRO_BODY) },
  "health-center-notice-i": { estimatedMinutes: 5, solution: solvedSlot(HEALTH_CENTER_NOTICE_ELEMENT_SLOT, "<i></i>") },
  "health-center-notice-i-text": { estimatedMinutes: 4, solution: solved(`${HEALTH_CENTER_NOTICE_INTRO_BODY}    <i>important</i>\n`) },
  "jeepney-route-title": { estimatedMinutes: 4, solution: solvedSlot(JEEPNEY_ROUTE_TITLE_SLOT, "<h2></h2>") },
  "jeepney-route-heading": { estimatedMinutes: 4, solution: solved(JEEPNEY_ROUTE_HEADING_BODY) },
  "jeepney-route-copy": { estimatedMinutes: 4, solution: solved(JEEPNEY_ROUTE_INTRO_BODY) },
  "jeepney-route-b": { estimatedMinutes: 5, solution: solvedSlot(JEEPNEY_ROUTE_ELEMENT_SLOT, "<b></b>") },
  "jeepney-route-b-text": { estimatedMinutes: 4, solution: solved(`${JEEPNEY_ROUTE_INTRO_BODY}    <b>Important words</b>\n`) },
  "sari-sari-store-title": { estimatedMinutes: 4, solution: solvedSlot(SARI_SARI_STORE_TITLE_SLOT, "<h2></h2>") },
  "sari-sari-store-heading": { estimatedMinutes: 4, solution: solved(SARI_SARI_STORE_HEADING_BODY) },
  "sari-sari-store-copy": { estimatedMinutes: 4, solution: solved(SARI_SARI_STORE_INTRO_BODY) },
  "sari-sari-store-sub": { estimatedMinutes: 5, solution: solvedSlot(SARI_SARI_STORE_ELEMENT_SLOT, "<sub></sub>") },
  "sari-sari-store-sub-text": { estimatedMinutes: 4, solution: solved(`${SARI_SARI_STORE_INTRO_BODY}    <sub>1/4</sub>\n`) },
  "store-prices-title": { estimatedMinutes: 4, solution: solvedSlot(STORE_PRICES_TITLE_SLOT, "<h2></h2>") },
  "store-prices-heading": { estimatedMinutes: 4, solution: solved(STORE_PRICES_HEADING_BODY) },
  "store-prices-copy": { estimatedMinutes: 4, solution: solved(STORE_PRICES_INTRO_BODY) },
  "store-prices-em": { estimatedMinutes: 5, solution: solvedSlot(STORE_PRICES_ELEMENT_SLOT, "<em></em>") },
  "store-prices-em-text": { estimatedMinutes: 4, solution: solved(`${STORE_PRICES_INTRO_BODY}    <em>Discounted!</em>\n`) },
  "water-bill-title": { estimatedMinutes: 4, solution: solvedSlot(WATER_BILL_TITLE_SLOT, "<h2></h2>") },
  "water-bill-heading": { estimatedMinutes: 4, solution: solved(WATER_BILL_HEADING_BODY) },
  "water-bill-copy": { estimatedMinutes: 4, solution: solved(WATER_BILL_INTRO_BODY) },
  "water-bill-span": { estimatedMinutes: 5, solution: solvedSlot(WATER_BILL_ELEMENT_SLOT, "<span></span>") },
  "water-bill-span-text": { estimatedMinutes: 4, solution: solved(`${WATER_BILL_INTRO_BODY}    <span>Metered Amount</span>\n`) },
  "store-receipt-title": { estimatedMinutes: 4, solution: solvedSlot(STORE_RECEIPT_TITLE_SLOT, "<h2></h2>") },
  "store-receipt-heading": { estimatedMinutes: 4, solution: solved(STORE_RECEIPT_HEADING_BODY) },
  "store-receipt-copy": { estimatedMinutes: 4, solution: solved(STORE_RECEIPT_INTRO_BODY) },
  "store-receipt-pre": { estimatedMinutes: 5, solution: solvedSlot(STORE_RECEIPT_ELEMENT_SLOT, "<pre></pre>") },
  "store-receipt-pre-text": { estimatedMinutes: 4, solution: solved(`${STORE_RECEIPT_INTRO_BODY}    <pre>Pre keeps it just like that.</pre>\n`) },
  "stock-list-title": { estimatedMinutes: 4, solution: solvedSlot(STOCK_LIST_TITLE_SLOT, "<h2></h2>") },
  "stock-list-heading": { estimatedMinutes: 4, solution: solved(STOCK_LIST_HEADING_BODY) },
  "stock-list-copy": { estimatedMinutes: 4, solution: solved(STOCK_LIST_INTRO_BODY) },
  "stock-list-thead": { estimatedMinutes: 5, solution: solvedSlot(STOCK_LIST_ELEMENT_SLOT, "<thead></thead>") },
  "stock-list-thead-text": { estimatedMinutes: 4, solution: solved(`${STOCK_LIST_INTRO_BODY}    <thead>thMonthth</thead>\n`) },
  "id-application-title": { estimatedMinutes: 4, solution: solvedSlot(ID_APPLICATION_TITLE_SLOT, "<h2></h2>") },
  "id-application-heading": { estimatedMinutes: 4, solution: solved(ID_APPLICATION_HEADING_BODY) },
  "id-application-copy": { estimatedMinutes: 4, solution: solved(ID_APPLICATION_INTRO_BODY) },
  "id-application-tbody": { estimatedMinutes: 5, solution: solvedSlot(ID_APPLICATION_ELEMENT_SLOT, "<tbody></tbody>") },
  "id-application-tbody-text": { estimatedMinutes: 4, solution: solved(`${ID_APPLICATION_INTRO_BODY}    <tbody>Water usage per month</tbody>\n`) },
  "store-price-title": { estimatedMinutes: 4, solution: solvedSlot(STORE_PRICE_TITLE_SLOT, "<h2></h2>") },
  "store-price-heading": { estimatedMinutes: 4, solution: solved(STORE_PRICE_HEADING_BODY) },
  "store-price-copy": { estimatedMinutes: 4, solution: solved(STORE_PRICE_INTRO_BODY) },
  "store-price-tfoot": { estimatedMinutes: 5, solution: solvedSlot(STORE_PRICE_ELEMENT_SLOT, "<tfoot></tfoot>") },
  "store-price-tfoot-text": { estimatedMinutes: 4, solution: solved(`${STORE_PRICE_INTRO_BODY}    <tfoot>TOTAL: ₱100.00</tfoot>\n`) },
  "health-centre-title": { estimatedMinutes: 4, solution: solvedSlot(HEALTH_CENTRE_TITLE_SLOT, "<h2></h2>") },
  "health-centre-heading": { estimatedMinutes: 4, solution: solved(HEALTH_CENTRE_HEADING_BODY) },
  "health-centre-copy": { estimatedMinutes: 4, solution: solved(HEALTH_CENTRE_INTRO_BODY) },
  "health-centre-u": { estimatedMinutes: 5, solution: solvedSlot(HEALTH_CENTRE_ELEMENT_SLOT, "<u></u>") },
  "health-centre-u-text": { estimatedMinutes: 4, solution: solved(`${HEALTH_CENTRE_INTRO_BODY}    <u>misspelled word or important note</u>\n`) },
  "route-board-title": { estimatedMinutes: 4, solution: solvedSlot(ROUTE_BOARD_TITLE_SLOT, "<h2></h2>") },
  "route-board-heading": { estimatedMinutes: 4, solution: solved(ROUTE_BOARD_HEADING_BODY) },
  "route-board-copy": { estimatedMinutes: 4, solution: solved(ROUTE_BOARD_INTRO_BODY) },
  "route-board-sup": { estimatedMinutes: 5, solution: solvedSlot(ROUTE_BOARD_ELEMENT_SLOT, "<sup></sup>") },
  "route-board-sup-text": { estimatedMinutes: 4, solution: solved(`${ROUTE_BOARD_INTRO_BODY}    <sup>1st</sup>\n`) },
  "fish-stall-title": { estimatedMinutes: 4, solution: solvedSlot(FISH_STALL_TITLE_SLOT, "<h2></h2>") },
  "fish-stall-heading": { estimatedMinutes: 4, solution: solved(FISH_STALL_HEADING_BODY) },
  "fish-stall-copy": { estimatedMinutes: 4, solution: solved(FISH_STALL_INTRO_BODY) },
  "fish-stall-dfn": { estimatedMinutes: 5, solution: solvedSlot(FISH_STALL_ELEMENT_SLOT, "<dfn></dfn>") },
  "fish-stall-dfn-text": { estimatedMinutes: 4, solution: solved(`${FISH_STALL_INTRO_BODY}    <dfn>Tilapia</dfn>\n`) },
  "turo-menu-title": { estimatedMinutes: 4, solution: solvedSlot(TURO_MENU_TITLE_SLOT, "<h2></h2>") },
  "turo-menu-heading": { estimatedMinutes: 4, solution: solved(TURO_MENU_HEADING_BODY) },
  "turo-menu-copy": { estimatedMinutes: 4, solution: solved(TURO_MENU_INTRO_BODY) },
  "turo-menu-menu": { estimatedMinutes: 5, solution: solvedSlot(TURO_MENU_ELEMENT_SLOT, "<menu></menu>") },
  "turo-menu-menu-text": { estimatedMinutes: 4, solution: solved(`${TURO_MENU_INTRO_BODY}    <menu>Pay, Cancel, Help</menu>\n`) },
  "basketball-league-title": { estimatedMinutes: 4, solution: solvedSlot(BASKETBALL_LEAGUE_TITLE_SLOT, "<h2></h2>") },
  "basketball-league-heading": { estimatedMinutes: 4, solution: solved(BASKETBALL_LEAGUE_HEADING_BODY) },
  "basketball-league-copy": { estimatedMinutes: 4, solution: solved(BASKETBALL_LEAGUE_INTRO_BODY) },
  "basketball-league-bdi": { estimatedMinutes: 5, solution: solvedSlot(BASKETBALL_LEAGUE_ELEMENT_SLOT, "<bdi></bdi>") },
  "basketball-league-bdi-text": { estimatedMinutes: 4, solution: solved(`${BASKETBALL_LEAGUE_INTRO_BODY}    <bdi>John Doe</bdi>\n`) },
  "supply-list-root": { estimatedMinutes: 4, solution: solvedSlot(SUPPLY_LIST_ROOT_SLOT, "<section></section>") },
  "supply-list-h2-1": { estimatedMinutes: 4, solution: solved(SUPPLY_LIST_B2) },
  "supply-list-p-2": { estimatedMinutes: 4, solution: solved(SUPPLY_LIST_B3) },
} satisfies Record<string, StepReference>;

const PROJECT_ID = "sari-sari-store-page";
const PROJECT_2_ID = "price-list-table";
const PROJECT_3_ID = "barangay-water-notice";
const PROJECT_4_ID = "jeepney-route-guide";
const PROJECT_5_ID = "turo-turo-food-stall-menu";
const PROJECT_6_ID = "adobo-recipe-facts";
const PROJECT_7_ID = "barangay-clinic-bulletin";
const PROJECT_8_ID = "computer-shop-connection-guide";
const PROJECT_9_ID = "relief-supply-tracker";
const PROJECT_10_ID = "weather-photo";
const PROJECT_11_ID = "water-notice-video";
const PROJECT_12_ID = "barangay-radio-update";
const PROJECT_13_ID = "jeepney-stop-search";
const PROJECT_14_ID = "barangay-help-contacts";
const PROJECT_15_ID = "barangay-bulletin-download";
const PROJECT_16_ID = "barangay-safety-tip";
const PROJECT_17_ID = "barangay-office-hours";
const PROJECT_18_ID = "palengke-price-label";
const PROJECT_19_ID = "barangay-emergency-alert";
const PROJECT_20_ID = "barangay-service-search";
const PROJECT_21_ID = "turo-turo-meal-picker";
const PROJECT_22_ID = "palengke-price-board";
const PROJECT_23_ID = "barangay-resident-contact";
const PROJECT_24_ID = "barangay-document-request";
const PROJECT_25_ID = "barangay-story-source";
const PROJECT_26_ID = "barangay-abbreviation-guide";
const PROJECT_27_ID = "barangay-reminder-quote";
const PROJECT_28_ID = "barangay-health-center";
const PROJECT_29_ID = "barangay-jeepney-route";
const PROJECT_30_ID = "barangay-sari-sari-store";
const PROJECT_31_ID = "sari-sari-store";
const PROJECT_32_ID = "barangay-water-bill";
const PROJECT_33_ID = "sari-sari-store-receipt";
const PROJECT_34_ID = "pharmacy-stock-list";
const PROJECT_35_ID = "barangay-id-application";
const PROJECT_36_ID = "sari-sari-store-price";
const PROJECT_37_ID = "barangay-health-centre";
const PROJECT_38_ID = "jeepney-route-board";
const PROJECT_39_ID = "palengke-fish-stall";
const PROJECT_40_ID = "turo-turo-menu";
const PROJECT_41_ID = "barangay-basketball-league";
const PROJECT_42_ID = "school-supply-list";

const s = (step: Omit<Step, "index" | "kind" | "projectId">): Step => {
  const reference = references[step.id as keyof typeof references];
  if (!reference) throw new Error(`Missing reference data for HTML step: ${step.id}`);
  return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_ID };
};

/** Steps in the second project. New project, so a fresh document — decision 24. */
const s2 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => {
  const reference = references[step.id as keyof typeof references];
  if (!reference) throw new Error(`Missing reference data for HTML step: ${step.id}`);
  return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_2_ID };
};

/** Steps in the third project. It starts from a fresh document, too. */
const s3 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => {
  const reference = references[step.id as keyof typeof references];
  if (!reference) throw new Error(`Missing reference data for HTML step: ${step.id}`);
  return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_3_ID };
};

/** Steps in the fourth project. Each begins from this project's fresh document. */
const s4 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => {
  const reference = references[step.id as keyof typeof references];
  if (!reference) throw new Error(`Missing reference data for HTML step: ${step.id}`);
  return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_4_ID };
};

/** Steps in the fifth project. It begins from a fresh document too. */
const s5 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => {
  const reference = references[step.id as keyof typeof references];
  if (!reference) throw new Error(`Missing reference data for HTML step: ${step.id}`);
  return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_5_ID };
};

/** Steps in the sixth project. It begins from a fresh document too. */
const s6 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => {
  const reference = references[step.id as keyof typeof references];
  if (!reference) throw new Error(`Missing reference data for HTML step: ${step.id}`);
  return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_6_ID };
};

/** Steps in the seventh project. It begins from a fresh document too. */
const s7 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => {
  const reference = references[step.id as keyof typeof references];
  if (!reference) throw new Error(`Missing reference data for HTML step: ${step.id}`);
  return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_7_ID };
};

/** Steps in the eighth project. It begins from a fresh document too. */
const s8 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => {
  const reference = references[step.id as keyof typeof references];
  if (!reference) throw new Error(`Missing reference data for HTML step: ${step.id}`);
  return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_8_ID };
};

/** Steps in the ninth project. It begins from a fresh document too. */
const s9 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => {
  const reference = references[step.id as keyof typeof references];
  if (!reference) throw new Error(`Missing reference data for HTML step: ${step.id}`);
  return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_9_ID };
};

/** Steps in the tenth project. It begins from a fresh document too. */
const s10 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => {
  const reference = references[step.id as keyof typeof references];
  if (!reference) throw new Error(`Missing reference data for HTML step: ${step.id}`);
  return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_10_ID };
};

const s11 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => {
  const reference = references[step.id as keyof typeof references];
  if (!reference) throw new Error(`Missing reference data for HTML step: ${step.id}`);
  return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_11_ID };
};

const s12 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => {
  const reference = references[step.id as keyof typeof references];
  if (!reference) throw new Error(`Missing reference data for HTML step: ${step.id}`);
  return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_12_ID };
};

const s13 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => {
  const reference = references[step.id as keyof typeof references];
  if (!reference) throw new Error(`Missing reference data for HTML step: ${step.id}`);
  return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_13_ID };
};

const s14 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => {
  const reference = references[step.id as keyof typeof references];
  if (!reference) throw new Error(`Missing reference data for HTML step: ${step.id}`);
  return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_14_ID };
};

const s15 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => {
  const reference = references[step.id as keyof typeof references];
  if (!reference) throw new Error(`Missing reference data for HTML step: ${step.id}`);
  return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_15_ID };
};

const s16 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => {
  const reference = references[step.id as keyof typeof references];
  if (!reference) throw new Error(`Missing reference data for HTML step: ${step.id}`);
  return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_16_ID };
};

const s17 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => {
  const reference = references[step.id as keyof typeof references];
  if (!reference) throw new Error(`Missing reference data for HTML step: ${step.id}`);
  return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_17_ID };
};

const s18 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => {
  const reference = references[step.id as keyof typeof references];
  if (!reference) throw new Error(`Missing reference data for HTML step: ${step.id}`);
  return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_18_ID };
};

const s19 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => {
  const reference = references[step.id as keyof typeof references];
  if (!reference) throw new Error(`Missing reference data for HTML step: ${step.id}`);
  return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_19_ID };
};

const s20 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => {
  const reference = references[step.id as keyof typeof references];
  if (!reference) throw new Error(`Missing reference data for HTML step: ${step.id}`);
  return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_20_ID };
};

const s21 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => {
  const reference = references[step.id as keyof typeof references];
  if (!reference) throw new Error(`Missing reference data for HTML step: ${step.id}`);
  return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_21_ID };
};

const s22 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => {
  const reference = references[step.id as keyof typeof references];
  if (!reference) throw new Error(`Missing reference data for HTML step: ${step.id}`);
  return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_22_ID };
};

const s23 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => {
  const reference = references[step.id as keyof typeof references];
  if (!reference) throw new Error(`Missing reference data for HTML step: ${step.id}`);
  return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_23_ID };
};

const s24 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => {
  const reference = references[step.id as keyof typeof references];
  if (!reference) throw new Error(`Missing reference data for HTML step: ${step.id}`);
  return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_24_ID };
};

const s25 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => {
  const reference = references[step.id as keyof typeof references];
  if (!reference) throw new Error(`Missing reference data for HTML step: ${step.id}`);
  return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_25_ID };
};

const s26 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => {
  const reference = references[step.id as keyof typeof references];
  if (!reference) throw new Error(`Missing reference data for HTML step: ${step.id}`);
  return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_26_ID };
};

const s27 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => {
  const reference = references[step.id as keyof typeof references];
  if (!reference) throw new Error(`Missing reference data for HTML step: ${step.id}`);
  return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_27_ID };
};

const s28 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => {
  const reference = references[step.id as keyof typeof references];
  return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_28_ID };
};

const s29 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => {
  const reference = references[step.id as keyof typeof references];
  return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_29_ID };
};

const s30 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => {
  const reference = references[step.id as keyof typeof references];
  return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_30_ID };
};

const s31 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => {
  const reference = references[step.id as keyof typeof references];
  return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_31_ID };
};

const s32 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => {
  const reference = references[step.id as keyof typeof references];
  return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_32_ID };
};

const s33 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => {
  const reference = references[step.id as keyof typeof references];
  return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_33_ID };
};

const s34 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => {
  const reference = references[step.id as keyof typeof references];
  return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_34_ID };
};

const s35 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => {
  const reference = references[step.id as keyof typeof references];
  return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_35_ID };
};

const s36 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => {
  const reference = references[step.id as keyof typeof references];
  return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_36_ID };
};

const s37 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => {
  const reference = references[step.id as keyof typeof references];
  return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_37_ID };
};

const s38 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => {
  const reference = references[step.id as keyof typeof references];
  return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_38_ID };
};

const s39 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => {
  const reference = references[step.id as keyof typeof references];
  return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_39_ID };
};

const s40 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => {
  const reference = references[step.id as keyof typeof references];
  return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_40_ID };
};

const s41 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => {
  const reference = references[step.id as keyof typeof references];
  return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_41_ID };
};

const s42 = (step: Omit<Step, "index" | "kind" | "projectId">): Step => {
  const reference = references[step.id as keyof typeof references];
  return { ...step, ...reference, index: ++n, kind: "web", projectId: PROJECT_42_ID };
};

export const htmlCourse: Course = {
  id: "html-basics",
  order: 1,
  title: "Learn HTML by Building a Sari-Sari Store Page",
  project: "Sari-Sari Store Page",
  projects: [
    { id: PROJECT_ID, title: "Sari-Sari Store Page" },
    { id: PROJECT_2_ID, title: "Price List Table" },
    { id: PROJECT_3_ID, title: "Barangay Water Notice" },
    { id: PROJECT_4_ID, title: "Jeepney Route Guide" },
    { id: PROJECT_5_ID, title: "Turo-Turo Food Stall Menu" },
    { id: PROJECT_6_ID, title: "Adobo Recipe Facts" },
    { id: PROJECT_7_ID, title: "Barangay Clinic Bulletin" },
    { id: PROJECT_8_ID, title: "Computer Shop Connection Guide" },
    { id: PROJECT_9_ID, title: "Relief Supply Tracker" },
    { id: PROJECT_10_ID, title: "Weather Photo" },
    { id: PROJECT_11_ID, title: "Water Notice Video" },
    { id: PROJECT_12_ID, title: "Barangay Radio Update" },
    { id: PROJECT_13_ID, title: "Jeepney Stop Search" },
    { id: PROJECT_14_ID, title: "Barangay Help Contacts" },
    { id: PROJECT_15_ID, title: "Barangay Bulletin Download" },
    { id: PROJECT_16_ID, title: "Barangay Safety Tip" },
    { id: PROJECT_17_ID, title: "Barangay Office Hours" },
    { id: PROJECT_18_ID, title: "Palengke Price Label" },
    { id: PROJECT_19_ID, title: "Barangay Emergency Alert" },
    { id: PROJECT_20_ID, title: "Barangay Service Search" },
    { id: PROJECT_21_ID, title: "Turo-Turo Meal Picker" },
    { id: PROJECT_22_ID, title: "Palengke Price Board" },
    { id: PROJECT_23_ID, title: "Barangay Resident Contact" },
    { id: PROJECT_24_ID, title: "Barangay Document Request" },
    { id: PROJECT_25_ID, title: "Barangay Story Source" },
    { id: PROJECT_26_ID, title: "Barangay Abbreviation Guide" },
    { id: PROJECT_27_ID, title: "Barangay Reminder Quote" },
    { id: PROJECT_28_ID, title: "Barangay Health Center Notice" },
    { id: PROJECT_29_ID, title: "Jeepney Route Notice" },
    { id: PROJECT_30_ID, title: "Barangay Sari-Sari Store" },
    { id: PROJECT_31_ID, title: "Sari-Sari Store Prices" },
    { id: PROJECT_32_ID, title: "Barangay Water Bill" },
    { id: PROJECT_33_ID, title: "Sari-Sari Store Receipt" },
    { id: PROJECT_34_ID, title: "Pharmacy Stock List" },
    { id: PROJECT_35_ID, title: "Barangay ID Application" },
    { id: PROJECT_36_ID, title: "Sari Sari Store Price" },
    { id: PROJECT_37_ID, title: "Barangay Health Centre" },
    { id: PROJECT_38_ID, title: "Jeepney Route Board" },
    { id: PROJECT_39_ID, title: "Palengke Fish Stall" },
    { id: PROJECT_40_ID, title: "Turo Turo Menu" },
    { id: PROJECT_41_ID, title: "Barangay Basketball League" },
    { id: PROJECT_42_ID, title: "School Supply List" },
  ],
  kind: "web",
  requires: [],
  summary: "Start here. Build a real web page from nothing, one piece at a time.",
  steps: [
    s({
      id: "h1-block",
      task: "Every page needs a big title. Add one.",
      inputMode: "tap-to-build",
      files: { "index.html": page("    \n") },
      activeFile: "index.html",
      slotLine: 7,
      conceptIds: ["element"],
      blocks: ["<h1></h1>", "<p></p>", "<img>", "<div></div>"],
      correctBlock: "<h1></h1>",
      tests: [
        {
          id: "h1-exists",
          kind: "exists",
          selector: "h1",
          label: "The page has a big title",
        },
      ],
      hints: [
        {
          level: 1,
          text: "The big title block is the one that says h1.",
        },
      ],
      xp: 40,
    }),
    s({
      id: "h1-text",
      task: "Your title is empty. Type words between the two tags.",
      inputMode: "guided",
      files: { "index.html": page("    <h1></h1>\n") },
      activeFile: "index.html",
      highlightToken: "<h1></h1>",
      tests: [
        {
          id: "h1-text",
          kind: "text-not-empty",
          selector: "h1",
          label: "The title has words in it",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Words go in the middle, not inside the pointy brackets.",
        },
        {
          level: 2,
          text: "Try: <h1>Aling Nena's Store</h1>",
        },
      ],
      xp: 40,
    }),
    s({
      id: "p-block",
      task: "Add a paragraph under the title to say what the store sells.",
      inputMode: "tap-to-build",
      files: { "index.html": page("    <h1>Aling Nena's Store</h1>\n    \n") },
      activeFile: "index.html",
      slotLine: 8,
      blocks: ["<p></p>", "<h2></h2>", "<img>", "<span></span>"],
      correctBlock: "<p></p>",
      tests: [
        {
          id: "p-exists",
          kind: "exists",
          selector: "p",
          label: "The page has a paragraph",
        },
      ],
      hints: [
        {
          level: 1,
          text: "A paragraph holds normal words. Its block says p.",
        },
      ],
      xp: 40,
    }),
    s({
      id: "p-text",
      task: "Write what the store sells inside the paragraph.",
      inputMode: "guided",
      files: { "index.html": page("    <h1>Aling Nena's Store</h1>\n    <p></p>\n") },
      activeFile: "index.html",
      highlightToken: "<p></p>",
      tests: [
        {
          id: "p-text",
          kind: "text-not-empty",
          selector: "p",
          label: "The paragraph has words in it",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Same as the title. Words go in the middle.",
        },
      ],
      xp: 40,
    }),
    s({
      id: "h2-section",
      task: "Add a smaller heading that says What We Sell.",
      inputMode: "guided",
      files: {
        "index.html": page(
          "    <h1>Aling Nena's Store</h1>\n    <p>Open every day from 6am to 10pm.</p>\n    \n",
        ),
      },
      activeFile: "index.html",
      tests: [
        {
          id: "h2-exists",
          kind: "exists",
          selector: "h2",
          label: "There is a smaller heading",
        },
        {
          id: "h2-text",
          kind: "text-contains",
          selector: "h2",
          value: "What We Sell",
          label: "It says What We Sell",
        },
      ],
      hints: [
        {
          level: 1,
          text: "h2 is smaller than h1. Headings go from h1 down to h6.",
        },
        {
          level: 2,
          text: "Type: <h2>What We Sell</h2>",
        },
      ],
      xp: 50,
    }),
    s({
      id: "ul-block",
      task: "A list needs a container. Add one.",
      inputMode: "tap-to-build",
      files: {
        "index.html": page(
          "    <h1>Aling Nena's Store</h1>\n    <p>Open every day from 6am to 10pm.</p>\n    <h2>What We Sell</h2>\n    \n",
        ),
      },
      activeFile: "index.html",
      slotLine: 10,
      blocks: ["<ul></ul>", "<li></li>", "<p></p>", "<table></table>"],
      correctBlock: "<ul></ul>",
      tests: [
        {
          id: "ul-exists",
          kind: "exists",
          selector: "ul",
          label: "There is a list",
        },
      ],
      hints: [
        {
          level: 1,
          text: "ul means unordered list. It holds the items.",
        },
      ],
      xp: 50,
    }),
    s({
      id: "li-items",
      task: "Put three things in the list. Each one goes in its own <li></li>.",
      inputMode: "guided",
      files: {
        "index.html": page(
          "    <h1>Aling Nena's Store</h1>\n    <p>Open every day from 6am to 10pm.</p>\n    <h2>What We Sell</h2>\n    <ul>\n      \n    </ul>\n",
        ),
      },
      activeFile: "index.html",
      highlightToken: "<ul>",
      tests: [
        {
          id: "li-count",
          kind: "count",
          selector: "li",
          atLeast: 3,
          label: "The list has three things",
        },
      ],
      hints: [
        {
          level: 1,
          text: "li means list item. You need three of them.",
        },
        {
          level: 2,
          text: "Like this: <li>Rice</li> then two more on their own lines.",
        },
      ],
      xp: 60,
    }),
    s({
      id: "img-block",
      task: "Add a picture of the store.",
      inputMode: "tap-to-build",
      files: {
        "index.html": page(
          "    <h1>Aling Nena's Store</h1>\n    <h2>What We Sell</h2>\n    <ul>\n      <li>Rice</li>\n      <li>Eggs</li>\n      <li>Coffee</li>\n    </ul>\n    \n",
        ),
      },
      activeFile: "index.html",
      slotLine: 14,
      blocks: ['<img src="store.png">', "<p></p>", "<li></li>", "<br>"],
      correctBlock: '<img src="store.png">',
      tests: [
        {
          id: "img-exists",
          kind: "exists",
          selector: "img",
          label: "The page has a picture",
        },
      ],
      hints: [
        {
          level: 1,
          text: "img is short for image. src says which picture to show.",
        },
      ],
      xp: 50,
    }),
    s({
      id: "img-alt",
      task: 'Give the picture a name. Add alt="Aling Nena\'s store front" inside the tag. People who cannot see the picture will hear this name instead.',
      inputMode: "guided",
      files: {
        "index.html": page(
          "    <h1>Aling Nena's Store</h1>\n    <h2>What We Sell</h2>\n    <ul>\n      <li>Rice</li>\n      <li>Eggs</li>\n      <li>Coffee</li>\n    </ul>\n    <img src=\"store.png\">\n",
        ),
      },
      activeFile: "index.html",
      highlightToken: "<img",
      tests: [
        {
          id: "img-alt",
          kind: "attr",
          selector: "img",
          attr: "alt",
          nonEmpty: true,
          label: "The picture has a name",
        },
      ],
      hints: [
        {
          level: 1,
          text: "It goes inside the pointy brackets, after src.",
        },
        {
          level: 2,
          text: 'Add a space then alt="Aling Nena\'s store front" before the >',
        },
      ],
      xp: 60,
    }),
    s({
      id: "anchor",
      task: "Add a link to the map. A link uses <a> and needs an href.",
      inputMode: "guided",
      files: {
        "index.html": page(
          "    <h1>Aling Nena's Store</h1>\n    <ul>\n      <li>Rice</li>\n      <li>Eggs</li>\n      <li>Coffee</li>\n    </ul>\n    <img src=\"store.png\" alt=\"Store front\">\n    \n",
        ),
      },
      activeFile: "index.html",
      tests: [
        {
          id: "a-exists",
          kind: "exists",
          selector: "a",
          label: "There is a link",
        },
        {
          id: "a-href",
          kind: "attr",
          selector: "a",
          attr: "href",
          nonEmpty: true,
          label: "The link points somewhere",
        },
        {
          id: "a-text",
          kind: "text-not-empty",
          selector: "a",
          label: "The link has words",
        },
      ],
      hints: [
        {
          level: 1,
          text: "a means anchor. href is where it goes.",
        },
        {
          level: 2,
          text: 'Try: <a href="https://example.com">Find us</a>',
        },
      ],
      xp: 60,
    }),
    s({
      id: "sectioning",
      task: "Wrap the title in a <header> so the page has clear parts.",
      inputMode: "guided",
      files: {
        "index.html": page(
          "    <h1>Aling Nena's Store</h1>\n    <ul>\n      <li>Rice</li>\n      <li>Eggs</li>\n    </ul>\n",
        ),
      },
      activeFile: "index.html",
      highlightToken: "<h1>",
      tests: [
        {
          id: "header-exists",
          kind: "exists",
          selector: "header",
          label: "The page has a header part",
        },
        {
          id: "h1-in-header",
          kind: "exists",
          selector: "header h1",
          label: "The title is inside the header",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Put <header> before the title and </header> after it.",
        },
      ],
      xp: 60,
    }),
    s({
      id: "form-input",
      task: "Add a form so people can send an order. Put one input inside it.",
      inputMode: "guided",
      files: {
        "index.html": page(
          "    <header>\n      <h1>Aling Nena's Store</h1>\n    </header>\n    <h2>Order</h2>\n    \n",
        ),
      },
      activeFile: "index.html",
      tests: [
        {
          id: "form-exists",
          kind: "exists",
          selector: "form",
          label: "There is a form",
        },
        {
          id: "input-exists",
          kind: "exists",
          selector: "form input",
          label: "The form has a box to type in",
        },
      ],
      hints: [
        {
          level: 1,
          text: "A form holds the boxes people fill in.",
        },
        {
          level: 2,
          text: 'Try: <form>\n  <input type="text">\n</form>',
        },
      ],
      xp: 70,
    }),
    s({
      id: "label",
      task: "A box with no label is confusing. Add a <label> that says what to type.",
      inputMode: "guided",
      files: {
        "index.html": page(
          '    <h2>Order</h2>\n    <form>\n      \n      <input type="text" id="item">\n    </form>\n',
        ),
      },
      activeFile: "index.html",
      highlightToken: "<form>",
      tests: [
        {
          id: "label-exists",
          kind: "exists",
          selector: "label",
          label: "There is a label",
        },
        {
          id: "label-for",
          kind: "attr-equals",
          selector: "label",
          attr: "for",
          value: "item",
          label: "The label points at the box",
        },
      ],
      hints: [
        {
          level: 1,
          text: "The label's for must match the box's id. Both say item.",
        },
        {
          level: 2,
          text: 'Try: <label for="item">What do you need?</label>',
        },
      ],
      xp: 70,
    }),
    s({
      id: "button",
      task: "Add a button that says Send Order.",
      inputMode: "guided",
      files: {
        "index.html": page(
          '    <form>\n      <label for="item">What do you need?</label>\n      <input type="text" id="item">\n      \n    </form>\n',
        ),
      },
      activeFile: "index.html",
      tests: [
        {
          id: "button-exists",
          kind: "exists",
          selector: "form button",
          label: "The form has a button",
        },
        {
          id: "button-text",
          kind: "text-contains",
          selector: "button",
          value: "Send Order",
          label: "It says Send Order",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Words go between <button> and </button>.",
        },
      ],
      xp: 70,
    }),
    s({
      id: "footer",
      task: "Add a <footer> at the bottom with the opening hours.",
      inputMode: "guided",
      files: {
        "index.html": page(
          '    <header>\n      <h1>Aling Nena\'s Store</h1>\n    </header>\n    <form>\n      <label for="item">What do you need?</label>\n      <input type="text" id="item">\n      <button>Send Order</button>\n    </form>\n    \n',
        ),
      },
      activeFile: "index.html",
      tests: [
        {
          id: "footer-exists",
          kind: "exists",
          selector: "footer",
          label: "The page has a bottom part",
        },
        {
          id: "footer-text",
          kind: "text-not-empty",
          selector: "footer",
          label: "The footer has words",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Same shape as header, but at the bottom.",
        },
      ],
      xp: 100,
    }),
    s({
      id: "main-region",
      task: "Put the order heading and form inside a main part.",
      inputMode: "guided",
      files: solved(ORDER_FOOTER_BODY),
      activeFile: "index.html",
      conceptIds: ["main-element"],
      tests: [
        {
          id: "main-exists",
          kind: "exists",
          selector: "main",
          label: "The page has a main part",
        },
        {
          id: "form-in-main",
          kind: "exists",
          selector: "main form",
          label: "The order form is inside main",
        },
      ],
      hints: [
        {
          level: 1,
          text: "The new part starts after header and ends before footer.",
        },
        {
          level: 2,
          text: "Put <main> before the h2 and </main> after the form.",
        },
      ],
      xp: 80,
    }),
    s({
      id: "required-input",
      task: "Make the order box required before the form can send.",
      inputMode: "guided",
      files: solved(MAIN_BODY),
      activeFile: "index.html",
      conceptIds: ["required-attribute"],
      tests: [
        {
          id: "input-required",
          kind: "source-matches",
          file: "index.html",
          pattern: "<input[^>]*\\brequired\\b[^>]*>",
          label: "The order box must be filled",
          because: "Add required inside the order input tag.",
        },
      ],
      hints: [
        {
          level: 1,
          text: "This setting goes inside the input tag and needs no value.",
        },
        {
          level: 2,
          text: "Add required before the final > in the input tag.",
        },
      ],
      xp: 70,
    }),
    s({
      id: "input-name",
      task: "Give the order box the name item.",
      inputMode: "guided",
      files: solved(REQUIRED_BODY),
      activeFile: "index.html",
      conceptIds: ["name-attribute"],
      tests: [
        {
          id: "input-name-item",
          kind: "attr-equals",
          selector: "form input",
          attr: "name",
          value: "item",
          label: "The order box is named item",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Add another setting inside the input tag.",
        },
        {
          level: 2,
          text: "Add name=\"item\" inside the input tag.",
        },
      ],
      xp: 70,
    }),
    s({
      id: "submit-type",
      task: "Tell the button that it sends the form.",
      inputMode: "guided",
      files: solved(NAMED_INPUT_BODY),
      activeFile: "index.html",
      tests: [
        {
          id: "button-submit-type",
          kind: "attr-equals",
          selector: "form button",
          attr: "type",
          value: "submit",
          label: "The button sends the form",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Add a type setting inside the button's opening tag.",
        },
        {
          level: 2,
          text: "Change the opening tag to <button type=\"submit\">.",
        },
      ],
      xp: 60,
    }),
    s({
      id: "fieldset",
      task: "Group the order controls inside a fieldset.",
      inputMode: "guided",
      files: solved(SUBMIT_TYPE_BODY),
      activeFile: "index.html",
      conceptIds: ["fieldset-element"],
      tests: [
        {
          id: "fieldset-exists",
          kind: "exists",
          selector: "form fieldset",
          label: "The form has a group",
        },
        {
          id: "input-in-fieldset",
          kind: "exists",
          selector: "fieldset input",
          label: "The order box is inside the group",
        },
      ],
      hints: [
        {
          level: 1,
          text: "The group starts before the label and ends after the button.",
        },
        {
          level: 2,
          text: "Put <fieldset> before the label and </fieldset> after the button.",
        },
      ],
      xp: 80,
    }),
    s({
      id: "legend",
      task: "Name the group Order details with a legend.",
      inputMode: "guided",
      files: solved(FIELDSET_BODY),
      activeFile: "index.html",
      conceptIds: ["legend-element"],
      tests: [
        {
          id: "legend-exists",
          kind: "exists",
          selector: "form fieldset legend",
          label: "The group has a name",
        },
        {
          id: "legend-text",
          kind: "text-contains",
          selector: "legend",
          value: "Order details",
          label: "The group is named Order details",
        },
      ],
      hints: [
        {
          level: 1,
          text: "The group's name goes first, before its label and box.",
        },
        {
          level: 2,
          text: "Add <legend>Order details</legend> after <fieldset>.",
        },
      ],
      xp: 80,
    }),
    s({
      id: "quantity-field",
      task: "Add a quantity box with a label that asks How many?",
      inputMode: "guided",
      files: solved(LEGEND_BODY),
      activeFile: "index.html",
      tests: [
        {
          id: "quantity-input-exists",
          kind: "exists",
          selector: "fieldset input#quantity",
          label: "The order group has a quantity box",
        },
        {
          id: "quantity-label-exists",
          kind: "exists",
          selector: 'label[for="quantity"]',
          label: "The quantity box has a label",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Add the new label and box before the send button.",
        },
        {
          level: 2,
          text: "Use quantity for both the label's for and the box's id.",
        },
      ],
      xp: 70,
    }),
    s({
      id: "quantity-number",
      task: "Make the quantity box accept numbers.",
      inputMode: "guided",
      files: solved(QUANTITY_BODY),
      activeFile: "index.html",
      conceptIds: ["number-input"],
      tests: [
        {
          id: "quantity-number-type",
          kind: "attr-equals",
          selector: "input#quantity",
          attr: "type",
          value: "number",
          label: "The quantity box accepts numbers",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Change one setting inside the quantity input tag.",
        },
        {
          level: 2,
          text: "Change type=\"text\" to type=\"number\" on the quantity box.",
        },
      ],
      xp: 70,
    }),
    s({
      id: "quantity-minimum",
      task: "Set the smallest quantity to 1.",
      inputMode: "guided",
      files: solved(NUMBER_BODY),
      activeFile: "index.html",
      conceptIds: ["min-attribute"],
      tests: [
        {
          id: "quantity-minimum-one",
          kind: "attr-equals",
          selector: "input#quantity",
          attr: "min",
          value: "1",
          label: "The smallest quantity is 1",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Add a setting for the lowest allowed number.",
        },
        {
          level: 2,
          text: "Add min=\"1\" inside the quantity input tag.",
        },
      ],
      xp: 70,
    }),
    s({
      id: "pickup-select",
      task: "Add a pickup-time menu with a label.",
      inputMode: "guided",
      files: solved(MINIMUM_BODY),
      activeFile: "index.html",
      conceptIds: ["select-element"],
      tests: [
        {
          id: "pickup-select-exists",
          kind: "exists",
          selector: "select#pickup",
          label: "The form has a pickup menu",
        },
        {
          id: "pickup-label-exists",
          kind: "exists",
          selector: 'label[for="pickup"]',
          label: "The pickup menu has a label",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Add the menu after the quantity box and before the button.",
        },
        {
          level: 2,
          text: "Pair for=\"pickup\" with a select that has id=\"pickup\".",
        },
      ],
      xp: 80,
    }),
    s({
      id: "pickup-options",
      task: "Give the pickup menu three time choices.",
      inputMode: "guided",
      files: solved(PICKUP_SELECT_BODY),
      activeFile: "index.html",
      conceptIds: ["option-element"],
      tests: [
        {
          id: "pickup-has-three-options",
          kind: "count",
          selector: "select#pickup option",
          atLeast: 3,
          label: "The pickup menu has three choices",
        },
        {
          id: "pickup-has-morning",
          kind: "text-contains",
          selector: "select#pickup",
          value: "Morning",
          label: "Morning is a pickup choice",
        },
        {
          id: "pickup-has-afternoon",
          kind: "text-contains",
          selector: "select#pickup",
          value: "Afternoon",
          label: "Afternoon is a pickup choice",
        },
        {
          id: "pickup-has-evening",
          kind: "text-contains",
          selector: "select#pickup",
          value: "Evening",
          label: "Evening is a pickup choice",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Each choice goes inside the pickup menu.",
        },
        {
          level: 2,
          text: "Wrap each time in its own <option> and </option> tags.",
        },
      ],
      xp: 80,
    }),
    s({
      id: "order-notes",
      task: "Add a larger box for order notes.",
      inputMode: "guided",
      files: solved(PICKUP_OPTIONS_BODY),
      activeFile: "index.html",
      conceptIds: ["textarea-element"],
      tests: [
        {
          id: "notes-textarea-exists",
          kind: "exists",
          selector: "textarea#notes",
          label: "The form has an order notes box",
        },
        {
          id: "notes-label-exists",
          kind: "exists",
          selector: 'label[for="notes"]',
          label: "The notes box has a label",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Add the notes label and box before the send button.",
        },
        {
          level: 2,
          text: "Pair for=\"notes\" with <textarea id=\"notes\" name=\"notes\"></textarea>.",
        },
      ],
      xp: 80,
    }),
    s({
      id: "checkbox-terms",
      task: "Add a box the learner must tick before sending the order.",
      inputMode: "guided",
      files: solved(ORDER_NOTES_BODY),
      activeFile: "index.html",
      highlightToken: '<button type="submit">Send Order</button>',
      conceptIds: ["checkbox"],
      tests: [
        {
          id: "checkbox-exists",
          kind: "exists",
          selector: 'input[type="checkbox"][name="agree"]',
          label: "There is a box to tick",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Add it just before the Send Order button.",
        },
        {
          level: 2,
          text: '<label><input type="checkbox" name="agree" required> I agree to pay on pickup.</label>',
        },
      ],
      xp: 70,
    }),
    s({
      id: "radio-cash",
      task: "Add a Cash payment choice below the checkbox.",
      inputMode: "tap-to-build",
      files: { "index.html": RADIO_CASH_SLOT.page },
      activeFile: "index.html",
      slotLine: RADIO_CASH_SLOT.slotLine,
      blocks: [
        '<label><input type="radio" name="payment" value="cash"> Cash</label>',
        '<label><input type="checkbox" name="payment" value="cash"> Cash</label>',
        '<label><input type="radio" id="payment" value="cash"> Cash</label>',
        '<label><input type="text" name="payment" value="cash"> Cash</label>',
      ],
      correctBlock: '<label><input type="radio" name="payment" value="cash"> Cash</label>',
      conceptIds: ["radio-button"],
      tests: [
        {
          id: "radio-cash-exists",
          kind: "exists",
          selector: 'input[type="radio"][value="cash"]',
          label: "There is a Cash choice",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Tap the block that uses type=\"radio\", not checkbox or text.",
        },
      ],
      xp: 70,
    }),
    s({
      id: "radio-gcash",
      task: "Add a second choice, GCash, to the same group as Cash.",
      inputMode: "guided",
      files: solved(RADIO_CASH_BODY),
      activeFile: "index.html",
      highlightToken: '<label><input type="radio" name="payment" value="cash"> Cash</label>',
      tests: [
        {
          id: "two-radios",
          kind: "count",
          selector: 'input[type="radio"][name="payment"]',
          atLeast: 2,
          label: "There are two payment choices",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Copy the Cash line, then change cash to gcash in both places.",
        },
        {
          level: 2,
          text: '<label><input type="radio" name="payment" value="gcash"> GCash</label>',
        },
      ],
      xp: 60,
    }),
    s({
      id: "placeholder-hint",
      task: "Show an example inside the item box before anyone types.",
      inputMode: "guided",
      files: solved(RADIO_GCASH_BODY),
      activeFile: "index.html",
      highlightToken: '<input type="text" id="item" name="item" required>',
      conceptIds: ["placeholder-attribute"],
      tests: [
        {
          id: "item-placeholder",
          kind: "attr-equals",
          selector: "input#item",
          attr: "placeholder",
          value: "e.g. rice, eggs",
          label: "The item box shows an example",
        },
      ],
      hints: [
        {
          level: 1,
          text: 'Add placeholder="e.g. rice, eggs" inside the input tag.',
        },
      ],
      xp: 60,
    }),
    s({
      id: "small-note",
      task: "Add a small line under the form saying you call to confirm.",
      inputMode: "guided",
      files: solved(PLACEHOLDER_BODY),
      activeFile: "index.html",
      highlightToken: "</fieldset>",
      tests: [
        {
          id: "small-exists",
          kind: "text-contains",
          selector: "small",
          value: "confirm",
          label: "There is a small confirmation note",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Add it below the boxed section, still inside the form.",
        },
        {
          level: 2,
          text: "<small>We call to confirm your order.</small>",
        },
      ],
      xp: 60,
    }),
    s({
      id: "strong-emphasis",
      task: "Make the words 'We call' stand out inside the note.",
      inputMode: "tap-to-build",
      files: { "index.html": STRONG_EMPHASIS_SLOT.page },
      activeFile: "index.html",
      slotLine: STRONG_EMPHASIS_SLOT.slotLine,
      blocks: [
        "<small><strong>We call</strong> to confirm your order.</small>",
        "<small><b>We call</b> to confirm your order.</small>",
        "<small><strong>We call to confirm your order.</strong></small>",
        "<small>We call to confirm your order.</small>",
      ],
      correctBlock: "<small><strong>We call</strong> to confirm your order.</small>",
      tests: [
        {
          id: "strong-exists",
          kind: "exists",
          selector: "small strong",
          label: "Part of the note stands out",
        },
      ],
      hints: [
        {
          level: 1,
          text: "strong is for important words. b just makes them bold with no meaning.",
        },
      ],
      xp: 70,
    }),
    s2({
      id: "table-skeleton",
      task: "Start a new page: a price list. Add an empty table.",
      inputMode: "tap-to-build",
      files: { "index.html": TABLE_SKELETON_SLOT.page },
      activeFile: "index.html",
      slotLine: TABLE_SKELETON_SLOT.slotLine,
      conceptIds: ["table"],
      blocks: ["<table></table>", "<table><table>", "<list></list>", "<grid></grid>"],
      correctBlock: "<table></table>",
      tests: [
        {
          id: "table-exists",
          kind: "exists",
          selector: "table",
          label: "There is a table",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Only one block is a real, correctly closed HTML tag.",
        },
      ],
      xp: 40,
    }),
    s2({
      id: "table-header",
      task: "Add a header row: Item and Price.",
      inputMode: "guided",
      files: solved(TABLE_SKELETON_BODY),
      activeFile: "index.html",
      highlightToken: "<table>",
      tests: [
        {
          id: "has-th",
          kind: "count",
          selector: "th",
          atLeast: 2,
          label: "There are two header cells",
        },
      ],
      hints: [
        {
          level: 1,
          text: "th is a header cell. Put Item in one, Price in the other.",
        },
      ],
      xp: 50,
    }),
    s2({
      id: "table-row",
      task: "Add a real row: Rice, 58.",
      inputMode: "guided",
      files: solved(TABLE_HEADER_BODY),
      activeFile: "index.html",
      highlightToken: "</table>",
      tests: [
        {
          id: "has-td",
          kind: "count",
          selector: "td",
          atLeast: 2,
          label: "There is a price row",
        },
      ],
      hints: [
        {
          level: 1,
          text: "td is a data cell, not a header. Add it as a new row.",
        },
      ],
      xp: 50,
    }),
    s2({
      id: "ordered-list",
      task: "Add numbered steps for how to order.",
      inputMode: "guided",
      files: solved(TABLE_ROW_BODY),
      activeFile: "index.html",
      highlightToken: "</table>",
      conceptIds: ["ordered-list"],
      tests: [
        {
          id: "ol-exists",
          kind: "count",
          selector: "ol li",
          atLeast: 3,
          label: "There are three numbered steps",
        },
      ],
      hints: [
        {
          level: 1,
          text: "ol numbers its items automatically. Add three li lines inside it.",
        },
      ],
      xp: 50,
    }),
    s2({
      id: "blockquote",
      task: "Add a customer's own words as a quote.",
      inputMode: "guided",
      files: solved(ORDERED_LIST_BODY),
      activeFile: "index.html",
      highlightToken: "</ol>",
      conceptIds: ["blockquote"],
      tests: [
        {
          id: "blockquote-exists",
          kind: "text-not-empty",
          selector: "blockquote",
          label: "There is a customer quote",
        },
      ],
      hints: [
        {
          level: 1,
          text: "blockquote is for someone else's words, not the store's own.",
        },
      ],
      xp: 40,
    }),
    s2({
      id: "figure-caption",
      task: "Add the store photo with a caption underneath.",
      inputMode: "guided",
      files: solved(BLOCKQUOTE_BODY),
      activeFile: "index.html",
      highlightToken: "</blockquote>",
      conceptIds: ["figure-element"],
      tests: [
        {
          id: "figcaption-exists",
          kind: "exists",
          selector: "figure figcaption",
          label: "The photo has a caption",
        },
      ],
      hints: [
        {
          level: 1,
          text: "The image and its caption both go inside one figure.",
        },
      ],
      xp: 60,
    }),
    s2({
      id: "address-block",
      task: "Add how to reach the store: phone and barangay.",
      inputMode: "guided",
      files: solved(FIGURE_BODY),
      activeFile: "index.html",
      highlightToken: "</figure>",
      conceptIds: ["address-element"],
      tests: [
        {
          id: "address-exists",
          kind: "text-not-empty",
          selector: "address",
          label: "There is a contact line",
        },
      ],
      hints: [
        {
          level: 1,
          text: "address is for contact details, not a home address form field.",
        },
      ],
      xp: 40,
    }),
    s3({
      id: "article-shell",
      task: "Start a new page for a barangay, a local neighborhood, notice. Add an article.",
      inputMode: "tap-to-build",
      files: { "index.html": NOTICE_ARTICLE_SLOT.page },
      activeFile: "index.html",
      slotLine: NOTICE_ARTICLE_SLOT.slotLine,
      conceptIds: ["article-element"],
      blocks: ["<article></article>", "<article><article>", "<notice></notice>", "<section><section>"],
      correctBlock: "<article></article>",
      tests: [
        {
          id: "article-exists",
          kind: "exists",
          selector: "article",
          label: "The notice is an article",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Choose the real article tag with a matching closing tag.",
        },
      ],
      xp: 40,
    }),
    s3({
      id: "notice-title",
      task: "Add a notice title: Water Service Notice.",
      inputMode: "guided",
      files: solved(NOTICE_ARTICLE_BODY),
      activeFile: "index.html",
      highlightToken: "</article>",
      tests: [
        {
          id: "notice-title-exists",
          kind: "text-equals",
          selector: "article h2",
          value: "Water Service Notice",
          label: "The notice has a clear title",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Put the heading inside the article, before its closing tag.",
        },
        {
          level: 2,
          text: "Type: <h2>Water Service Notice</h2>",
        },
      ],
      xp: 50,
    }),
    s3({
      id: "notice-copy",
      task: "Tell residents when water service stops.",
      inputMode: "guided",
      files: solved(NOTICE_TITLE_BODY),
      activeFile: "index.html",
      highlightToken: "</article>",
      tests: [
        {
          id: "notice-copy-exists",
          kind: "text-contains",
          selector: "article p",
          value: "9am to 1pm",
          label: "The notice says when service stops",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Use a paragraph below the title, still inside the article.",
        },
        {
          level: 2,
          text: "Say water service stops from 9am to 1pm on Monday.",
        },
      ],
      xp: 50,
    }),
    s3({
      id: "notice-time",
      task: "Add the time when water service stops.",
      inputMode: "guided",
      files: solved(NOTICE_COPY_BODY),
      activeFile: "index.html",
      highlightToken: "</article>",
      conceptIds: ["time-element"],
      tests: [
        {
          id: "notice-time-exists",
          kind: "text-equals",
          selector: "article time",
          value: "Monday, 9am to 1pm",
          label: "The time is marked clearly",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Put the time after the paragraph, before the article closes.",
        },
        {
          level: 2,
          text: "Type: <time>Monday, 9am to 1pm</time>",
        },
      ],
      xp: 60,
    }),
    s3({
      id: "notice-datetime",
      task: "Add a computer-readable start time to the time tag.",
      inputMode: "guided",
      files: solved(NOTICE_TIME_BODY),
      activeFile: "index.html",
      highlightToken: "<time>",
      conceptIds: ["datetime-attribute"],
      tests: [
        {
          id: "notice-datetime-value",
          kind: "attr-equals",
          selector: "article time",
          attr: "datetime",
          value: "2026-08-24T09:00",
          label: "The time has a computer-readable value",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Add the datetime setting inside the opening time tag.",
        },
        {
          level: 2,
          text: "Change <time> to <time datetime=\"2026-08-24T09:00\">.",
        },
      ],
      xp: 70,
    }),
    s3({
      id: "notice-contact",
      task: "Add contact details for Barangay San Roque.",
      inputMode: "guided",
      files: solved(NOTICE_DATETIME_BODY),
      activeFile: "index.html",
      highlightToken: "</article>",
      tests: [
        {
          id: "notice-contact-exists",
          kind: "text-contains",
          selector: "article address",
          value: "0917-000-0000",
          label: "The notice has a contact number",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Put the contact line inside address tags at the bottom.",
        },
        {
          level: 2,
          text: "Include Barangay San Roque and 0917-000-0000 in address.",
        },
      ],
      xp: 50,
    }),
    s4({
      id: "route-nav",
      task: "Start a guide for a jeepney, a shared route vehicle. Add nav.",
      inputMode: "tap-to-build",
      files: { "index.html": ROUTE_NAV_SLOT.page },
      activeFile: "index.html",
      slotLine: ROUTE_NAV_SLOT.slotLine,
      conceptIds: ["nav-element"],
      blocks: ["<nav></nav>", "<nav><nav>", "<route></route>", "<menu><menu>"],
      correctBlock: "<nav></nav>",
      tests: [
        {
          id: "route-nav-exists",
          kind: "exists",
          selector: "nav",
          label: "The guide has navigation",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Choose the real navigation tag with a matching closing tag.",
        },
      ],
      xp: 40,
    }),
    s4({
      id: "route-title",
      task: "Add a title: Route Stops.",
      inputMode: "guided",
      files: solved(ROUTE_NAV_BODY),
      activeFile: "index.html",
      highlightToken: "</nav>",
      tests: [
        {
          id: "route-title-exists",
          kind: "text-equals",
          selector: "nav h2",
          value: "Route Stops",
          label: "The guide has a title",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Put the heading inside nav, before its closing tag.",
        },
        {
          level: 2,
          text: "Type: <h2>Route Stops</h2>",
        },
      ],
      xp: 50,
    }),
    s4({
      id: "route-list",
      task: "Add one route stop: palengke, a public market.",
      inputMode: "guided",
      files: solved(ROUTE_TITLE_BODY),
      activeFile: "index.html",
      highlightToken: "</nav>",
      tests: [
        {
          id: "route-list-exists",
          kind: "text-equals",
          selector: "nav ul li",
          value: "Palengke",
          label: "The guide lists Palengke",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Put a one-item list below the title, still inside nav.",
        },
        {
          level: 2,
          text: "Type: <ul><li>Palengke</li></ul>",
        },
      ],
      xp: 50,
    }),
    s4({
      id: "route-link",
      task: "Make Palengke jump to its stop on this page.",
      inputMode: "guided",
      files: solved(ROUTE_LIST_BODY),
      activeFile: "index.html",
      highlightToken: "<ul><li>Palengke</li></ul>",
      conceptIds: ["fragment-link"],
      tests: [
        {
          id: "route-link-target",
          kind: "attr-equals",
          selector: "nav a",
          attr: "href",
          value: "#palengke",
          label: "Palengke links to its stop",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Wrap Palengke in a link whose target starts with #.",
        },
        {
          level: 2,
          text: "Use href=\"#palengke\" on the Palengke link.",
        },
      ],
      xp: 60,
    }),
    s4({
      id: "route-stop",
      task: "Add the matching Palengke heading below the guide.",
      inputMode: "guided",
      files: solved(ROUTE_LINK_BODY),
      activeFile: "index.html",
      highlightToken: "</nav>",
      conceptIds: ["id-attribute"],
      tests: [
        {
          id: "route-stop-id",
          kind: "attr-equals",
          selector: "h2#palengke",
          attr: "id",
          value: "palengke",
          label: "The Palengke heading has the right id",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Add the heading after nav. Give it the link's target name.",
        },
        {
          level: 2,
          text: "Type: <h2 id=\"palengke\">Palengke</h2>",
        },
      ],
      xp: 60,
    }),
    s4({
      id: "route-copy",
      task: "Describe Palengke below its heading.",
      inputMode: "guided",
      files: solved(ROUTE_STOP_BODY),
      activeFile: "index.html",
      highlightToken: "</h2>",
      tests: [
        {
          id: "route-copy-exists",
          kind: "text-contains",
          selector: "p",
          value: "public market",
          label: "The stop has a short description",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Add one paragraph after the Palengke heading.",
        },
        {
          level: 2,
          text: "Say Palengke is a public market stop.",
        },
      ],
      xp: 50,
    }),
    s5({
      id: "menu-details",
      task: "Start a turo-turo menu. Turo-turo means a point-and-choose food stall. Add details.",
      inputMode: "tap-to-build",
      files: { "index.html": MENU_DETAILS_SLOT.page },
      activeFile: "index.html",
      slotLine: MENU_DETAILS_SLOT.slotLine,
      conceptIds: ["details-element"],
      blocks: ["<details></details>", "<details><details>", "<menu></menu>", "<summary></summary>"],
      correctBlock: "<details></details>",
      tests: [
        {
          id: "menu-details-exists",
          kind: "exists",
          selector: "details",
          label: "The menu has details",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Choose the real details tag with a matching closing tag.",
        },
      ],
      xp: 40,
    }),
    s5({
      id: "menu-summary",
      task: "Name the section: Today's dishes.",
      inputMode: "guided",
      files: solved(MENU_DETAILS_BODY),
      activeFile: "index.html",
      highlightToken: "</details>",
      conceptIds: ["summary-element"],
      tests: [
        {
          id: "menu-summary-exists",
          kind: "text-equals",
          selector: "details summary",
          value: "Today's dishes",
          label: "The menu has a label",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Put the clickable label inside details, before its closing tag.",
        },
        {
          level: 2,
          text: "Type: <summary>Today's dishes</summary>",
        },
      ],
      xp: 50,
    }),
    s5({
      id: "menu-item",
      task: "Add one dish: Chicken adobo.",
      inputMode: "guided",
      files: solved(MENU_SUMMARY_BODY),
      activeFile: "index.html",
      highlightToken: "</details>",
      tests: [
        {
          id: "menu-item-exists",
          kind: "text-equals",
          selector: "details p",
          value: "Chicken adobo",
          label: "The menu lists Chicken adobo",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Add one paragraph below the summary, still inside details.",
        },
        {
          level: 2,
          text: "Type: <p>Chicken adobo</p>",
        },
      ],
      xp: 50,
    }),
    s5({
      id: "menu-price",
      task: "Add the price: PHP 85.",
      inputMode: "guided",
      files: solved(MENU_ITEM_BODY),
      activeFile: "index.html",
      highlightToken: "Chicken adobo",
      tests: [
        {
          id: "menu-price-exists",
          kind: "text-equals",
          selector: "details p",
          value: "Chicken adobo: PHP 85",
          label: "The dish has its price",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Keep the dish name. Add a colon and PHP 85 after it.",
        },
      ],
      xp: 40,
    }),
    s5({
      id: "menu-open",
      task: "Show the dishes when the page first opens.",
      inputMode: "guided",
      files: solved(MENU_PRICE_BODY),
      activeFile: "index.html",
      highlightToken: "<details>",
      conceptIds: ["open-attribute"],
      tests: [
        {
          id: "menu-open-source",
          kind: "source-matches",
          file: "index.html",
          pattern: "<details\\s+open>",
          label: "The menu opens at first",
          because: "The browser treats open as a Boolean setting, so the source proves it best.",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Add one setting inside the opening details tag.",
        },
        {
          level: 2,
          text: "Change <details> to <details open>.",
        },
      ],
      xp: 60,
    }),
    s5({
      id: "menu-note",
      task: "Add a small note about allergy ingredients.",
      inputMode: "guided",
      files: solved(MENU_OPEN_BODY),
      activeFile: "index.html",
      highlightToken: "</details>",
      tests: [
        {
          id: "menu-note-exists",
          kind: "text-contains",
          selector: "details small",
          value: "allergy",
          label: "The menu has an allergy note",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Put the small note below the dish, before details closes.",
        },
        {
          level: 2,
          text: "Type: <small>Ask about allergy ingredients.</small>",
        },
      ],
      xp: 50,
    }),
    s6({
      id: "recipe-list",
      task: "Start an Adobo recipe card. Add a list for recipe facts.",
      inputMode: "tap-to-build",
      files: { "index.html": RECIPE_LIST_SLOT.page },
      activeFile: "index.html",
      slotLine: RECIPE_LIST_SLOT.slotLine,
      conceptIds: ["definition-list"],
      blocks: ["<dl></dl>", "<dl><dl>", "<list></list>", "<dt></dt>"],
      correctBlock: "<dl></dl>",
      tests: [
        {
          id: "recipe-list-exists",
          kind: "exists",
          selector: "dl",
          label: "The recipe has a facts list",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Choose the real list tag with a matching closing tag.",
        },
      ],
      xp: 40,
    }),
    s6({
      id: "recipe-time-term",
      task: "Add the first recipe fact: Cooking time.",
      inputMode: "guided",
      files: solved(RECIPE_LIST_BODY),
      activeFile: "index.html",
      highlightToken: "</dl>",
      conceptIds: ["term-element"],
      tests: [
        {
          id: "recipe-time-term-exists",
          kind: "text-equals",
          selector: "dl dt",
          value: "Cooking time",
          label: "The facts name cooking time",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Put the fact name inside the list, before it closes.",
        },
        {
          level: 2,
          text: "Type: <dt>Cooking time</dt>",
        },
      ],
      xp: 50,
    }),
    s6({
      id: "recipe-time-value",
      task: "Add the cooking time: 30 minutes.",
      inputMode: "guided",
      files: solved(RECIPE_TIME_TERM_BODY),
      activeFile: "index.html",
      highlightToken: "</dl>",
      conceptIds: ["description-element"],
      tests: [
        {
          id: "recipe-time-value-exists",
          kind: "text-equals",
          selector: "dl dd",
          value: "30 minutes",
          label: "The cooking time has a value",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Put the fact's value after its name, still inside the list.",
        },
        {
          level: 2,
          text: "Type: <dd>30 minutes</dd>",
        },
      ],
      xp: 50,
    }),
    s6({
      id: "recipe-servings-term",
      task: "Add another recipe fact: Serves.",
      inputMode: "guided",
      files: solved(RECIPE_TIME_VALUE_BODY),
      activeFile: "index.html",
      highlightToken: "</dl>",
      tests: [
        {
          id: "recipe-servings-term-exists",
          kind: "text-equals",
          selector: "dl dt:nth-of-type(2)",
          value: "Serves",
          label: "The facts name servings",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Add a second fact name after the cooking-time value.",
        },
        {
          level: 2,
          text: "Type: <dt>Serves</dt>",
        },
      ],
      xp: 40,
    }),
    s6({
      id: "recipe-servings-value",
      task: "Add how many people it serves: 4 people.",
      inputMode: "guided",
      files: solved(RECIPE_SERVINGS_TERM_BODY),
      activeFile: "index.html",
      highlightToken: "</dl>",
      tests: [
        {
          id: "recipe-servings-value-exists",
          kind: "text-equals",
          selector: "dl dd:nth-of-type(2)",
          value: "4 people",
          label: "The servings have a value",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Add the value after Serves, still inside the list.",
        },
        {
          level: 2,
          text: "Type: <dd>4 people</dd>",
        },
      ],
      xp: 40,
    }),
    s6({
      id: "recipe-note",
      task: "Add one serving note below the facts.",
      inputMode: "guided",
      files: solved(RECIPE_SERVINGS_VALUE_BODY),
      activeFile: "index.html",
      highlightToken: "</dl>",
      tests: [
        {
          id: "recipe-note-exists",
          kind: "text-equals",
          selector: "p",
          value: "Best served with rice.",
          label: "The recipe has a serving note",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Add one paragraph after the facts list closes.",
        },
        {
          level: 2,
          text: "Type: <p>Best served with rice.</p>",
        },
      ],
      xp: 40,
    }),
    s7({
      id: "clinic-paragraph",
      task: "Start a clinic bulletin. Add a paragraph.",
      inputMode: "tap-to-build",
      files: { "index.html": CLINIC_PARAGRAPH_SLOT.page },
      activeFile: "index.html",
      slotLine: CLINIC_PARAGRAPH_SLOT.slotLine,
      blocks: ["<p></p>", "<paragraph></paragraph>", "<text></text>", "<p><p>"],
      correctBlock: "<p></p>",
      tests: [
        {
          id: "clinic-paragraph-exists",
          kind: "exists",
          selector: "p",
          label: "The bulletin has a paragraph",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Choose the tag for normal sentence text.",
        },
      ],
      xp: 40,
    }),
    s7({
      id: "clinic-message",
      task: "Tell people the BHW clinic is open.",
      inputMode: "guided",
      files: solved(CLINIC_PARAGRAPH_BODY),
      activeFile: "index.html",
      highlightToken: "</p>",
      tests: [
        {
          id: "clinic-message-exists",
          kind: "text-equals",
          selector: "p",
          value: "The BHW clinic is open.",
          label: "The clinic message is clear",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Type the clinic sentence inside the paragraph.",
        },
        {
          level: 2,
          text: "Type: The BHW clinic is open.",
        },
      ],
      xp: 40,
    }),
    s7({
      id: "clinic-abbreviation",
      task: "Mark BHW as an abbreviation.",
      inputMode: "guided",
      files: solved(CLINIC_MESSAGE_BODY),
      activeFile: "index.html",
      highlightToken: "BHW",
      conceptIds: ["abbreviation-element"],
      tests: [
        {
          id: "clinic-abbreviation-exists",
          kind: "exists",
          selector: "abbr",
          label: "BHW is marked as short form",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Wrap the short clinic title. Keep its letters unchanged.",
        },
        {
          level: 2,
          text: "Change BHW to <abbr>BHW</abbr>.",
        },
      ],
      xp: 50,
    }),
    s7({
      id: "clinic-title",
      task: "Give BHW its full name: Barangay Health Worker.",
      inputMode: "guided",
      files: solved(CLINIC_ABBREVIATION_BODY),
      activeFile: "index.html",
      highlightToken: "<abbr>",
      conceptIds: ["title-attribute"],
      tests: [
        {
          id: "clinic-title-value",
          kind: "attr-equals",
          selector: "abbr",
          attr: "title",
          value: "Barangay Health Worker",
          label: "BHW has its full name",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Add the long role name as a setting in the opening tag.",
        },
        {
          level: 2,
          text: "Change <abbr> to <abbr title=\"Barangay Health Worker\">.",
        },
      ],
      xp: 50,
    }),
    s7({
      id: "clinic-free",
      task: "Highlight that check-ups are free.",
      inputMode: "guided",
      files: solved(CLINIC_TITLE_BODY),
      activeFile: "index.html",
      highlightToken: "</p>",
      conceptIds: ["mark-element"],
      tests: [
        {
          id: "clinic-free-exists",
          kind: "text-equals",
          selector: "p mark",
          value: "Free",
          label: "Free is highlighted",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Add a second line inside the paragraph for the good news.",
        },
        {
          level: 2,
          text: "Type: <mark>Free</mark> check-ups are available.",
        },
      ],
      xp: 50,
    }),
    s7({
      id: "clinic-cancelled",
      task: "Show the cancelled Saturday clinic.",
      inputMode: "guided",
      files: solved(CLINIC_FREE_BODY),
      activeFile: "index.html",
      highlightToken: "</p>",
      conceptIds: ["deletion-element"],
      tests: [
        {
          id: "clinic-cancelled-exists",
          kind: "text-equals",
          selector: "p del",
          value: "Saturday clinic",
          label: "The old clinic day stays visible",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Add a third line that keeps the old day visible.",
        },
        {
          level: 2,
          text: "Type: <del>Saturday clinic</del>",
        },
      ],
      xp: 50,
    }),
    s7({
      id: "clinic-corrected",
      task: "Add the new clinic day: Sunday clinic.",
      inputMode: "guided",
      files: solved(CLINIC_CANCELLED_BODY),
      activeFile: "index.html",
      highlightToken: "</p>",
      conceptIds: ["insertion-element"],
      tests: [
        {
          id: "clinic-corrected-exists",
          kind: "text-equals",
          selector: "p ins",
          value: "Sunday clinic",
          label: "The new clinic day is shown",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Add a last line for the new day.",
        },
        {
          level: 2,
          text: "Type: <ins>Sunday clinic</ins>",
        },
      ],
      xp: 50,
    }),
    s8({
      id: "computer-paragraph",
      task: "Start a computer shop guide. Add a paragraph.",
      inputMode: "tap-to-build",
      files: { "index.html": COMPUTER_PARAGRAPH_SLOT.page },
      activeFile: "index.html",
      slotLine: COMPUTER_PARAGRAPH_SLOT.slotLine,
      blocks: ["<p></p>", "<paragraph></paragraph>", "<text></text>", "<p><p>"],
      correctBlock: "<p></p>",
      tests: [
        {
          id: "computer-paragraph-exists",
          kind: "exists",
          selector: "p",
          label: "The guide has a paragraph",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Choose the tag for normal sentence text.",
        },
      ],
      xp: 40,
    }),
    s8({
      id: "computer-message",
      task: "Tell visitors how to join the network.",
      inputMode: "guided",
      files: solved(COMPUTER_PARAGRAPH_BODY),
      activeFile: "index.html",
      highlightToken: "</p>",
      tests: [
        {
          id: "computer-message-exists",
          kind: "text-equals",
          selector: "p",
          value: "Press Enter to join the public network.",
          label: "The guide gives the first step",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Write the first connection instruction inside the paragraph.",
        },
        {
          level: 2,
          text: "Type: Press Enter to join the public network.",
        },
      ],
      xp: 40,
    }),
    s8({
      id: "computer-key",
      task: "Mark Enter as a keyboard key.",
      inputMode: "guided",
      files: solved(COMPUTER_MESSAGE_BODY),
      activeFile: "index.html",
      highlightToken: "Enter",
      conceptIds: ["keyboard-input-element"],
      tests: [
        {
          id: "computer-key-exists",
          kind: "text-equals",
          selector: "p kbd",
          value: "Enter",
          label: "The keyboard key is marked",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Wrap the key name in the tag for keyboard input.",
        },
        {
          level: 2,
          text: "Change Enter to <kbd>Enter</kbd>.",
        },
      ],
      xp: 50,
    }),
    s8({
      id: "computer-code",
      task: "Add the access code: WIFI-2026.",
      inputMode: "guided",
      files: solved(COMPUTER_KEY_BODY),
      activeFile: "index.html",
      highlightToken: "</p>",
      conceptIds: ["code-element"],
      tests: [
        {
          id: "computer-code-exists",
          kind: "text-equals",
          selector: "p code",
          value: "WIFI-2026",
          label: "The access code is marked",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Add a new line that marks the access code as code.",
        },
        {
          level: 2,
          text: "Type: <code>WIFI-2026</code> is the access code.",
        },
      ],
      xp: 50,
    }),
    s8({
      id: "computer-status",
      task: "Show the result: Connected.",
      inputMode: "guided",
      files: solved(COMPUTER_CODE_BODY),
      activeFile: "index.html",
      highlightToken: "</p>",
      conceptIds: ["sample-output-element"],
      tests: [
        {
          id: "computer-status-exists",
          kind: "text-equals",
          selector: "p samp",
          value: "Connected",
          label: "The result is marked",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Add a last line that marks the computer's result.",
        },
        {
          level: 2,
          text: "Type: Status: <samp>Connected</samp>.",
        },
      ],
      xp: 50,
    }),
    s9({
      id: "relief-progress",
      task: "Start a relief tracker. Add the packs progress bar.",
      inputMode: "tap-to-build",
      files: { "index.html": RELIEF_PROGRESS_SLOT.page },
      activeFile: "index.html",
      slotLine: RELIEF_PROGRESS_SLOT.slotLine,
      conceptIds: ["progress-element"],
      blocks: [
        "<label>Relief packs: <progress></progress></label>",
        "<label>Relief packs: <meter></meter></label>",
        "<progress>Relief packs</progress>",
        "<label>Relief packs: <bar></bar></label>",
      ],
      correctBlock: "<label>Relief packs: <progress></progress></label>",
      tests: [
        {
          id: "relief-progress-exists",
          kind: "exists",
          selector: "progress",
          label: "The packs have a progress bar",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Choose the block that names the packs and tracks work completed.",
        },
      ],
      xp: 50,
    }),
    s9({
      id: "relief-packs",
      task: "Add the fallback count: 4 of 10 packs.",
      inputMode: "guided",
      files: solved(RELIEF_PROGRESS_BODY),
      activeFile: "index.html",
      highlightToken: "</progress>",
      tests: [
        {
          id: "relief-packs-text",
          kind: "text-equals",
          selector: "progress",
          value: "4 of 10 packs",
          label: "The count is readable",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Write the pack count inside the progress bar.",
        },
        {
          level: 2,
          text: "Type: 4 of 10 packs",
        },
      ],
      xp: 40,
    }),
    s9({
      id: "relief-progress-value",
      task: "Set the packs completed to 4.",
      inputMode: "guided",
      files: solved(RELIEF_PACKS_BODY),
      activeFile: "index.html",
      highlightToken: "<progress>",
      conceptIds: ["value-attribute"],
      tests: [
        {
          id: "relief-progress-value-set",
          kind: "attr-equals",
          selector: "progress",
          attr: "value",
          value: "4",
          label: "The current count is 4",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Add the current number as a setting in the opening bar tag.",
        },
        {
          level: 2,
          text: "Change <progress> to <progress value=\"4\">.",
        },
      ],
      xp: 50,
    }),
    s9({
      id: "relief-progress-max",
      task: "Set the total pack goal to 10.",
      inputMode: "guided",
      files: solved(RELIEF_PROGRESS_VALUE_BODY),
      activeFile: "index.html",
      highlightToken: '<progress value="4">',
      conceptIds: ["max-attribute"],
      tests: [
        {
          id: "relief-progress-max-set",
          kind: "attr-equals",
          selector: "progress",
          attr: "max",
          value: "10",
          label: "The goal is 10 packs",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Add the total goal as another setting in the opening bar tag.",
        },
        {
          level: 2,
          text: "Add max=\"10\" after value=\"4\".",
        },
      ],
      xp: 50,
    }),
    s9({
      id: "relief-meter",
      task: "Add a water-level meter below the packs.",
      inputMode: "tap-to-build",
      files: { "index.html": RELIEF_METER_SLOT.page },
      activeFile: "index.html",
      slotLine: RELIEF_METER_SLOT.slotLine,
      conceptIds: ["meter-element"],
      blocks: [
        "<label>Water level: <meter>Water level</meter></label>",
        "<label>Water level: <progress>Water level</progress></label>",
        "<meter>Water level</meter>",
        "<label>Water level: <gauge>Water level</gauge></label>",
      ],
      correctBlock: "<label>Water level: <meter>Water level</meter></label>",
      tests: [
        {
          id: "relief-meter-exists",
          kind: "exists",
          selector: "meter",
          label: "The water level has a meter",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Choose the block for a measured level, not work still underway.",
        },
      ],
      xp: 50,
    }),
    s9({
      id: "relief-meter-value",
      task: "Set the water level to 60.",
      inputMode: "guided",
      files: solved(RELIEF_METER_BODY),
      activeFile: "index.html",
      highlightToken: "<meter>",
      tests: [
        {
          id: "relief-meter-value-set",
          kind: "attr-equals",
          selector: "meter",
          attr: "value",
          value: "60",
          label: "The water level is 60",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Reuse the current-number setting in the opening meter tag.",
        },
        {
          level: 2,
          text: "Change <meter> to <meter value=\"60\">.",
        },
      ],
      xp: 40,
    }),
    s9({
      id: "relief-meter-max",
      task: "Set the full water level to 100.",
      inputMode: "guided",
      files: solved(RELIEF_METER_VALUE_BODY),
      activeFile: "index.html",
      highlightToken: '<meter value="60">',
      tests: [
        {
          id: "relief-meter-max-set",
          kind: "attr-equals",
          selector: "meter",
          attr: "max",
          value: "100",
          label: "The full level is 100",
        },
      ],
      hints: [
        {
          level: 1,
          text: "Reuse the total-goal setting in the opening meter tag.",
        },
        {
          level: 2,
          text: "Add max=\"100\" after value=\"60\".",
        },
      ],
      xp: 40,
    }),
    s10({
      id: "weather-picture",
      task: "Start a weather photo. Add a picture box.",
      inputMode: "tap-to-build",
      files: { "index.html": WEATHER_PICTURE_SLOT.page },
      activeFile: "index.html",
      slotLine: WEATHER_PICTURE_SLOT.slotLine,
      conceptIds: ["picture-element"],
      blocks: ["<picture></picture>", "<photo></photo>", "<image></image>", "<picture><picture>"],
      correctBlock: "<picture></picture>",
      tests: [{ id: "weather-picture-exists", kind: "exists", selector: "picture", label: "The photo has a picture box" }],
      hints: [{ level: 1, text: "Choose the tag that can hold different image choices." }],
      xp: 50,
    }),
    s10({
      id: "weather-source",
      task: "Add the small-screen photo source.",
      inputMode: "guided",
      files: solved(WEATHER_PICTURE_BODY),
      activeFile: "index.html",
      highlightToken: "</picture>",
      conceptIds: ["source-element"],
      tests: [{ id: "weather-source-exists", kind: "attr-equals", selector: "picture source", attr: "srcset", value: "rain-small.jpg", label: "The small photo source is set" }],
      hints: [
        { level: 1, text: "Add the image-choice tag inside the picture box." },
        { level: 2, text: "Type: <source srcset=\"rain-small.jpg\">" },
      ],
      xp: 50,
    }),
    s10({
      id: "weather-media",
      task: "Use the small photo below 600 pixels.",
      inputMode: "guided",
      files: solved(WEATHER_SOURCE_BODY),
      activeFile: "index.html",
      highlightToken: '<source srcset="rain-small.jpg">',
      conceptIds: ["media-attribute"],
      tests: [{ id: "weather-media-set", kind: "attr-equals", selector: "picture source", attr: "media", value: "(max-width: 600px)", label: "The small-screen rule is set" }],
      hints: [
        { level: 1, text: "Add a screen-size rule in the opening source tag." },
        { level: 2, text: "Add media=\"(max-width: 600px)\"." },
      ],
      xp: 50,
    }),
    s10({
      id: "weather-image",
      task: "Add the main weather photo with its description.",
      inputMode: "guided",
      files: solved(WEATHER_MEDIA_BODY),
      activeFile: "index.html",
      highlightToken: "</picture>",
      tests: [{ id: "weather-image-exists", kind: "attr-equals", selector: "picture img", attr: "alt", value: "Rain clouds over Barangay San Roque", label: "The main photo has a description" }],
      hints: [
        { level: 1, text: "Add the normal image inside picture after the small-screen choice." },
        { level: 2, text: "Type: <img src=\"rain.jpg\" alt=\"Rain clouds over Barangay San Roque\">" },
      ],
      xp: 40,
    }),
    s10({
      id: "weather-lazy",
      task: "Load the photo only when it is needed.",
      inputMode: "guided",
      files: solved(WEATHER_IMAGE_BODY),
      activeFile: "index.html",
      highlightToken: '<img src="rain.jpg" alt="Rain clouds over Barangay San Roque">',
      conceptIds: ["loading-attribute"],
      tests: [{ id: "weather-lazy-set", kind: "attr-equals", selector: "picture img", attr: "loading", value: "lazy", label: "The photo loads later" }],
      hints: [
        { level: 1, text: "Add the browser's delayed-loading setting in the image tag." },
        { level: 2, text: "Add loading=\"lazy\" before the closing angle bracket." },
      ],
      xp: 50,
    }),
    s11({
      id: "video-title",
      task: "Start a water notice video. Add its heading.",
      inputMode: "tap-to-build", files: { "index.html": VIDEO_TITLE_SLOT.page }, activeFile: "index.html", slotLine: VIDEO_TITLE_SLOT.slotLine,
      blocks: ["<h2></h2>", "<heading></heading>", "<title></title>", "<h2><h2>"], correctBlock: "<h2></h2>",
      tests: [{ id: "video-title-exists", kind: "exists", selector: "h2", label: "The notice has a heading" }],
      hints: [{ level: 1, text: "Choose the heading one level below the page title." }], xp: 40,
    }),
    s11({
      id: "video-heading",
      task: "Name the heading Water Service Notice.",
      inputMode: "guided", files: solved(VIDEO_TITLE_BODY), activeFile: "index.html", highlightToken: "</h2>",
      tests: [{ id: "video-heading-text", kind: "text-equals", selector: "h2", value: "Water Service Notice", label: "The notice has its name" }],
      hints: [{ level: 1, text: "Write the notice name inside the heading." }, { level: 2, text: "Type: Water Service Notice" }], xp: 40,
    }),
    s11({
      id: "video-player",
      task: "Add the video player below the heading.",
      inputMode: "tap-to-build", files: { "index.html": VIDEO_PLAYER_SLOT.page }, activeFile: "index.html", slotLine: VIDEO_PLAYER_SLOT.slotLine,
      conceptIds: ["video-element"], blocks: ["<video></video>", "<movie></movie>", "<media></media>", "<video><video>"], correctBlock: "<video></video>",
      tests: [{ id: "video-player-exists", kind: "exists", selector: "video", label: "The notice has a video player" }],
      hints: [{ level: 1, text: "Choose the real tag for playing a video." }], xp: 50,
    }),
    s11({
      id: "video-source",
      task: "Add the water notice video file.",
      inputMode: "guided", files: solved(VIDEO_PLAYER_BODY), activeFile: "index.html", highlightToken: "</video>",
      tests: [{ id: "video-source-set", kind: "attr-equals", selector: "video source", attr: "src", value: "water-notice.mp4", label: "The video file is set" }],
      hints: [{ level: 1, text: "Add an MP4 source inside the video box." }, { level: 2, text: "Type: <source src=\"water-notice.mp4\" type=\"video/mp4\">" }], xp: 40,
    }),
    s11({
      id: "video-controls",
      task: "Let people play and pause the notice.",
      inputMode: "guided", files: solved(VIDEO_SOURCE_BODY), activeFile: "index.html", highlightToken: "<video>", conceptIds: ["controls-attribute"],
      tests: [{ id: "video-controls-set", kind: "source-matches", file: "index.html", pattern: "<video\\s+controls>", label: "The video has controls", because: "The control setting is checked in the code." }],
      hints: [{ level: 1, text: "Add one setting in the opening video tag." }, { level: 2, text: "Change <video> to <video controls>." }], xp: 50,
    }),
    s11({
      id: "video-captions",
      task: "Add English captions to the notice.",
      inputMode: "guided", files: solved(VIDEO_CONTROLS_BODY), activeFile: "index.html", highlightToken: "</video>", conceptIds: ["track-element"],
      tests: [{ id: "video-captions-exist", kind: "attr-equals", selector: "video track", attr: "kind", value: "captions", label: "English captions are included" }],
      hints: [{ level: 1, text: "Add the text track inside the video box." }, { level: 2, text: "Type the captions track shown in the task." }], xp: 50,
    }),
    s11({
      id: "video-default-captions",
      task: "Show captions when the video starts.",
      inputMode: "guided", files: solved(VIDEO_CAPTIONS_BODY), activeFile: "index.html", highlightToken: 'label="English captions">', conceptIds: ["default-attribute"],
      tests: [{ id: "video-default-captions-set", kind: "source-matches", file: "index.html", pattern: "<track[^>]*\\sdefault>", label: "Captions start on", because: "The start setting is checked in the code." }],
      hints: [{ level: 1, text: "Add the start-on setting in the captions tag." }, { level: 2, text: "Add default before the closing angle bracket." }], xp: 50,
    }),
    s12({
      id: "audio-title",
      task: "Start a radio update. Add its heading.",
      inputMode: "tap-to-build", files: { "index.html": AUDIO_TITLE_SLOT.page }, activeFile: "index.html", slotLine: AUDIO_TITLE_SLOT.slotLine,
      blocks: ["<h2></h2>", "<heading></heading>", "<title></title>", "<h2><h2>"], correctBlock: "<h2></h2>",
      tests: [{ id: "audio-title-exists", kind: "exists", selector: "h2", label: "The update has a heading" }],
      hints: [{ level: 1, text: "Choose the heading one level below the page title." }], xp: 40,
    }),
    s12({
      id: "audio-heading",
      task: "Name the heading Barangay Radio Update.",
      inputMode: "guided", files: solved(AUDIO_TITLE_BODY), activeFile: "index.html", highlightToken: "</h2>",
      tests: [{ id: "audio-heading-text", kind: "text-equals", selector: "h2", value: "Barangay Radio Update", label: "The update has its name" }],
      hints: [{ level: 1, text: "Write the update name inside the heading." }, { level: 2, text: "Type: Barangay Radio Update" }], xp: 40,
    }),
    s12({
      id: "audio-player",
      task: "Add a player for the radio update.",
      inputMode: "tap-to-build", files: { "index.html": AUDIO_PLAYER_SLOT.page }, activeFile: "index.html", slotLine: AUDIO_PLAYER_SLOT.slotLine,
      conceptIds: ["audio-element"], blocks: ["<audio></audio>", "<sound></sound>", "<music></music>", "<audio><audio>"], correctBlock: "<audio></audio>",
      tests: [{ id: "audio-player-exists", kind: "exists", selector: "audio", label: "The update has a player" }],
      hints: [{ level: 1, text: "Choose the real tag for playing a sound." }], xp: 50,
    }),
    s12({
      id: "audio-source",
      task: "Add the radio update audio file.",
      inputMode: "guided", files: solved(AUDIO_PLAYER_BODY), activeFile: "index.html", highlightToken: "</audio>",
      tests: [{ id: "audio-source-set", kind: "attr-equals", selector: "audio source", attr: "src", value: "radio-update.mp3", label: "The audio file is set" }],
      hints: [{ level: 1, text: "Add an MP3 source inside the player." }, { level: 2, text: "Type: <source src=\"radio-update.mp3\" type=\"audio/mpeg\">" }], xp: 40,
    }),
    s12({
      id: "audio-controls",
      task: "Let people start and pause the update.",
      inputMode: "guided", files: solved(AUDIO_SOURCE_BODY), activeFile: "index.html", highlightToken: "<audio>", conceptIds: ["controls-attribute"],
      tests: [{ id: "audio-controls-set", kind: "source-matches", file: "index.html", pattern: "<audio\\s+controls>", label: "The audio has controls", because: "The control setting is checked in the code." }],
      hints: [{ level: 1, text: "Add one setting in the opening player tag." }, { level: 2, text: "Change <audio> to <audio controls>." }], xp: 50,
    }),
    s12({
      id: "audio-preload",
      task: "Load only the audio details first.",
      inputMode: "guided", files: solved(AUDIO_CONTROLS_BODY), activeFile: "index.html", highlightToken: "<audio controls>", conceptIds: ["preload-attribute"],
      tests: [{ id: "audio-preload-set", kind: "attr-equals", selector: "audio", attr: "preload", value: "metadata", label: "Only details load first" }],
      hints: [{ level: 1, text: "Add the browser setting for file details in the player tag." }, { level: 2, text: "Add preload=\"metadata\" after controls." }], xp: 50,
    }),
    s12({
      id: "audio-transcript",
      task: "Add the update words below the player.",
      inputMode: "guided", files: solved(AUDIO_PRELOAD_BODY), activeFile: "index.html", highlightToken: "</audio>",
      tests: [{ id: "audio-transcript-text", kind: "text-equals", selector: "p", value: "Water service returns at 1pm today.", label: "The update words are readable" }],
      hints: [{ level: 1, text: "Add one sentence after the player." }, { level: 2, text: "Type: Water service returns at 1pm today." }], xp: 40,
    }),
    s13({
      id: "search-title",
      task: "Start a jeepney stop search. Add its heading.",
      inputMode: "tap-to-build", files: { "index.html": SEARCH_TITLE_SLOT.page }, activeFile: "index.html", slotLine: SEARCH_TITLE_SLOT.slotLine,
      blocks: ["<h2></h2>", "<heading></heading>", "<title></title>", "<h2><h2>"], correctBlock: "<h2></h2>",
      tests: [{ id: "search-title-exists", kind: "exists", selector: "h2", label: "The search has a heading" }],
      hints: [{ level: 1, text: "Choose the heading one level below the page title." }], xp: 40,
    }),
    s13({
      id: "search-heading",
      task: "Name the heading Jeepney Stop Search.",
      inputMode: "guided", files: solved(SEARCH_TITLE_BODY), activeFile: "index.html", highlightToken: "</h2>",
      tests: [{ id: "search-heading-text", kind: "text-equals", selector: "h2", value: "Jeepney Stop Search", label: "The search has its name" }],
      hints: [{ level: 1, text: "Write the search name inside the heading." }, { level: 2, text: "Type: Jeepney Stop Search" }], xp: 40,
    }),
    s13({
      id: "search-label",
      task: "Add words that name the stop box.",
      inputMode: "guided", files: solved(SEARCH_HEADING_BODY), activeFile: "index.html", highlightToken: "</h2>",
      tests: [{ id: "search-label-exists", kind: "text-equals", selector: "label", value: "Choose a stop", label: "The box has a name" }],
      hints: [{ level: 1, text: "Add a label after the heading." }, { level: 2, text: "Type: <label for=\"stop\">Choose a stop</label>" }], xp: 40,
    }),
    s13({
      id: "search-input",
      task: "Add the box for a stop name.",
      inputMode: "guided", files: solved(SEARCH_LABEL_BODY), activeFile: "index.html", highlightToken: "</label>",
      tests: [{ id: "search-input-exists", kind: "attr-equals", selector: "input", attr: "id", value: "stop", label: "The stop box is ready" }],
      hints: [{ level: 1, text: "Add an input after the label." }, { level: 2, text: "Type: <input id=\"stop\">" }], xp: 40,
    }),
    s13({
      id: "search-list",
      task: "Connect the box to its stop choices.",
      inputMode: "guided", files: solved(SEARCH_INPUT_BODY), activeFile: "index.html", highlightToken: '<input id="stop">', conceptIds: ["list-attribute"],
      tests: [{ id: "search-list-set", kind: "attr-equals", selector: "input", attr: "list", value: "stops", label: "The box knows its choices" }],
      hints: [{ level: 1, text: "Add the choices name in the opening box tag." }, { level: 2, text: "Add list=\"stops\" after the id." }], xp: 50,
    }),
    s13({
      id: "search-datalist",
      task: "Add the box that holds stop choices.",
      inputMode: "tap-to-build", files: { "index.html": SEARCH_DATALIST_SLOT.page }, activeFile: "index.html", slotLine: SEARCH_DATALIST_SLOT.slotLine,
      conceptIds: ["datalist-element"], blocks: ["<datalist id=\"stops\"></datalist>", "<list id=\"stops\"></list>", "<options id=\"stops\"></options>", "<datalist id=\"stop\"></datalist>"], correctBlock: "<datalist id=\"stops\"></datalist>",
      tests: [{ id: "search-datalist-exists", kind: "attr-equals", selector: "datalist", attr: "id", value: "stops", label: "The choices box is ready" }],
      hints: [{ level: 1, text: "Choose the native box for input suggestions." }], xp: 50,
    }),
    s13({
      id: "search-palengke",
      task: "Add Palengke as the first stop choice.",
      inputMode: "guided", files: solved(SEARCH_DATALIST_BODY), activeFile: "index.html", highlightToken: "</datalist>",
      tests: [{ id: "search-palengke-option", kind: "attr-equals", selector: "datalist option", attr: "value", value: "Palengke", label: "Palengke is a choice" }],
      hints: [{ level: 1, text: "Add one choice inside the suggestions box." }, { level: 2, text: "Type: <option value=\"Palengke\">" }], xp: 40,
    }),
    s13({
      id: "search-terminal",
      task: "Add Terminal as the next stop choice.",
      inputMode: "guided", files: solved(SEARCH_FIRST_STOP_BODY), activeFile: "index.html", highlightToken: "</datalist>",
      tests: [{ id: "search-terminal-option", kind: "attr-equals", selector: "datalist option:last-of-type", attr: "value", value: "Terminal", label: "Terminal is a choice" }],
      hints: [{ level: 1, text: "Add another choice under Palengke." }, { level: 2, text: "Type: <option value=\"Terminal\">" }], xp: 40,
    }),
    s13({
      id: "search-city-hall",
      task: "Add City Hall as the last stop choice.",
      inputMode: "guided", files: solved(SEARCH_SECOND_STOP_BODY), activeFile: "index.html", highlightToken: "</datalist>",
      tests: [{ id: "search-city-hall-option", kind: "attr-equals", selector: "datalist option:last-of-type", attr: "value", value: "City Hall", label: "City Hall is a choice" }],
      hints: [{ level: 1, text: "Add one last choice under Terminal." }, { level: 2, text: "Type: <option value=\"City Hall\">" }], xp: 40,
    }),
    s14({
      id: "contact-title",
      task: "Start a help contacts page. Add its heading.",
      inputMode: "tap-to-build", files: { "index.html": CONTACT_TITLE_SLOT.page }, activeFile: "index.html", slotLine: CONTACT_TITLE_SLOT.slotLine,
      blocks: ["<h2></h2>", "<heading></heading>", "<title></title>", "<h2><h2>"], correctBlock: "<h2></h2>",
      tests: [{ id: "contact-title-exists", kind: "exists", selector: "h2", label: "The page has a heading" }],
      hints: [{ level: 1, text: "Choose the heading one level below the page title." }], xp: 40,
    }),
    s14({
      id: "contact-heading",
      task: "Name the heading Barangay Help Contacts.",
      inputMode: "guided", files: solved(CONTACT_TITLE_BODY), activeFile: "index.html", highlightToken: "</h2>",
      tests: [{ id: "contact-heading-text", kind: "text-equals", selector: "h2", value: "Barangay Help Contacts", label: "The page has its name" }],
      hints: [{ level: 1, text: "Write the page name inside the heading." }, { level: 2, text: "Type: Barangay Help Contacts" }], xp: 40,
    }),
    s14({
      id: "contact-copy",
      task: "Add a short help message.",
      inputMode: "guided", files: solved(CONTACT_HEADING_BODY), activeFile: "index.html", highlightToken: "</h2>",
      tests: [{ id: "contact-copy-text", kind: "text-equals", selector: "p", value: "Need help? Contact Barangay San Roque.", label: "The help message is there" }],
      hints: [{ level: 1, text: "Add one paragraph after the heading." }, { level: 2, text: "Type: Need help? Contact Barangay San Roque." }], xp: 40,
    }),
    s14({
      id: "contact-phone",
      task: "Add a link for the phone number.",
      inputMode: "tap-to-build", files: { "index.html": CONTACT_PHONE_SLOT.page }, activeFile: "index.html", slotLine: CONTACT_PHONE_SLOT.slotLine,
      blocks: ["<a></a>", "<link></link>", "<phone></phone>", "<a><a>"], correctBlock: "<a></a>",
      tests: [{ id: "contact-phone-exists", kind: "exists", selector: "a", label: "The phone link is ready" }],
      hints: [{ level: 1, text: "Choose the real tag for a link." }], xp: 40,
    }),
    s14({
      id: "contact-phone-link",
      task: "Make the link call 117.",
      inputMode: "guided", files: solved(CONTACT_PHONE_BODY), activeFile: "index.html", highlightToken: 'href=""', conceptIds: ["telephone-link"],
      tests: [{ id: "contact-phone-link-set", kind: "attr-equals", selector: "a", attr: "href", value: "tel:117", label: "The phone number is linked" }],
      hints: [{ level: 1, text: "Put the calling address in the opening link tag." }, { level: 2, text: "Change href=\"\" to href=\"tel:117\"." }], xp: 50,
    }),
    s14({
      id: "contact-phone-text",
      task: "Name the phone link Call 117.",
      inputMode: "guided", files: solved(CONTACT_PHONE_LINK_BODY), activeFile: "index.html", highlightToken: "></a>",
      tests: [{ id: "contact-phone-text-set", kind: "text-equals", selector: "a", value: "Call 117", label: "The phone link has words" }],
      hints: [{ level: 1, text: "Write the call words inside the link." }, { level: 2, text: "Type: Call 117" }], xp: 40,
    }),
    s14({
      id: "contact-email",
      task: "Add a second link for email.",
      inputMode: "tap-to-build", files: { "index.html": CONTACT_EMAIL_SLOT.page }, activeFile: "index.html", slotLine: CONTACT_EMAIL_SLOT.slotLine,
      blocks: ["<a></a>", "<link></link>", "<email></email>", "<a><a>"], correctBlock: "<a></a>",
      tests: [{ id: "contact-email-exists", kind: "count", selector: "a", atLeast: 2, label: "The email link is ready" }],
      hints: [{ level: 1, text: "Choose another real link tag." }], xp: 40,
    }),
    s14({
      id: "contact-email-link",
      task: "Make the second link open an email.",
      inputMode: "guided", files: solved(CONTACT_EMAIL_BODY), activeFile: "index.html", highlightToken: 'href=""', conceptIds: ["mailto-link"],
      tests: [{ id: "contact-email-link-set", kind: "attr-equals", selector: "a:last-of-type", attr: "href", value: "mailto:help@barangay.example", label: "The email address is linked" }],
      hints: [{ level: 1, text: "Put the email address in the second opening link tag." }, { level: 2, text: "Use mailto:help@barangay.example in href." }], xp: 50,
    }),
    s14({
      id: "contact-email-text",
      task: "Name the email link clearly.",
      inputMode: "guided", files: solved(CONTACT_EMAIL_LINK_BODY), activeFile: "index.html", highlightToken: "></a>",
      tests: [{ id: "contact-email-text-set", kind: "text-equals", selector: "a:last-of-type", value: "Email the barangay", label: "The email link has words" }],
      hints: [{ level: 1, text: "Write clear email words inside the second link." }, { level: 2, text: "Type: Email the barangay" }], xp: 40,
    }),
    s15({
      id: "download-title",
      task: "Start a bulletin page. Add its heading.",
      inputMode: "tap-to-build", files: { "index.html": DOWNLOAD_TITLE_SLOT.page }, activeFile: "index.html", slotLine: DOWNLOAD_TITLE_SLOT.slotLine,
      blocks: ["<h2></h2>", "<heading></heading>", "<title></title>", "<h2><h2>"], correctBlock: "<h2></h2>",
      tests: [{ id: "download-title-exists", kind: "exists", selector: "h2", label: "The bulletin has a heading" }],
      hints: [{ level: 1, text: "Choose the heading one level below the page title." }], xp: 40,
    }),
    s15({
      id: "download-heading",
      task: "Name the heading Barangay Bulletin.",
      inputMode: "guided", files: solved(DOWNLOAD_TITLE_BODY), activeFile: "index.html", highlightToken: "</h2>",
      tests: [{ id: "download-heading-text", kind: "text-equals", selector: "h2", value: "Barangay Bulletin", label: "The bulletin has its name" }],
      hints: [{ level: 1, text: "Write the bulletin name inside the heading." }, { level: 2, text: "Type: Barangay Bulletin" }], xp: 40,
    }),
    s15({
      id: "download-copy",
      task: "Add a short update message.",
      inputMode: "guided", files: solved(DOWNLOAD_HEADING_BODY), activeFile: "index.html", highlightToken: "</h2>",
      tests: [{ id: "download-copy-text", kind: "text-equals", selector: "p", value: "Read today's service updates.", label: "The update message is there" }],
      hints: [{ level: 1, text: "Add one paragraph after the heading." }, { level: 2, text: "Type: Read today's service updates." }], xp: 40,
    }),
    s15({
      id: "download-link",
      task: "Add a link for the bulletin file.",
      inputMode: "tap-to-build", files: { "index.html": DOWNLOAD_LINK_SLOT.page }, activeFile: "index.html", slotLine: DOWNLOAD_LINK_SLOT.slotLine,
      blocks: ["<a></a>", "<link></link>", "<file></file>", "<a><a>"], correctBlock: "<a></a>",
      tests: [{ id: "download-link-exists", kind: "exists", selector: "a", label: "The bulletin link is ready" }],
      hints: [{ level: 1, text: "Choose the real tag for a link." }], xp: 40,
    }),
    s15({
      id: "download-href",
      task: "Link to the bulletin PDF file.",
      inputMode: "guided", files: solved(DOWNLOAD_LINK_BODY), activeFile: "index.html", highlightToken: 'href=""',
      tests: [{ id: "download-href-set", kind: "attr-equals", selector: "a", attr: "href", value: "barangay-bulletin.pdf", label: "The PDF file is linked" }],
      hints: [{ level: 1, text: "Put the PDF file name in the opening link tag." }, { level: 2, text: "Use barangay-bulletin.pdf in href." }], xp: 40,
    }),
    s15({
      id: "download-text",
      task: "Name the link Download today's bulletin.",
      inputMode: "guided", files: solved(DOWNLOAD_HREF_BODY), activeFile: "index.html", highlightToken: "></a>",
      tests: [{ id: "download-text-set", kind: "text-equals", selector: "a", value: "Download today's bulletin", label: "The link has clear words" }],
      hints: [{ level: 1, text: "Write the download words inside the link." }, { level: 2, text: "Type: Download today's bulletin" }], xp: 40,
    }),
    s15({
      id: "download-attribute",
      task: "Ask the browser to save the bulletin file.",
      inputMode: "guided", files: solved(DOWNLOAD_TEXT_BODY), activeFile: "index.html", highlightToken: 'href="barangay-bulletin.pdf"', conceptIds: ["download-attribute"],
      tests: [{ id: "download-attribute-set", kind: "source-matches", file: "index.html", pattern: '<a\\s+href="barangay-bulletin\\.pdf"\\s+download>', label: "The bulletin can be saved", because: "The save setting is checked in the code." }],
      hints: [{ level: 1, text: "Add the save setting in the opening link tag." }, { level: 2, text: "Add download after the file address." }], xp: 50,
    }),
    s16({ id: "tip-title", task: "Start a safety tip. Add its heading.", inputMode: "tap-to-build", files: { "index.html": TIP_TITLE_SLOT.page }, activeFile: "index.html", slotLine: TIP_TITLE_SLOT.slotLine, blocks: ["<h2></h2>", "<heading></heading>", "<title></title>", "<h2><h2>"], correctBlock: "<h2></h2>", tests: [{ id: "tip-title-exists", kind: "exists", selector: "h2", label: "The tip has a heading" }], hints: [{ level: 1, text: "Choose the heading one level below the page title." }], xp: 40 }),
    s16({ id: "tip-heading", task: "Name the heading Barangay Safety Tip.", inputMode: "guided", files: solved(TIP_TITLE_BODY), activeFile: "index.html", highlightToken: "</h2>", tests: [{ id: "tip-heading-text", kind: "text-equals", selector: "h2", value: "Barangay Safety Tip", label: "The tip has its name" }], hints: [{ level: 1, text: "Write the tip name inside the heading." }, { level: 2, text: "Type: Barangay Safety Tip" }], xp: 40 }),
    s16({ id: "tip-aside", task: "Add a box for the safety tip.", inputMode: "tap-to-build", files: { "index.html": TIP_ASIDE_SLOT.page }, activeFile: "index.html", slotLine: TIP_ASIDE_SLOT.slotLine, conceptIds: ["aside-element"], blocks: ["<aside></aside>", "<tip></tip>", "<note></note>", "<aside><aside>"], correctBlock: "<aside></aside>", tests: [{ id: "tip-aside-exists", kind: "exists", selector: "aside", label: "The tip box is ready" }], hints: [{ level: 1, text: "Choose the tag for related information beside main content." }], xp: 50 }),
    s16({ id: "tip-copy", task: "Add the phone-charging safety tip.", inputMode: "guided", files: solved(TIP_ASIDE_BODY), activeFile: "index.html", highlightToken: "</aside>", tests: [{ id: "tip-copy-text", kind: "text-equals", selector: "aside p", value: "Keep your phone charged during heavy rain.", label: "The safety tip is readable" }], hints: [{ level: 1, text: "Add one paragraph inside the tip box." }, { level: 2, text: "Type: Keep your phone charged during heavy rain." }], xp: 40 }),
    s16({ id: "tip-urgent", task: "Mark heavy rain in the tip.", inputMode: "guided", files: solved(TIP_COPY_BODY), activeFile: "index.html", highlightToken: "heavy rain", tests: [{ id: "tip-urgent-marked", kind: "text-equals", selector: "aside mark", value: "heavy rain", label: "Heavy rain is marked" }], hints: [{ level: 1, text: "Wrap the urgent weather words in the highlight tag." }, { level: 2, text: "Use <mark>heavy rain</mark>." }], xp: 40 }),
    s16({ id: "tip-note", task: "Add a short emergency note.", inputMode: "guided", files: solved(TIP_URGENT_BODY), activeFile: "index.html", highlightToken: "</aside>", tests: [{ id: "tip-note-text", kind: "text-equals", selector: "aside small", value: "Call 117 for urgent help.", label: "The emergency note is there" }], hints: [{ level: 1, text: "Add a small note inside the tip box." }, { level: 2, text: "Type: Call 117 for urgent help." }], xp: 40 }),
    s17({ id: "hours-title", task: "Start office hours. Add its heading.", inputMode: "tap-to-build", files: { "index.html": HOURS_TITLE_SLOT.page }, activeFile: "index.html", slotLine: HOURS_TITLE_SLOT.slotLine, blocks: ["<h2></h2>", "<heading></heading>", "<title></title>", "<h2><h2>"], correctBlock: "<h2></h2>", tests: [{ id: "hours-title-exists", kind: "exists", selector: "h2", label: "The hours have a heading" }], hints: [{ level: 1, text: "Choose the heading one level below the page title." }], xp: 40 }),
    s17({ id: "hours-heading", task: "Name the heading Barangay Office Hours.", inputMode: "guided", files: solved(HOURS_TITLE_BODY), activeFile: "index.html", highlightToken: "</h2>", tests: [{ id: "hours-heading-text", kind: "text-equals", selector: "h2", value: "Barangay Office Hours", label: "The hours have a name" }], hints: [{ level: 1, text: "Write the page name inside the heading." }, { level: 2, text: "Type: Barangay Office Hours" }], xp: 40 }),
    s17({ id: "hours-copy", task: "Add the opening-time message.", inputMode: "guided", files: solved(HOURS_HEADING_BODY), activeFile: "index.html", highlightToken: "</h2>", tests: [{ id: "hours-copy-text", kind: "text-equals", selector: "p", value: "Office opens at 8am.", label: "The opening time is clear" }], hints: [{ level: 1, text: "Add one paragraph after the heading." }, { level: 2, text: "Type: Office opens at 8am." }], xp: 40 }),
    s17({ id: "hours-time", task: "Add a time box for the weekly hours.", inputMode: "tap-to-build", files: { "index.html": HOURS_TIME_SLOT.page }, activeFile: "index.html", slotLine: HOURS_TIME_SLOT.slotLine, blocks: ["<time></time>", "<hours></hours>", "<schedule></schedule>", "<time><time>"], correctBlock: "<time></time>", tests: [{ id: "hours-time-exists", kind: "exists", selector: "time", label: "The weekly time box is ready" }], hints: [{ level: 1, text: "Choose the tag for a date or time." }], xp: 40 }),
    s17({ id: "hours-time-text", task: "Write the weekday office hours.", inputMode: "guided", files: solved(HOURS_TIME_BODY), activeFile: "index.html", highlightToken: "</time>", tests: [{ id: "hours-time-text-set", kind: "text-equals", selector: "time", value: "Monday to Friday, 8am to 5pm", label: "The weekly hours are clear" }], hints: [{ level: 1, text: "Write the weekday schedule inside the time box." }, { level: 2, text: "Type: Monday to Friday, 8am to 5pm" }], xp: 40 }),
    s17({ id: "hours-datetime", task: "Set the opening time to 08:00.", inputMode: "guided", files: solved(HOURS_TIME_TEXT_BODY), activeFile: "index.html", highlightToken: "<time>", tests: [{ id: "hours-datetime-set", kind: "attr-equals", selector: "time", attr: "datetime", value: "08:00", label: "The opening time is set" }], hints: [{ level: 1, text: "Add the machine time in the opening box tag." }, { level: 2, text: "Change <time> to <time datetime=\"08:00\">." }], xp: 40 }),
    s17({ id: "hours-note", task: "Add the holiday closing note.", inputMode: "guided", files: solved(HOURS_DATETIME_BODY), activeFile: "index.html", highlightToken: "</time>", tests: [{ id: "hours-note-set", kind: "text-equals", selector: "small", value: "Closed on public holidays.", label: "The holiday note is there" }], hints: [{ level: 1, text: "Add a small note after the weekly time." }, { level: 2, text: "Type: Closed on public holidays." }], xp: 40 }),
    s18({ id: "price-title", task: "Start a price label. Add its heading.", inputMode: "tap-to-build", files: { "index.html": PRICE_TITLE_SLOT.page }, activeFile: "index.html", slotLine: PRICE_TITLE_SLOT.slotLine, blocks: ["<h2></h2>", "<heading></heading>", "<title></title>", "<h2><h2>"], correctBlock: "<h2></h2>", tests: [{ id: "price-title-exists", kind: "exists", selector: "h2", label: "The label has a heading" }], hints: [{ level: 1, text: "Choose the heading one level below the page title." }], xp: 40 }),
    s18({ id: "price-heading", task: "Name the heading Palengke Price Label.", inputMode: "guided", files: solved(PRICE_TITLE_BODY), activeFile: "index.html", highlightToken: "</h2>", tests: [{ id: "price-heading-text", kind: "text-equals", selector: "h2", value: "Palengke Price Label", label: "The label has its name" }], hints: [{ level: 1, text: "Write the label name inside the heading." }, { level: 2, text: "Type: Palengke Price Label" }], xp: 40 }),
    s18({ id: "price-copy", task: "Add the rice price message.", inputMode: "guided", files: solved(PRICE_HEADING_BODY), activeFile: "index.html", highlightToken: "</h2>", tests: [{ id: "price-copy-text", kind: "text-equals", selector: "p", value: "Rice price today:", label: "The price message is there" }], hints: [{ level: 1, text: "Add one paragraph after the heading." }, { level: 2, text: "Type: Rice price today:" }], xp: 40 }),
    s18({ id: "price-data", task: "Add a box for the rice price.", inputMode: "tap-to-build", files: { "index.html": PRICE_DATA_SLOT.page }, activeFile: "index.html", slotLine: PRICE_DATA_SLOT.slotLine, conceptIds: ["data-element"], blocks: ["<data></data>", "<price></price>", "<value></value>", "<data><data>"], correctBlock: "<data></data>", tests: [{ id: "price-data-exists", kind: "exists", selector: "data", label: "The price box is ready" }], hints: [{ level: 1, text: "Choose the tag for a value that computers can read." }], xp: 50 }),
    s18({ id: "price-text", task: "Write PHP 58 in the price box.", inputMode: "guided", files: solved(PRICE_DATA_BODY), activeFile: "index.html", highlightToken: "</data>", tests: [{ id: "price-text-set", kind: "text-equals", selector: "data", value: "PHP 58", label: "The price is clear" }], hints: [{ level: 1, text: "Write the price inside the data box." }, { level: 2, text: "Type: PHP 58" }], xp: 40 }),
    s18({ id: "price-value", task: "Set the machine price to 58.", inputMode: "guided", files: solved(PRICE_TEXT_BODY), activeFile: "index.html", highlightToken: "<data>", tests: [{ id: "price-value-set", kind: "attr-equals", selector: "data", attr: "value", value: "58", label: "The machine price is set" }], hints: [{ level: 1, text: "Add the number in the opening price box tag." }, { level: 2, text: "Change <data> to <data value=\"58\">." }], xp: 40 }),
    s18({ id: "price-note", task: "Add the per-kilo note.", inputMode: "guided", files: solved(PRICE_VALUE_BODY), activeFile: "index.html", highlightToken: "</data>", tests: [{ id: "price-note-set", kind: "text-equals", selector: "small", value: "Per kilo", label: "The unit note is there" }], hints: [{ level: 1, text: "Add a small note after the price." }, { level: 2, text: "Type: Per kilo" }], xp: 40 }),
    s19({ id: "alert-dialog", task: "Start an emergency alert. Add its dialog box.", inputMode: "tap-to-build", files: { "index.html": ALERT_DIALOG_SLOT.page }, activeFile: "index.html", slotLine: ALERT_DIALOG_SLOT.slotLine, conceptIds: ["dialog-element"], blocks: ["<dialog></dialog>", "<alert></alert>", "<popup></popup>", "<dialog><dialog>"], correctBlock: "<dialog></dialog>", tests: [{ id: "alert-dialog-exists", kind: "exists", selector: "dialog", label: "The alert box is ready" }], hints: [{ level: 1, text: "Choose the built-in box for an important message." }], xp: 50 }),
    s19({ id: "alert-heading", task: "Add a title inside the alert.", inputMode: "guided", files: solved(ALERT_DIALOG_BODY), activeFile: "index.html", highlightToken: "</dialog>", tests: [{ id: "alert-heading-exists", kind: "exists", selector: "dialog h2", label: "The alert has a title" }], hints: [{ level: 1, text: "Put a heading inside the alert box." }, { level: 2, text: "Add <h2></h2> inside the box." }], xp: 40 }),
    s19({ id: "alert-heading-text", task: "Name the alert Flood Warning.", inputMode: "guided", files: solved(ALERT_HEADING_BODY), activeFile: "index.html", highlightToken: "</h2>", tests: [{ id: "alert-heading-text-set", kind: "text-equals", selector: "dialog h2", value: "Flood Warning", label: "The alert has its name" }], hints: [{ level: 1, text: "Write the warning name inside the heading." }, { level: 2, text: "Type: Flood Warning" }], xp: 40 }),
    s19({ id: "alert-copy", task: "Add the evacuation message.", inputMode: "guided", files: solved(ALERT_HEADING_TEXT_BODY), activeFile: "index.html", highlightToken: "</dialog>", tests: [{ id: "alert-copy-set", kind: "text-equals", selector: "dialog p", value: "Evacuate to Barangay Hall now.", label: "The evacuation message is clear" }], hints: [{ level: 1, text: "Add one paragraph below the heading." }, { level: 2, text: "Type the evacuation message." }], xp: 40 }),
    s19({ id: "alert-open", task: "Show the alert when the page opens.", inputMode: "guided", files: solved(ALERT_COPY_BODY), activeFile: "index.html", highlightToken: "<dialog>", tests: [{ id: "alert-open-set", kind: "source-matches", file: "index.html", pattern: "<dialog\\s+open>", label: "The alert starts shown", because: "The show setting is checked in the code." }], hints: [{ level: 1, text: "Add the show setting in the alert opening tag." }, { level: 2, text: "Change <dialog> to <dialog open>." }], xp: 40 }),
    s19({ id: "alert-note", task: "Add a short note below the alert.", inputMode: "guided", files: solved(ALERT_OPEN_BODY), activeFile: "index.html", highlightToken: "</dialog>", tests: [{ id: "alert-note-set", kind: "text-equals", selector: "small", value: "This alert is shown for this example.", label: "The example note is there" }], hints: [{ level: 1, text: "Add a small note after the alert box." }, { level: 2, text: "Type the example note." }], xp: 40 }),
    s20({ id: "service-search", task: "Start a service search. Add its search area.", inputMode: "tap-to-build", files: { "index.html": SERVICE_SEARCH_SLOT.page }, activeFile: "index.html", slotLine: SERVICE_SEARCH_SLOT.slotLine, conceptIds: ["search-element"], blocks: ["<search></search>", "<find></find>", "<lookup></lookup>", "<search><search>"], correctBlock: "<search></search>", tests: [{ id: "service-search-exists", kind: "exists", selector: "search", label: "The search area is ready" }], hints: [{ level: 1, text: "Choose the page area made for finding things." }], xp: 50 }),
    s20({ id: "service-heading", task: "Add a title inside the search area.", inputMode: "guided", files: solved(SERVICE_SEARCH_BODY), activeFile: "index.html", highlightToken: "</search>", tests: [{ id: "service-heading-exists", kind: "exists", selector: "search h2", label: "The search has a title" }], hints: [{ level: 1, text: "Put a heading inside the search area." }, { level: 2, text: "Add <h2></h2> inside the area." }], xp: 40 }),
    s20({ id: "service-heading-text", task: "Name the search Barangay Service Search.", inputMode: "guided", files: solved(SERVICE_HEADING_BODY), activeFile: "index.html", highlightToken: "</h2>", tests: [{ id: "service-heading-text-set", kind: "text-equals", selector: "search h2", value: "Barangay Service Search", label: "The search has its name" }], hints: [{ level: 1, text: "Write the search name inside the heading." }, { level: 2, text: "Type the search name." }], xp: 40 }),
    s20({ id: "service-form", task: "Add a form inside the search area.", inputMode: "tap-to-build", files: { "index.html": SERVICE_FORM_SLOT.page }, activeFile: "index.html", slotLine: SERVICE_FORM_SLOT.slotLine, blocks: ["<form></form>", "<input></input>", "<search-form></search-form>", "<form><form>"], correctBlock: "<form></form>", tests: [{ id: "service-form-exists", kind: "exists", selector: "search form", label: "The search form is ready" }], hints: [{ level: 1, text: "Choose the tag that groups form controls." }], xp: 40 }),
    s20({ id: "service-label", task: "Name the search box Find a service.", inputMode: "guided", files: solved(SERVICE_FORM_BODY), activeFile: "index.html", highlightToken: "</form>", tests: [{ id: "service-label-set", kind: "text-equals", selector: "search label", value: "Find a service", label: "The search box has a name" }], hints: [{ level: 1, text: "Add a label inside the form." }, { level: 2, text: "Name it Find a service." }], xp: 40 }),
    s20({ id: "service-input", task: "Add a search box for the service name.", inputMode: "guided", files: solved(SERVICE_LABEL_BODY), activeFile: "index.html", highlightToken: "</form>", conceptIds: ["search-input"], tests: [{ id: "service-input-type", kind: "attr-equals", selector: "search input", attr: "type", value: "search", label: "The search box is ready" }, { id: "service-input-id", kind: "attr-equals", selector: "search input", attr: "id", value: "service", label: "The search box is linked" }], hints: [{ level: 1, text: "Add an input below its label." }, { level: 2, text: "Use a search input named service." }], xp: 50 }),
    s20({ id: "service-placeholder", task: "Show Health center as a search hint.", inputMode: "guided", files: solved(SERVICE_INPUT_BODY), activeFile: "index.html", highlightToken: 'id="service"', tests: [{ id: "service-placeholder-set", kind: "attr-equals", selector: "search input", attr: "placeholder", value: "Health center", label: "The search hint is there" }], hints: [{ level: 1, text: "Add the example words in the input opening tag." }, { level: 2, text: "Use Health center as the hint." }], xp: 40 }),
    s20({ id: "service-name", task: "Name the search value service.", inputMode: "guided", files: solved(SERVICE_PLACEHOLDER_BODY), activeFile: "index.html", highlightToken: 'id="service"', tests: [{ id: "service-name-set", kind: "attr-equals", selector: "search input", attr: "name", value: "service", label: "The search value has a name" }], hints: [{ level: 1, text: "Add the field name in the input opening tag." }, { level: 2, text: "Use service as the field name." }], xp: 40 }),
    s21({ id: "meal-title", task: "Start a meal picker. Add its heading.", inputMode: "tap-to-build", files: { "index.html": MEAL_TITLE_SLOT.page }, activeFile: "index.html", slotLine: MEAL_TITLE_SLOT.slotLine, blocks: ["<h2></h2>", "<heading></heading>", "<title></title>", "<h2><h2>"], correctBlock: "<h2></h2>", tests: [{ id: "meal-title-exists", kind: "exists", selector: "h2", label: "The picker has a heading" }], hints: [{ level: 1, text: "Choose the heading one level below a page title." }], xp: 40 }),
    s21({ id: "meal-heading", task: "Name the heading Choose a Meal.", inputMode: "guided", files: solved(MEAL_TITLE_BODY), activeFile: "index.html", highlightToken: "</h2>", tests: [{ id: "meal-heading-set", kind: "text-equals", selector: "h2", value: "Choose a Meal", label: "The picker has its name" }], hints: [{ level: 1, text: "Write the picker name inside the heading." }, { level: 2, text: "Type: Choose a Meal" }], xp: 40 }),
    s21({ id: "meal-select", task: "Add a box for meal choices.", inputMode: "tap-to-build", files: { "index.html": MEAL_SELECT_SLOT.page }, activeFile: "index.html", slotLine: MEAL_SELECT_SLOT.slotLine, blocks: ["<select></select>", "<choices></choices>", "<menu></menu>", "<select><select>"], correctBlock: "<select></select>", tests: [{ id: "meal-select-exists", kind: "exists", selector: "select", label: "The choices box is ready" }], hints: [{ level: 1, text: "Choose the box that holds a list of choices." }], xp: 40 }),
    s21({ id: "meal-group", task: "Group the main dishes together.", inputMode: "tap-to-build", files: { "index.html": MEAL_GROUP_SLOT.page }, activeFile: "index.html", slotLine: MEAL_GROUP_SLOT.slotLine, conceptIds: ["optgroup-element"], blocks: ["<optgroup></optgroup>", "<group></group>", "<options></options>", "<optgroup><optgroup>"], correctBlock: "<optgroup></optgroup>", tests: [{ id: "meal-group-exists", kind: "exists", selector: "select optgroup", label: "The meal group is ready" }], hints: [{ level: 1, text: "Choose the tag that groups related choices." }], xp: 50 }),
    s21({ id: "meal-group-label", task: "Name the group Main dishes.", inputMode: "guided", files: solved(MEAL_GROUP_BODY), activeFile: "index.html", highlightToken: "<optgroup>", tests: [{ id: "meal-group-label-set", kind: "attr-equals", selector: "select optgroup", attr: "label", value: "Main dishes", label: "The meal group has a name" }], hints: [{ level: 1, text: "Add the group name in its opening tag." }, { level: 2, text: "Use Main dishes as the group name." }], xp: 40 }),
    s21({ id: "meal-adobo", task: "Add Adobo as a meal choice.", inputMode: "guided", files: solved(MEAL_GROUP_LABEL_BODY), activeFile: "index.html", highlightToken: "</optgroup>", tests: [{ id: "meal-adobo-set", kind: "text-equals", selector: "select option", value: "Adobo", label: "Adobo is a choice" }], hints: [{ level: 1, text: "Add one choice inside the meal group." }, { level: 2, text: "Use Adobo as its words." }], xp: 40 }),
    s21({ id: "meal-sinigang", task: "Add Sinigang as another meal choice.", inputMode: "guided", files: solved(MEAL_ADOBO_BODY), activeFile: "index.html", highlightToken: "</optgroup>", tests: [{ id: "meal-sinigang-set", kind: "text-equals", selector: "select option:last-of-type", value: "Sinigang", label: "Sinigang is a choice" }], hints: [{ level: 1, text: "Add one more choice below Adobo." }, { level: 2, text: "Use Sinigang as its words." }], xp: 40 }),
    s22({ id: "market-table", task: "Start a price board. Add its table.", inputMode: "tap-to-build", files: { "index.html": MARKET_TABLE_SLOT.page }, activeFile: "index.html", slotLine: MARKET_TABLE_SLOT.slotLine, blocks: ["<table></table>", "<prices></prices>", "<board></board>", "<table><table>"], correctBlock: "<table></table>", tests: [{ id: "market-table-exists", kind: "exists", selector: "table", label: "The price table is ready" }], hints: [{ level: 1, text: "Choose the tag that holds rows and columns." }], xp: 40 }),
    s22({ id: "market-caption", task: "Add a title for the price table.", inputMode: "tap-to-build", files: { "index.html": MARKET_CAPTION_SLOT.page }, activeFile: "index.html", slotLine: MARKET_CAPTION_SLOT.slotLine, conceptIds: ["caption-element"], blocks: ["<caption></caption>", "<title></title>", "<table-title></table-title>", "<caption><caption>"], correctBlock: "<caption></caption>", tests: [{ id: "market-caption-exists", kind: "exists", selector: "table caption", label: "The table has a title" }], hints: [{ level: 1, text: "Choose the tag that names a whole table." }], xp: 50 }),
    s22({ id: "market-caption-text", task: "Name the table Palengke Prices.", inputMode: "guided", files: solved(MARKET_CAPTION_BODY), activeFile: "index.html", highlightToken: "</caption>", tests: [{ id: "market-caption-text-set", kind: "text-equals", selector: "table caption", value: "Palengke Prices", label: "The table has its name" }], hints: [{ level: 1, text: "Write the price board name inside the table title." }, { level: 2, text: "Type: Palengke Prices" }], xp: 40 }),
    s22({ id: "market-row", task: "Add a row for one market item.", inputMode: "tap-to-build", files: { "index.html": MARKET_ROW_SLOT.page }, activeFile: "index.html", slotLine: MARKET_ROW_SLOT.slotLine, blocks: ["<tr></tr>", "<row></row>", "<item></item>", "<tr><tr>"], correctBlock: "<tr></tr>", tests: [{ id: "market-row-exists", kind: "exists", selector: "table tr", label: "The market row is ready" }], hints: [{ level: 1, text: "Choose the short tag for a table row." }], xp: 40 }),
    s22({ id: "market-item", task: "Add Tomatoes as the item name.", inputMode: "guided", files: solved(MARKET_ROW_BODY), activeFile: "index.html", highlightToken: "</tr>", tests: [{ id: "market-item-set", kind: "text-equals", selector: "table th", value: "Tomatoes", label: "Tomatoes are named" }], hints: [{ level: 1, text: "Add a header cell inside the row." }, { level: 2, text: "Use Tomatoes as the cell words." }], xp: 40 }),
    s22({ id: "market-price", task: "Add PHP 90 as the tomato price.", inputMode: "guided", files: solved(MARKET_ITEM_BODY), activeFile: "index.html", highlightToken: "</tr>", tests: [{ id: "market-price-set", kind: "text-equals", selector: "table td", value: "PHP 90", label: "The tomato price is there" }], hints: [{ level: 1, text: "Add a data cell after the item name." }, { level: 2, text: "Use PHP 90 as the cell words." }], xp: 40 }),
    s23({ id: "resident-title", task: "Start a resident contact form. Add its heading.", inputMode: "tap-to-build", files: { "index.html": RESIDENT_TITLE_SLOT.page }, activeFile: "index.html", slotLine: RESIDENT_TITLE_SLOT.slotLine, blocks: ["<h2></h2>", "<heading></heading>", "<title></title>", "<h2><h2>"], correctBlock: "<h2></h2>", tests: [{ id: "resident-title-exists", kind: "exists", selector: "h2", label: "The form has a heading" }], hints: [{ level: 1, text: "Choose the heading one level below a page title." }], xp: 40 }),
    s23({ id: "resident-heading", task: "Name the heading Resident Contact.", inputMode: "guided", files: solved(RESIDENT_TITLE_BODY), activeFile: "index.html", highlightToken: "</h2>", tests: [{ id: "resident-heading-set", kind: "text-equals", selector: "h2", value: "Resident Contact", label: "The form has its name" }], hints: [{ level: 1, text: "Write the form name inside the heading." }, { level: 2, text: "Type: Resident Contact" }], xp: 40 }),
    s23({ id: "resident-form", task: "Add a form for the contact details.", inputMode: "tap-to-build", files: { "index.html": RESIDENT_FORM_SLOT.page }, activeFile: "index.html", slotLine: RESIDENT_FORM_SLOT.slotLine, blocks: ["<form></form>", "<contact></contact>", "<details></details>", "<form><form>"], correctBlock: "<form></form>", tests: [{ id: "resident-form-exists", kind: "exists", selector: "form", label: "The contact form is ready" }], hints: [{ level: 1, text: "Choose the tag that groups form controls." }], xp: 40 }),
    s23({ id: "resident-label", task: "Name the box Your name.", inputMode: "guided", files: solved(RESIDENT_FORM_BODY), activeFile: "index.html", highlightToken: "</form>", tests: [{ id: "resident-label-set", kind: "text-equals", selector: "form label", value: "Your name", label: "The box has a name" }], hints: [{ level: 1, text: "Add a label inside the contact form." }, { level: 2, text: "Name it Your name." }], xp: 40 }),
    s23({ id: "resident-input", task: "Add a text box for the resident name.", inputMode: "guided", files: solved(RESIDENT_LABEL_BODY), activeFile: "index.html", highlightToken: "</form>", tests: [{ id: "resident-input-type", kind: "attr-equals", selector: "form input", attr: "type", value: "text", label: "The name box is ready" }, { id: "resident-input-id", kind: "attr-equals", selector: "form input", attr: "id", value: "resident-name", label: "The name box is linked" }], hints: [{ level: 1, text: "Add an input below its label." }, { level: 2, text: "Use resident-name as its id." }], xp: 40 }),
    s23({ id: "resident-autocomplete", task: "Let the browser suggest a saved name.", inputMode: "guided", files: solved(RESIDENT_INPUT_BODY), activeFile: "index.html", highlightToken: 'id="resident-name"', conceptIds: ["autocomplete-attribute"], tests: [{ id: "resident-autocomplete-set", kind: "attr-equals", selector: "form input", attr: "autocomplete", value: "name", label: "Saved names can be suggested" }], hints: [{ level: 1, text: "Add the saved-name setting in the input tag." }, { level: 2, text: "Use name for the saved detail." }], xp: 50 }),
    s23({ id: "resident-required", task: "Make the resident name required.", inputMode: "guided", files: solved(RESIDENT_AUTOCOMPLETE_BODY), activeFile: "index.html", highlightToken: 'autocomplete="name"', tests: [{ id: "resident-required-set", kind: "source-matches", file: "index.html", pattern: '<input[^>]*\\srequired>', label: "A name is required", because: "The required setting is checked in the code." }], hints: [{ level: 1, text: "Add the must-fill setting in the input tag." }, { level: 2, text: "Add required after the saved-name setting." }], xp: 40 }),
    s24({ id: "document-title", task: "Start a document request. Add its heading.", inputMode: "tap-to-build", files: { "index.html": DOCUMENT_TITLE_SLOT.page }, activeFile: "index.html", slotLine: DOCUMENT_TITLE_SLOT.slotLine, blocks: ["<h2></h2>", "<heading></heading>", "<title></title>", "<h2><h2>"], correctBlock: "<h2></h2>", tests: [{ id: "document-title-exists", kind: "exists", selector: "h2", label: "The request has a heading" }], hints: [{ level: 1, text: "Choose the heading one level below a page title." }], xp: 40 }),
    s24({ id: "document-heading", task: "Name the heading Document Request.", inputMode: "guided", files: solved(DOCUMENT_TITLE_BODY), activeFile: "index.html", highlightToken: "</h2>", tests: [{ id: "document-heading-set", kind: "text-equals", selector: "h2", value: "Document Request", label: "The request has its name" }], hints: [{ level: 1, text: "Write the request name inside the heading." }, { level: 2, text: "Type: Document Request" }], xp: 40 }),
    s24({ id: "document-form", task: "Add a form for the document request.", inputMode: "tap-to-build", files: { "index.html": DOCUMENT_FORM_SLOT.page }, activeFile: "index.html", slotLine: DOCUMENT_FORM_SLOT.slotLine, blocks: ["<form></form>", "<request></request>", "<document></document>", "<form><form>"], correctBlock: "<form></form>", tests: [{ id: "document-form-exists", kind: "exists", selector: "form", label: "The request form is ready" }], hints: [{ level: 1, text: "Choose the tag that groups form controls." }], xp: 40 }),
    s24({ id: "document-label", task: "Name the box Upload proof.", inputMode: "guided", files: solved(DOCUMENT_FORM_BODY), activeFile: "index.html", highlightToken: "</form>", tests: [{ id: "document-label-set", kind: "text-equals", selector: "form label", value: "Upload proof", label: "The file box has a name" }], hints: [{ level: 1, text: "Add a label inside the request form." }, { level: 2, text: "Name it Upload proof." }], xp: 40 }),
    s24({ id: "document-input", task: "Add a box for choosing a file.", inputMode: "guided", files: solved(DOCUMENT_LABEL_BODY), activeFile: "index.html", highlightToken: "</form>", conceptIds: ["file-input"], tests: [{ id: "document-input-type", kind: "attr-equals", selector: "form input", attr: "type", value: "file", label: "The file box is ready" }, { id: "document-input-id", kind: "attr-equals", selector: "form input", attr: "id", value: "proof", label: "The file box is linked" }], hints: [{ level: 1, text: "Add an input below its label." }, { level: 2, text: "Use file as its type." }], xp: 50 }),
    s24({ id: "document-accept", task: "Allow PDF files in the file box.", inputMode: "guided", files: solved(DOCUMENT_INPUT_BODY), activeFile: "index.html", highlightToken: 'id="proof"', conceptIds: ["accept-attribute"], tests: [{ id: "document-accept-set", kind: "attr-equals", selector: "form input", attr: "accept", value: ".pdf", label: "PDF files are allowed" }], hints: [{ level: 1, text: "Add the file-type rule in the input tag." }, { level: 2, text: "Use .pdf as the file rule." }], xp: 50 }),
    s24({ id: "document-required", task: "Make the proof file required.", inputMode: "guided", files: solved(DOCUMENT_ACCEPT_BODY), activeFile: "index.html", highlightToken: 'accept=".pdf"', tests: [{ id: "document-required-set", kind: "source-matches", file: "index.html", pattern: '<input[^>]*\\srequired>', label: "A file is required", because: "The required setting is checked in the code." }], hints: [{ level: 1, text: "Add the must-fill setting in the file tag." }, { level: 2, text: "Add required after the file rule." }], xp: 40 }),
    s25({ id: "source-title", task: "Start the source page with a smaller heading.", inputMode: "tap-to-build", files: { "index.html": SOURCE_TITLE_SLOT.page, "styles.css": "" }, activeFile: "index.html", slotLine: SOURCE_TITLE_SLOT.slotLine, blocks: ["<h2></h2>", "<p></p>", "<h1></h1>", "<cite></cite>"], correctBlock: "<h2></h2>", tests: [{ id: "source-title-exists", kind: "exists", selector: "h2", label: "The source page has a heading" }], hints: [{ level: 1, text: "Add a level-two heading in the blank line." }, { level: 2, text: "Use h2 for this smaller heading." }], xp: 40 }),
    s25({ id: "source-heading", task: "Name the heading Barangay Story Source.", inputMode: "guided", files: solved(SOURCE_TITLE_BODY), activeFile: "index.html", highlightToken: "<h2></h2>", tests: [{ id: "source-heading-text", kind: "text-equals", selector: "h2", value: "Barangay Story Source", label: "The source page has its name" }], hints: [{ level: 1, text: "Write the page name between the heading tags." }, { level: 2, text: "Use Barangay Story Source exactly." }], xp: 40 }),
    s25({ id: "source-copy", task: "Add the flood-history reminder below the heading.", inputMode: "guided", files: solved(SOURCE_HEADING_BODY), activeFile: "index.html", highlightToken: "</h2>", tests: [{ id: "source-copy-text", kind: "text-equals", selector: "p", value: "Remember the flood history.", label: "The history reminder is on the page" }], hints: [{ level: 1, text: "Add one paragraph below the heading." }, { level: 2, text: "Write Remember the flood history." }], xp: 40 }),
    s25({ id: "source-cite", task: "Add a place for the record title that supports the reminder.", inputMode: "tap-to-build", files: { "index.html": SOURCE_CITE_SLOT.page, "styles.css": "" }, activeFile: "index.html", slotLine: SOURCE_CITE_SLOT.slotLine, blocks: ["<cite></cite>", "<p></p>", "<source>", "<footer></footer>"], correctBlock: "<cite></cite>", conceptIds: ["cite-element"], tests: [{ id: "source-cite-exists", kind: "exists", selector: "cite", label: "The record title has a place" }], hints: [{ level: 1, text: "Add the element that marks a cited work or record." }, { level: 2, text: "Use cite for the record title." }], xp: 50 }),
    s25({ id: "source-cite-text", task: "Name the record Barangay San Roque Records.", inputMode: "guided", files: solved(SOURCE_CITE_BODY), activeFile: "index.html", highlightToken: "<cite></cite>", tests: [{ id: "source-cite-text-set", kind: "text-equals", selector: "cite", value: "Barangay San Roque Records", label: "The supporting record has a title" }], hints: [{ level: 1, text: "Write the record title inside the cite tags." }, { level: 2, text: "Use Barangay San Roque Records exactly." }], xp: 40 }),
    s26({ id: "abbreviation-title", task: "Start the guide with a smaller heading.", inputMode: "tap-to-build", files: { "index.html": ABBREVIATION_TITLE_SLOT.page, "styles.css": "" }, activeFile: "index.html", slotLine: ABBREVIATION_TITLE_SLOT.slotLine, blocks: ["<h2></h2>", "<p></p>", "<h1></h1>", "<abbr></abbr>"], correctBlock: "<h2></h2>", tests: [{ id: "abbreviation-title-exists", kind: "exists", selector: "h2", label: "The guide has a heading" }], hints: [{ level: 1, text: "Add a level-two heading in the blank line." }, { level: 2, text: "Use h2 for this smaller heading." }], xp: 40 }),
    s26({ id: "abbreviation-heading", task: "Name the heading Barangay Abbreviation Guide.", inputMode: "guided", files: solved(ABBREVIATION_TITLE_BODY), activeFile: "index.html", highlightToken: "<h2></h2>", tests: [{ id: "abbreviation-heading-text", kind: "text-equals", selector: "h2", value: "Barangay Abbreviation Guide", label: "The guide has its name" }], hints: [{ level: 1, text: "Write the guide name between the heading tags." }, { level: 2, text: "Use Barangay Abbreviation Guide exactly." }], xp: 40 }),
    s26({ id: "abbreviation-copy", task: "Add the guide sentence below the heading.", inputMode: "guided", files: solved(ABBREVIATION_HEADING_BODY), activeFile: "index.html", highlightToken: "</h2>", tests: [{ id: "abbreviation-copy-text", kind: "text-equals", selector: "p", value: "Learn the short names used in local notices.", label: "The guide sentence is on the page" }], hints: [{ level: 1, text: "Add one paragraph below the heading." }, { level: 2, text: "Write Learn the short names used in local notices." }], xp: 40 }),
    s26({ id: "abbreviation-mark", task: "Add a place for the short name BHW.", inputMode: "tap-to-build", files: { "index.html": ABBREVIATION_SLOT.page, "styles.css": "" }, activeFile: "index.html", slotLine: ABBREVIATION_SLOT.slotLine, blocks: ["<abbr></abbr>", "<p></p>", "<small></small>", "<acronym></acronym>"], correctBlock: "<abbr></abbr>", conceptIds: ["abbr-element"], tests: [{ id: "abbreviation-mark-exists", kind: "exists", selector: "abbr", label: "The short name has a place" }], hints: [{ level: 1, text: "Add the element that marks an abbreviation." }, { level: 2, text: "Use abbr for the short name." }], xp: 50 }),
    s26({ id: "abbreviation-title-attribute", task: "Explain that BHW means Barangay Health Worker.", inputMode: "guided", files: solved(ABBREVIATION_BODY), activeFile: "index.html", highlightToken: "<abbr></abbr>", conceptIds: ["title-attribute"], tests: [{ id: "abbreviation-title-set", kind: "attr-equals", selector: "abbr", attr: "title", value: "Barangay Health Worker", label: "The short name has its full meaning" }, { id: "abbreviation-text-set", kind: "text-equals", selector: "abbr", value: "BHW", label: "The short name is shown" }], hints: [{ level: 1, text: "Add the full meaning in the abbreviation opening tag." }, { level: 2, text: "Use title for Barangay Health Worker, then write BHW inside." }], xp: 50 }),
    s27({ id: "reminder-title", task: "Start the reminder with a smaller heading.", inputMode: "tap-to-build", files: { "index.html": REMINDER_TITLE_SLOT.page, "styles.css": "" }, activeFile: "index.html", slotLine: REMINDER_TITLE_SLOT.slotLine, blocks: ["<h2></h2>", "<p></p>", "<h1></h1>", "<q></q>"], correctBlock: "<h2></h2>", tests: [{ id: "reminder-title-exists", kind: "exists", selector: "h2", label: "The reminder has a heading" }], hints: [{ level: 1, text: "Add a level-two heading in the blank line." }, { level: 2, text: "Use h2 for this smaller heading." }], xp: 40 }),
    s27({ id: "reminder-heading", task: "Name the heading Barangay Reminder.", inputMode: "guided", files: solved(REMINDER_TITLE_BODY), activeFile: "index.html", highlightToken: "<h2></h2>", tests: [{ id: "reminder-heading-text", kind: "text-equals", selector: "h2", value: "Barangay Reminder", label: "The reminder has its name" }], hints: [{ level: 1, text: "Write the reminder name between the heading tags." }, { level: 2, text: "Use Barangay Reminder exactly." }], xp: 40 }),
    s27({ id: "reminder-quote", task: "Add a place for the short reminder.", inputMode: "tap-to-build", files: { "index.html": REMINDER_QUOTE_SLOT.page, "styles.css": "" }, activeFile: "index.html", slotLine: REMINDER_QUOTE_SLOT.slotLine, blocks: ["<q></q>", "<p></p>", "<quote></quote>", "<blockquote></blockquote>"], correctBlock: "<q></q>", conceptIds: ["q-element"], tests: [{ id: "reminder-quote-exists", kind: "exists", selector: "q", label: "The short reminder has a place" }], hints: [{ level: 1, text: "Add the element for a short quoted phrase." }, { level: 2, text: "Use q for the short reminder." }], xp: 50 }),
    s27({ id: "reminder-quote-text", task: "Write Bring your ID. in the quote.", inputMode: "guided", files: solved(REMINDER_QUOTE_BODY), activeFile: "index.html", highlightToken: "<q></q>", tests: [{ id: "reminder-quote-text-set", kind: "text-equals", selector: "q", value: "Bring your ID.", label: "The reminder words are shown" }], hints: [{ level: 1, text: "Write the short reminder inside the q tags." }, { level: 2, text: "Use Bring your ID. exactly." }], xp: 40 }),
    s27({ id: "reminder-quote-source", task: "Name Barangay Hall Notice as the reminder source.", inputMode: "guided", files: solved(REMINDER_QUOTE_TEXT_BODY), activeFile: "index.html", highlightToken: "</q>", tests: [{ id: "reminder-quote-source-set", kind: "text-equals", selector: "cite", value: "Barangay Hall Notice", label: "The reminder source has a title" }], hints: [{ level: 1, text: "Add a cited record title after the quote." }, { level: 2, text: "Use Barangay Hall Notice exactly." }], xp: 40 }),
    s28({ id: "health-center-notice-title", task: "Start the barangay health center notice with a smaller heading.", inputMode: "tap-to-build", files: { "index.html": HEALTH_CENTER_NOTICE_TITLE_SLOT.page, "styles.css": "" }, activeFile: "index.html", slotLine: HEALTH_CENTER_NOTICE_TITLE_SLOT.slotLine, blocks: ["<h2></h2>", "<p></p>", "<h1></h1>", "<i></i>"], correctBlock: "<h2></h2>", tests: [{ id: "health-center-notice-title-exists", kind: "exists", selector: "h2", label: "The page has a heading" }], hints: [{ level: 1, text: "Add a level-two heading in the blank line." }, { level: 2, text: "Use h2 for this smaller heading." }], xp: 40 }),
    s28({ id: "health-center-notice-heading", task: "Name the heading Important Notice.", inputMode: "guided", files: solved(HEALTH_CENTER_NOTICE_TITLE_BODY), activeFile: "index.html", highlightToken: "<h2></h2>", tests: [{ id: "health-center-notice-heading-text", kind: "text-equals", selector: "h2", value: "Important Notice", label: "The page has its name" }], hints: [{ level: 1, text: "Write the page name between the heading tags." }, { level: 2, text: "Use Important Notice exactly." }], xp: 40 }),
    s28({ id: "health-center-notice-copy", task: "Add the opening sentence below the heading.", inputMode: "guided", files: solved(HEALTH_CENTER_NOTICE_HEADING_BODY), activeFile: "index.html", highlightToken: "</h2>", tests: [{ id: "health-center-notice-copy-text", kind: "text-equals", selector: "p", value: "Learn about important health tips for your barangay.", label: "The opening sentence is on the page" }], hints: [{ level: 1, text: "Add one paragraph below the heading." }, { level: 2, text: "Write Learn about important health tips for your barangay." }], xp: 40 }),
    s28({ id: "health-center-notice-i", task: "Add a place for the italic.", inputMode: "tap-to-build", files: { "index.html": HEALTH_CENTER_NOTICE_ELEMENT_SLOT.page, "styles.css": "" }, activeFile: "index.html", slotLine: HEALTH_CENTER_NOTICE_ELEMENT_SLOT.slotLine, blocks: ["<i></i>","<p></p>","<span></span>","<em></em>"], correctBlock: "<i></i>", conceptIds: ["i-element"], tests: [{ id: "health-center-notice-i-exists", kind: "exists", selector: "i", label: "The italic has a place" }], hints: [{ level: 1, text: "Add the element that marks a italic." }, { level: 2, text: "Use i for the italic." }], xp: 50 }),
    s28({ id: "health-center-notice-i-text", task: "Write important inside it.", inputMode: "guided", files: solved(HEALTH_CENTER_NOTICE_ELEMENT_BODY), activeFile: "index.html", highlightToken: "<i></i>", tests: [{ id: "health-center-notice-i-text-set", kind: "text-equals", selector: "i", value: "important", label: "The italic shows its words" }], hints: [{ level: 1, text: "Write the words inside the i tags." }, { level: 2, text: "Use important exactly." }], xp: 40 }),
    s29({ id: "jeepney-route-title", task: "Start the jeepney route notice with a smaller heading.", inputMode: "tap-to-build", files: { "index.html": JEEPNEY_ROUTE_TITLE_SLOT.page, "styles.css": "" }, activeFile: "index.html", slotLine: JEEPNEY_ROUTE_TITLE_SLOT.slotLine, blocks: ["<h2></h2>", "<p></p>", "<h1></h1>", "<b></b>"], correctBlock: "<h2></h2>", tests: [{ id: "jeepney-route-title-exists", kind: "exists", selector: "h2", label: "The page has a heading" }], hints: [{ level: 1, text: "Add a level-two heading in the blank line." }, { level: 2, text: "Use h2 for this smaller heading." }], xp: 40 }),
    s29({ id: "jeepney-route-heading", task: "Name the heading Jeepney Route Notice.", inputMode: "guided", files: solved(JEEPNEY_ROUTE_TITLE_BODY), activeFile: "index.html", highlightToken: "<h2></h2>", tests: [{ id: "jeepney-route-heading-text", kind: "text-equals", selector: "h2", value: "Jeepney Route Notice", label: "The page has its name" }], hints: [{ level: 1, text: "Write the page name between the heading tags." }, { level: 2, text: "Use Jeepney Route Notice exactly." }], xp: 40 }),
    s29({ id: "jeepney-route-copy", task: "Add the opening sentence below the heading.", inputMode: "guided", files: solved(JEEPNEY_ROUTE_HEADING_BODY), activeFile: "index.html", highlightToken: "</h2>", tests: [{ id: "jeepney-route-copy-text", kind: "text-equals", selector: "p", value: "Learn how to use the <kbd>element</kbd> in a real-life jeepney route notice.", label: "The opening sentence is on the page" }], hints: [{ level: 1, text: "Add one paragraph below the heading." }, { level: 2, text: "Write Learn how to use the <kbd>element</kbd> in a real-life jeepney route notice." }], xp: 40 }),
    s29({ id: "jeepney-route-b", task: "Add a place for the bold.", inputMode: "tap-to-build", files: { "index.html": JEEPNEY_ROUTE_ELEMENT_SLOT.page, "styles.css": "" }, activeFile: "index.html", slotLine: JEEPNEY_ROUTE_ELEMENT_SLOT.slotLine, blocks: ["<b></b>","<p></p>","<span></span>","<key></key>"], correctBlock: "<b></b>", conceptIds: ["b-element"], tests: [{ id: "jeepney-route-b-exists", kind: "exists", selector: "b", label: "The bold has a place" }], hints: [{ level: 1, text: "Add the element that marks a bold." }, { level: 2, text: "Use b for the bold." }], xp: 50 }),
    s29({ id: "jeepney-route-b-text", task: "Write Important words inside it.", inputMode: "guided", files: solved(JEEPNEY_ROUTE_ELEMENT_BODY), activeFile: "index.html", highlightToken: "<b></b>", tests: [{ id: "jeepney-route-b-text-set", kind: "text-equals", selector: "b", value: "Important words", label: "The bold shows its words" }], hints: [{ level: 1, text: "Write the words inside the b tags." }, { level: 2, text: "Use Important words exactly." }], xp: 40 }),
    s30({ id: "sari-sari-store-title", task: "Start the barangay sari-sari store with a smaller heading.", inputMode: "tap-to-build", files: { "index.html": SARI_SARI_STORE_TITLE_SLOT.page, "styles.css": "" }, activeFile: "index.html", slotLine: SARI_SARI_STORE_TITLE_SLOT.slotLine, blocks: ["<h2></h2>", "<p></p>", "<h1></h1>", "<sub></sub>"], correctBlock: "<h2></h2>", tests: [{ id: "sari-sari-store-title-exists", kind: "exists", selector: "h2", label: "The page has a heading" }], hints: [{ level: 1, text: "Add a level-two heading in the blank line." }, { level: 2, text: "Use h2 for this smaller heading." }], xp: 40 }),
    s30({ id: "sari-sari-store-heading", task: "Name the heading Sari-Sari Store Notice.", inputMode: "guided", files: solved(SARI_SARI_STORE_TITLE_BODY), activeFile: "index.html", highlightToken: "<h2></h2>", tests: [{ id: "sari-sari-store-heading-text", kind: "text-equals", selector: "h2", value: "Sari-Sari Store Notice", label: "The page has its name" }], hints: [{ level: 1, text: "Write the page name between the heading tags." }, { level: 2, text: "Use Sari-Sari Store Notice exactly." }], xp: 40 }),
    s30({ id: "sari-sari-store-copy", task: "Add the opening sentence below the heading.", inputMode: "guided", files: solved(SARI_SARI_STORE_HEADING_BODY), activeFile: "index.html", highlightToken: "</h2>", tests: [{ id: "sari-sari-store-copy-text", kind: "text-equals", selector: "p", value: "Read the notice at your barangay sari-sari store.", label: "The opening sentence is on the page" }], hints: [{ level: 1, text: "Add one paragraph below the heading." }, { level: 2, text: "Write Read the notice at your barangay sari-sari store." }], xp: 40 }),
    s30({ id: "sari-sari-store-sub", task: "Add a place for the subscript.", inputMode: "tap-to-build", files: { "index.html": SARI_SARI_STORE_ELEMENT_SLOT.page, "styles.css": "" }, activeFile: "index.html", slotLine: SARI_SARI_STORE_ELEMENT_SLOT.slotLine, blocks: ["<sub></sub>","<p>1/4</p>","<span>1/4</span>","<key>1/4</key>"], correctBlock: "<sub></sub>", conceptIds: ["sub-element"], tests: [{ id: "sari-sari-store-sub-exists", kind: "exists", selector: "sub", label: "The subscript has a place" }], hints: [{ level: 1, text: "Add the element that marks a subscript." }, { level: 2, text: "Use sub for the subscript." }], xp: 50 }),
    s30({ id: "sari-sari-store-sub-text", task: "Write 1/4 inside it.", inputMode: "guided", files: solved(SARI_SARI_STORE_ELEMENT_BODY), activeFile: "index.html", highlightToken: "<sub></sub>", tests: [{ id: "sari-sari-store-sub-text-set", kind: "text-equals", selector: "sub", value: "1/4", label: "The subscript shows its words" }], hints: [{ level: 1, text: "Write the words inside the sub tags." }, { level: 2, text: "Use 1/4 exactly." }], xp: 40 }),

    s31({ id: "store-prices-title", task: "Start the sari-sari store prices with a smaller heading.", inputMode: "tap-to-build", files: { "index.html": STORE_PRICES_TITLE_SLOT.page, "styles.css": "" }, activeFile: "index.html", slotLine: STORE_PRICES_TITLE_SLOT.slotLine, blocks: ["<h2></h2>", "<p></p>", "<h1></h1>", "<em></em>"], correctBlock: "<h2></h2>", tests: [{ id: "store-prices-title-exists", kind: "exists", selector: "h2", label: "The page has a heading" }], hints: [{ level: 1, text: "Add a level-two heading in the blank line." }, { level: 2, text: "Use h2 for this smaller heading." }], xp: 40 }),
    s31({ id: "store-prices-heading", task: "Name the heading Sari-Sari Store Prices.", inputMode: "guided", files: solved(STORE_PRICES_TITLE_BODY), activeFile: "index.html", highlightToken: "<h2></h2>", tests: [{ id: "store-prices-heading-text", kind: "text-equals", selector: "h2", value: "Sari-Sari Store Prices", label: "The page has its name" }], hints: [{ level: 1, text: "Write the page name between the heading tags." }, { level: 2, text: "Use Sari-Sari Store Prices exactly." }], xp: 40 }),
    s31({ id: "store-prices-copy", task: "Add the opening sentence below the heading.", inputMode: "guided", files: solved(STORE_PRICES_HEADING_BODY), activeFile: "index.html", highlightToken: "</h2>", tests: [{ id: "store-prices-copy-text", kind: "text-equals", selector: "p", value: "Check out the prices of our products at the Sari-Sari store.", label: "The opening sentence is on the page" }], hints: [{ level: 1, text: "Add one paragraph below the heading." }, { level: 2, text: "Write Check out the prices of our products at the Sari-Sari store." }], xp: 40 }),
    s31({ id: "store-prices-em", task: "Add a place for the stressed word.", inputMode: "tap-to-build", files: { "index.html": STORE_PRICES_ELEMENT_SLOT.page, "styles.css": "" }, activeFile: "index.html", slotLine: STORE_PRICES_ELEMENT_SLOT.slotLine, blocks: ["<em></em>","<p></p>","<div></div>","<note></note>"], correctBlock: "<em></em>", conceptIds: ["em-element"], tests: [{ id: "store-prices-em-exists", kind: "exists", selector: "em", label: "The stressed word has a place" }], hints: [{ level: 1, text: "Add the element that marks a stressed word." }, { level: 2, text: "Use em for the stressed word." }], xp: 50 }),
    s31({ id: "store-prices-em-text", task: "Write Discounted! inside it.", inputMode: "guided", files: solved(STORE_PRICES_ELEMENT_BODY), activeFile: "index.html", highlightToken: "<em></em>", tests: [{ id: "store-prices-em-text-set", kind: "text-equals", selector: "em", value: "Discounted!", label: "The stressed word shows its words" }], hints: [{ level: 1, text: "Write the words inside the em tags." }, { level: 2, text: "Use Discounted! exactly." }], xp: 40 }),
    s32({ id: "water-bill-title", task: "Start the barangay water bill with a smaller heading.", inputMode: "tap-to-build", files: { "index.html": WATER_BILL_TITLE_SLOT.page, "styles.css": "" }, activeFile: "index.html", slotLine: WATER_BILL_TITLE_SLOT.slotLine, blocks: ["<h2></h2>", "<p></p>", "<h1></h1>", "<span></span>"], correctBlock: "<h2></h2>", tests: [{ id: "water-bill-title-exists", kind: "exists", selector: "h2", label: "The page has a heading" }], hints: [{ level: 1, text: "Add a level-two heading in the blank line." }, { level: 2, text: "Use h2 for this smaller heading." }], xp: 40 }),
    s32({ id: "water-bill-heading", task: "Name the heading Barangay Water Bill.", inputMode: "guided", files: solved(WATER_BILL_TITLE_BODY), activeFile: "index.html", highlightToken: "<h2></h2>", tests: [{ id: "water-bill-heading-text", kind: "text-equals", selector: "h2", value: "Barangay Water Bill", label: "The page has its name" }], hints: [{ level: 1, text: "Write the page name between the heading tags." }, { level: 2, text: "Use Barangay Water Bill exactly." }], xp: 40 }),
    s32({ id: "water-bill-copy", task: "Add the opening sentence below the heading.", inputMode: "guided", files: solved(WATER_BILL_HEADING_BODY), activeFile: "index.html", highlightToken: "</h2>", tests: [{ id: "water-bill-copy-text", kind: "text-equals", selector: "p", value: "Learn how to highlight text on a water bill for easier reading.", label: "The opening sentence is on the page" }], hints: [{ level: 1, text: "Add one paragraph below the heading." }, { level: 2, text: "Write Learn how to highlight text on a water bill for easier reading." }], xp: 40 }),
    s32({ id: "water-bill-span", task: "Add a place for the small piece of text.", inputMode: "tap-to-build", files: { "index.html": WATER_BILL_ELEMENT_SLOT.page, "styles.css": "" }, activeFile: "index.html", slotLine: WATER_BILL_ELEMENT_SLOT.slotLine, blocks: ["<span></span>","<p></p>","<div></div>","<note></note>"], correctBlock: "<span></span>", conceptIds: ["span-element"], tests: [{ id: "water-bill-span-exists", kind: "exists", selector: "span", label: "The small piece of text has a place" }], hints: [{ level: 1, text: "Add the element that marks a small piece of text." }, { level: 2, text: "Use span for the small piece of text." }], xp: 50 }),
    s32({ id: "water-bill-span-text", task: "Write Metered Amount inside it.", inputMode: "guided", files: solved(WATER_BILL_ELEMENT_BODY), activeFile: "index.html", highlightToken: "<span></span>", tests: [{ id: "water-bill-span-text-set", kind: "text-equals", selector: "span", value: "Metered Amount", label: "The small piece of text shows its words" }], hints: [{ level: 1, text: "Write the words inside the span tags." }, { level: 2, text: "Use Metered Amount exactly." }], xp: 40 }),
    s33({ id: "store-receipt-title", task: "Start the sari-sari store receipt with a smaller heading.", inputMode: "tap-to-build", files: { "index.html": STORE_RECEIPT_TITLE_SLOT.page, "styles.css": "" }, activeFile: "index.html", slotLine: STORE_RECEIPT_TITLE_SLOT.slotLine, blocks: ["<h2></h2>", "<p></p>", "<h1></h1>", "<pre></pre>"], correctBlock: "<h2></h2>", tests: [{ id: "store-receipt-title-exists", kind: "exists", selector: "h2", label: "The page has a heading" }], hints: [{ level: 1, text: "Add a level-two heading in the blank line." }, { level: 2, text: "Use h2 for this smaller heading." }], xp: 40 }),
    s33({ id: "store-receipt-heading", task: "Name the heading Sari-Sari Store Receipt.", inputMode: "guided", files: solved(STORE_RECEIPT_TITLE_BODY), activeFile: "index.html", highlightToken: "<h2></h2>", tests: [{ id: "store-receipt-heading-text", kind: "text-equals", selector: "h2", value: "Sari-Sari Store Receipt", label: "The page has its name" }], hints: [{ level: 1, text: "Write the page name between the heading tags." }, { level: 2, text: "Use Sari-Sari Store Receipt exactly." }], xp: 40 }),
    s33({ id: "store-receipt-copy", task: "Add the opening sentence below the heading.", inputMode: "guided", files: solved(STORE_RECEIPT_HEADING_BODY), activeFile: "index.html", highlightToken: "</h2>", tests: [{ id: "store-receipt-copy-text", kind: "text-equals", selector: "p", value: "See how pre keeps the spaces and line breaks in this laundry shop receipt.", label: "The opening sentence is on the page" }], hints: [{ level: 1, text: "Add one paragraph below the heading." }, { level: 2, text: "Write See how pre keeps the spaces and line breaks in this laundry shop receipt." }], xp: 40 }),
    s33({ id: "store-receipt-pre", task: "Add a place for the preformatted text.", inputMode: "tap-to-build", files: { "index.html": STORE_RECEIPT_ELEMENT_SLOT.page, "styles.css": "" }, activeFile: "index.html", slotLine: STORE_RECEIPT_ELEMENT_SLOT.slotLine, blocks: ["<pre></pre>","<p></p>","<div></div>","<note></note>"], correctBlock: "<pre></pre>", conceptIds: ["pre-element"], tests: [{ id: "store-receipt-pre-exists", kind: "exists", selector: "pre", label: "The preformatted text has a place" }], hints: [{ level: 1, text: "Add the element that marks a preformatted text." }, { level: 2, text: "Use pre for the preformatted text." }], xp: 50 }),
    s33({ id: "store-receipt-pre-text", task: "Write Pre keeps it just like that. inside it.", inputMode: "guided", files: solved(STORE_RECEIPT_ELEMENT_BODY), activeFile: "index.html", highlightToken: "<pre></pre>", tests: [{ id: "store-receipt-pre-text-set", kind: "text-equals", selector: "pre", value: "Pre keeps it just like that.", label: "The preformatted text shows its words" }], hints: [{ level: 1, text: "Write the words inside the pre tags." }, { level: 2, text: "Use Pre keeps it just like that. exactly." }], xp: 40 }),
    s34({ id: "stock-list-title", task: "Start the pharmacy stock list with a smaller heading.", inputMode: "tap-to-build", files: { "index.html": STOCK_LIST_TITLE_SLOT.page, "styles.css": "" }, activeFile: "index.html", slotLine: STOCK_LIST_TITLE_SLOT.slotLine, blocks: ["<h2></h2>", "<p></p>", "<h1></h1>", "<thead></thead>"], correctBlock: "<h2></h2>", tests: [{ id: "stock-list-title-exists", kind: "exists", selector: "h2", label: "The page has a heading" }], hints: [{ level: 1, text: "Add a level-two heading in the blank line." }, { level: 2, text: "Use h2 for this smaller heading." }], xp: 40 }),
    s34({ id: "stock-list-heading", task: "Name the heading Pharmacy Stock List.", inputMode: "guided", files: solved(STOCK_LIST_TITLE_BODY), activeFile: "index.html", highlightToken: "<h2></h2>", tests: [{ id: "stock-list-heading-text", kind: "text-equals", selector: "h2", value: "Pharmacy Stock List", label: "The page has its name" }], hints: [{ level: 1, text: "Write the page name between the heading tags." }, { level: 2, text: "Use Pharmacy Stock List exactly." }], xp: 40 }),
    s34({ id: "stock-list-copy", task: "Add the opening sentence below the heading.", inputMode: "guided", files: solved(STOCK_LIST_HEADING_BODY), activeFile: "index.html", highlightToken: "</h2>", tests: [{ id: "stock-list-copy-text", kind: "text-equals", selector: "p", value: "A list of water bills for the barangay.", label: "The opening sentence is on the page" }], hints: [{ level: 1, text: "Add one paragraph below the heading." }, { level: 2, text: "Write A list of water bills for the barangay." }], xp: 40 }),
    s34({ id: "stock-list-thead", task: "Add a place for the table head.", inputMode: "tap-to-build", files: { "index.html": STOCK_LIST_ELEMENT_SLOT.page, "styles.css": "" }, activeFile: "index.html", slotLine: STOCK_LIST_ELEMENT_SLOT.slotLine, blocks: ["<thead></thead>","<p></p>","<div></div>","<note></note>"], correctBlock: "<thead></thead>", conceptIds: ["thead-element"], tests: [{ id: "stock-list-thead-exists", kind: "exists", selector: "thead", label: "The table head has a place" }], hints: [{ level: 1, text: "Add the element that marks a table head." }, { level: 2, text: "Use thead for the table head." }], xp: 50 }),
    s34({ id: "stock-list-thead-text", task: "Write thMonthth inside it.", inputMode: "guided", files: solved(STOCK_LIST_ELEMENT_BODY), activeFile: "index.html", highlightToken: "<thead></thead>", tests: [{ id: "stock-list-thead-text-set", kind: "text-equals", selector: "thead", value: "thMonthth", label: "The table head shows its words" }], hints: [{ level: 1, text: "Write the words inside the thead tags." }, { level: 2, text: "Use thMonthth exactly." }], xp: 40 }),
    s35({ id: "id-application-title", task: "Start the barangay id application with a smaller heading.", inputMode: "tap-to-build", files: { "index.html": ID_APPLICATION_TITLE_SLOT.page, "styles.css": "" }, activeFile: "index.html", slotLine: ID_APPLICATION_TITLE_SLOT.slotLine, blocks: ["<h2></h2>", "<p></p>", "<h1></h1>", "<tbody></tbody>"], correctBlock: "<h2></h2>", tests: [{ id: "id-application-title-exists", kind: "exists", selector: "h2", label: "The page has a heading" }], hints: [{ level: 1, text: "Add a level-two heading in the blank line." }, { level: 2, text: "Use h2 for this smaller heading." }], xp: 40 }),
    s35({ id: "id-application-heading", task: "Name the heading Barangay ID Application.", inputMode: "guided", files: solved(ID_APPLICATION_TITLE_BODY), activeFile: "index.html", highlightToken: "<h2></h2>", tests: [{ id: "id-application-heading-text", kind: "text-equals", selector: "h2", value: "Barangay ID Application", label: "The page has its name" }], hints: [{ level: 1, text: "Write the page name between the heading tags." }, { level: 2, text: "Use Barangay ID Application exactly." }], xp: 40 }),
    s35({ id: "id-application-copy", task: "Add the opening sentence below the heading.", inputMode: "guided", files: solved(ID_APPLICATION_HEADING_BODY), activeFile: "index.html", highlightToken: "</h2>", tests: [{ id: "id-application-copy-text", kind: "text-equals", selector: "p", value: "This notice shows the water bill details of each household.", label: "The opening sentence is on the page" }], hints: [{ level: 1, text: "Add one paragraph below the heading." }, { level: 2, text: "Write This notice shows the water bill details of each household." }], xp: 40 }),
    s35({ id: "id-application-tbody", task: "Add a place for the table body.", inputMode: "tap-to-build", files: { "index.html": ID_APPLICATION_ELEMENT_SLOT.page, "styles.css": "" }, activeFile: "index.html", slotLine: ID_APPLICATION_ELEMENT_SLOT.slotLine, blocks: ["<tbody></tbody>","<p></p>","<div></div>","<note></note>"], correctBlock: "<tbody></tbody>", conceptIds: ["tbody-element"], tests: [{ id: "id-application-tbody-exists", kind: "exists", selector: "tbody", label: "The table body has a place" }], hints: [{ level: 1, text: "Add the element that marks a table body." }, { level: 2, text: "Use tbody for the table body." }], xp: 50 }),
    s35({ id: "id-application-tbody-text", task: "Write Water usage per month inside it.", inputMode: "guided", files: solved(ID_APPLICATION_ELEMENT_BODY), activeFile: "index.html", highlightToken: "<tbody></tbody>", tests: [{ id: "id-application-tbody-text-set", kind: "text-equals", selector: "tbody", value: "Water usage per month", label: "The table body shows its words" }], hints: [{ level: 1, text: "Write the words inside the tbody tags." }, { level: 2, text: "Use Water usage per month exactly." }], xp: 40 }),
    s36({ id: "store-price-title", task: "Start the sari sari store price with a smaller heading.", inputMode: "tap-to-build", files: { "index.html": STORE_PRICE_TITLE_SLOT.page, "styles.css": "" }, activeFile: "index.html", slotLine: STORE_PRICE_TITLE_SLOT.slotLine, blocks: ["<h2></h2>", "<p></p>", "<h1></h1>", "<tfoot></tfoot>"], correctBlock: "<h2></h2>", tests: [{ id: "store-price-title-exists", kind: "exists", selector: "h2", label: "The page has a heading" }], hints: [{ level: 1, text: "Add a level-two heading in the blank line." }, { level: 2, text: "Use h2 for this smaller heading." }], xp: 40 }),
    s36({ id: "store-price-heading", task: "Name the heading Sari Sari Store Price.", inputMode: "guided", files: solved(STORE_PRICE_TITLE_BODY), activeFile: "index.html", highlightToken: "<h2></h2>", tests: [{ id: "store-price-heading-text", kind: "text-equals", selector: "h2", value: "Sari Sari Store Price", label: "The page has its name" }], hints: [{ level: 1, text: "Write the page name between the heading tags." }, { level: 2, text: "Use Sari Sari Store Price exactly." }], xp: 40 }),
    s36({ id: "store-price-copy", task: "Add the opening sentence below the heading.", inputMode: "guided", files: solved(STORE_PRICE_HEADING_BODY), activeFile: "index.html", highlightToken: "</h2>", tests: [{ id: "store-price-copy-text", kind: "text-equals", selector: "p", value: "Learn how to group total rows on your water bill.", label: "The opening sentence is on the page" }], hints: [{ level: 1, text: "Add one paragraph below the heading." }, { level: 2, text: "Write Learn how to group total rows on your water bill." }], xp: 40 }),
    s36({ id: "store-price-tfoot", task: "Add a place for the table footer.", inputMode: "tap-to-build", files: { "index.html": STORE_PRICE_ELEMENT_SLOT.page, "styles.css": "" }, activeFile: "index.html", slotLine: STORE_PRICE_ELEMENT_SLOT.slotLine, blocks: ["<tfoot></tfoot>","<p></p>","<div></div>","<note></note>"], correctBlock: "<tfoot></tfoot>", conceptIds: ["tfoot-element"], tests: [{ id: "store-price-tfoot-exists", kind: "exists", selector: "tfoot", label: "The table footer has a place" }], hints: [{ level: 1, text: "Add the element that marks a table footer." }, { level: 2, text: "Use tfoot for the table footer." }], xp: 50 }),
    s36({ id: "store-price-tfoot-text", task: "Write TOTAL: ₱100.00 inside it.", inputMode: "guided", files: solved(STORE_PRICE_ELEMENT_BODY), activeFile: "index.html", highlightToken: "<tfoot></tfoot>", tests: [{ id: "store-price-tfoot-text-set", kind: "text-equals", selector: "tfoot", value: "TOTAL: ₱100.00", label: "The table footer shows its words" }], hints: [{ level: 1, text: "Write the words inside the tfoot tags." }, { level: 2, text: "Use TOTAL: ₱100.00 exactly." }], xp: 40 }),
    s37({ id: "health-centre-title", task: "Start the barangay health centre with a smaller heading.", inputMode: "tap-to-build", files: { "index.html": HEALTH_CENTRE_TITLE_SLOT.page, "styles.css": "" }, activeFile: "index.html", slotLine: HEALTH_CENTRE_TITLE_SLOT.slotLine, blocks: ["<h2></h2>", "<p></p>", "<h1></h1>", "<u></u>"], correctBlock: "<h2></h2>", tests: [{ id: "health-centre-title-exists", kind: "exists", selector: "h2", label: "The page has a heading" }], hints: [{ level: 1, text: "Add a level-two heading in the blank line." }, { level: 2, text: "Use h2 for this smaller heading." }], xp: 40 }),
    s37({ id: "health-centre-heading", task: "Name the heading Barangay Health Centre.", inputMode: "guided", files: solved(HEALTH_CENTRE_TITLE_BODY), activeFile: "index.html", highlightToken: "<h2></h2>", tests: [{ id: "health-centre-heading-text", kind: "text-equals", selector: "h2", value: "Barangay Health Centre", label: "The page has its name" }], hints: [{ level: 1, text: "Write the page name between the heading tags." }, { level: 2, text: "Use Barangay Health Centre exactly." }], xp: 40 }),
    s37({ id: "health-centre-copy", task: "Add the opening sentence below the heading.", inputMode: "guided", files: solved(HEALTH_CENTRE_HEADING_BODY), activeFile: "index.html", highlightToken: "</h2>", tests: [{ id: "health-centre-copy-text", kind: "text-equals", selector: "p", value: "Learn how to mark words that need attention in the health center notice.", label: "The opening sentence is on the page" }], hints: [{ level: 1, text: "Add one paragraph below the heading." }, { level: 2, text: "Write Learn how to mark words that need attention in the health center notice." }], xp: 40 }),
    s37({ id: "health-centre-u", task: "Add a place for the marked word.", inputMode: "tap-to-build", files: { "index.html": HEALTH_CENTRE_ELEMENT_SLOT.page, "styles.css": "" }, activeFile: "index.html", slotLine: HEALTH_CENTRE_ELEMENT_SLOT.slotLine, blocks: ["<u></u>","<p></p>","<div></div>","<note></note>"], correctBlock: "<u></u>", conceptIds: ["u-element"], tests: [{ id: "health-centre-u-exists", kind: "exists", selector: "u", label: "The marked word has a place" }], hints: [{ level: 1, text: "Add the element that marks a marked word." }, { level: 2, text: "Use u for the marked word." }], xp: 50 }),
    s37({ id: "health-centre-u-text", task: "Write misspelled word or important note inside it.", inputMode: "guided", files: solved(HEALTH_CENTRE_ELEMENT_BODY), activeFile: "index.html", highlightToken: "<u></u>", tests: [{ id: "health-centre-u-text-set", kind: "text-equals", selector: "u", value: "misspelled word or important note", label: "The marked word shows its words" }], hints: [{ level: 1, text: "Write the words inside the u tags." }, { level: 2, text: "Use misspelled word or important note exactly." }], xp: 40 }),
    s38({ id: "route-board-title", task: "Start the jeepney route board with a smaller heading.", inputMode: "tap-to-build", files: { "index.html": ROUTE_BOARD_TITLE_SLOT.page, "styles.css": "" }, activeFile: "index.html", slotLine: ROUTE_BOARD_TITLE_SLOT.slotLine, blocks: ["<h2></h2>", "<p></p>", "<h1></h1>", "<sup></sup>"], correctBlock: "<h2></h2>", tests: [{ id: "route-board-title-exists", kind: "exists", selector: "h2", label: "The page has a heading" }], hints: [{ level: 1, text: "Add a level-two heading in the blank line." }, { level: 2, text: "Use h2 for this smaller heading." }], xp: 40 }),
    s38({ id: "route-board-heading", task: "Name the heading Jeepney Route Board.", inputMode: "guided", files: solved(ROUTE_BOARD_TITLE_BODY), activeFile: "index.html", highlightToken: "<h2></h2>", tests: [{ id: "route-board-heading-text", kind: "text-equals", selector: "h2", value: "Jeepney Route Board", label: "The page has its name" }], hints: [{ level: 1, text: "Write the page name between the heading tags." }, { level: 2, text: "Use Jeepney Route Board exactly." }], xp: 40 }),
    s38({ id: "route-board-copy", task: "Add the opening sentence below the heading.", inputMode: "guided", files: solved(ROUTE_BOARD_HEADING_BODY), activeFile: "index.html", highlightToken: "</h2>", tests: [{ id: "route-board-copy-text", kind: "text-equals", selector: "p", value: "See how the sup element shows the meter reading on a water bill.", label: "The opening sentence is on the page" }], hints: [{ level: 1, text: "Add one paragraph below the heading." }, { level: 2, text: "Write See how the sup element shows the meter reading on a water bill." }], xp: 40 }),
    s38({ id: "route-board-sup", task: "Add a place for the superscript.", inputMode: "tap-to-build", files: { "index.html": ROUTE_BOARD_ELEMENT_SLOT.page, "styles.css": "" }, activeFile: "index.html", slotLine: ROUTE_BOARD_ELEMENT_SLOT.slotLine, blocks: ["<sup></sup>","<p></p>","<div></div>","<note></note>"], correctBlock: "<sup></sup>", conceptIds: ["sup-element"], tests: [{ id: "route-board-sup-exists", kind: "exists", selector: "sup", label: "The superscript has a place" }], hints: [{ level: 1, text: "Add the element that marks a superscript." }, { level: 2, text: "Use sup for the superscript." }], xp: 50 }),
    s38({ id: "route-board-sup-text", task: "Write 1st inside it.", inputMode: "guided", files: solved(ROUTE_BOARD_ELEMENT_BODY), activeFile: "index.html", highlightToken: "<sup></sup>", tests: [{ id: "route-board-sup-text-set", kind: "text-equals", selector: "sup", value: "1st", label: "The superscript shows its words" }], hints: [{ level: 1, text: "Write the words inside the sup tags." }, { level: 2, text: "Use 1st exactly." }], xp: 40 }),
    s39({ id: "fish-stall-title", task: "Start the palengke fish stall with a smaller heading.", inputMode: "tap-to-build", files: { "index.html": FISH_STALL_TITLE_SLOT.page, "styles.css": "" }, activeFile: "index.html", slotLine: FISH_STALL_TITLE_SLOT.slotLine, blocks: ["<h2></h2>", "<p></p>", "<h1></h1>", "<dfn></dfn>"], correctBlock: "<h2></h2>", tests: [{ id: "fish-stall-title-exists", kind: "exists", selector: "h2", label: "The page has a heading" }], hints: [{ level: 1, text: "Add a level-two heading in the blank line." }, { level: 2, text: "Use h2 for this smaller heading." }], xp: 40 }),
    s39({ id: "fish-stall-heading", task: "Name the heading Palengke Fish Stall.", inputMode: "guided", files: solved(FISH_STALL_TITLE_BODY), activeFile: "index.html", highlightToken: "<h2></h2>", tests: [{ id: "fish-stall-heading-text", kind: "text-equals", selector: "h2", value: "Palengke Fish Stall", label: "The page has its name" }], hints: [{ level: 1, text: "Write the page name between the heading tags." }, { level: 2, text: "Use Palengke Fish Stall exactly." }], xp: 40 }),
    s39({ id: "fish-stall-copy", task: "Add the opening sentence below the heading.", inputMode: "guided", files: solved(FISH_STALL_HEADING_BODY), activeFile: "index.html", highlightToken: "</h2>", tests: [{ id: "fish-stall-copy-text", kind: "text-equals", selector: "p", value: "Learn how to mark fish names at the market.", label: "The opening sentence is on the page" }], hints: [{ level: 1, text: "Add one paragraph below the heading." }, { level: 2, text: "Write Learn how to mark fish names at the market." }], xp: 40 }),
    s39({ id: "fish-stall-dfn", task: "Add a place for the term being defined.", inputMode: "tap-to-build", files: { "index.html": FISH_STALL_ELEMENT_SLOT.page, "styles.css": "" }, activeFile: "index.html", slotLine: FISH_STALL_ELEMENT_SLOT.slotLine, blocks: ["<dfn></dfn>","<p></p>","<div></div>","<note></note>"], correctBlock: "<dfn></dfn>", conceptIds: ["dfn-element"], tests: [{ id: "fish-stall-dfn-exists", kind: "exists", selector: "dfn", label: "The term being defined has a place" }], hints: [{ level: 1, text: "Add the element that marks a term being defined." }, { level: 2, text: "Use dfn for the term being defined." }], xp: 50 }),
    s39({ id: "fish-stall-dfn-text", task: "Write Tilapia inside it.", inputMode: "guided", files: solved(FISH_STALL_ELEMENT_BODY), activeFile: "index.html", highlightToken: "<dfn></dfn>", tests: [{ id: "fish-stall-dfn-text-set", kind: "text-equals", selector: "dfn", value: "Tilapia", label: "The term being defined shows its words" }], hints: [{ level: 1, text: "Write the words inside the dfn tags." }, { level: 2, text: "Use Tilapia exactly." }], xp: 40 }),
    s40({ id: "turo-menu-title", task: "Start the turo turo menu with a smaller heading.", inputMode: "tap-to-build", files: { "index.html": TURO_MENU_TITLE_SLOT.page, "styles.css": "" }, activeFile: "index.html", slotLine: TURO_MENU_TITLE_SLOT.slotLine, blocks: ["<h2></h2>", "<p></p>", "<h1></h1>", "<menu></menu>"], correctBlock: "<h2></h2>", tests: [{ id: "turo-menu-title-exists", kind: "exists", selector: "h2", label: "The page has a heading" }], hints: [{ level: 1, text: "Add a level-two heading in the blank line." }, { level: 2, text: "Use h2 for this smaller heading." }], xp: 40 }),
    s40({ id: "turo-menu-heading", task: "Name the heading Turo Turo Menu.", inputMode: "guided", files: solved(TURO_MENU_TITLE_BODY), activeFile: "index.html", highlightToken: "<h2></h2>", tests: [{ id: "turo-menu-heading-text", kind: "text-equals", selector: "h2", value: "Turo Turo Menu", label: "The page has its name" }], hints: [{ level: 1, text: "Write the page name between the heading tags." }, { level: 2, text: "Use Turo Turo Menu exactly." }], xp: 40 }),
    s40({ id: "turo-menu-copy", task: "Add the opening sentence below the heading.", inputMode: "guided", files: solved(TURO_MENU_HEADING_BODY), activeFile: "index.html", highlightToken: "</h2>", tests: [{ id: "turo-menu-copy-text", kind: "text-equals", selector: "p", value: "A list of buttons for paying water bills.", label: "The opening sentence is on the page" }], hints: [{ level: 1, text: "Add one paragraph below the heading." }, { level: 2, text: "Write A list of buttons for paying water bills." }], xp: 40 }),
    s40({ id: "turo-menu-menu", task: "Add a place for the list of commands.", inputMode: "tap-to-build", files: { "index.html": TURO_MENU_ELEMENT_SLOT.page, "styles.css": "" }, activeFile: "index.html", slotLine: TURO_MENU_ELEMENT_SLOT.slotLine, blocks: ["<menu></menu>","<p></p>","<div></div>","<note></note>"], correctBlock: "<menu></menu>", conceptIds: ["menu-element"], tests: [{ id: "turo-menu-menu-exists", kind: "exists", selector: "menu", label: "The list of commands has a place" }], hints: [{ level: 1, text: "Add the element that marks a list of commands." }, { level: 2, text: "Use menu for the list of commands." }], xp: 50 }),
    s40({ id: "turo-menu-menu-text", task: "Write Pay, Cancel, Help inside it.", inputMode: "guided", files: solved(TURO_MENU_ELEMENT_BODY), activeFile: "index.html", highlightToken: "<menu></menu>", tests: [{ id: "turo-menu-menu-text-set", kind: "text-equals", selector: "menu", value: "Pay, Cancel, Help", label: "The list of commands shows its words" }], hints: [{ level: 1, text: "Write the words inside the menu tags." }, { level: 2, text: "Use Pay, Cancel, Help exactly." }], xp: 40 }),
    s41({ id: "basketball-league-title", task: "Start the barangay basketball league with a smaller heading.", inputMode: "tap-to-build", files: { "index.html": BASKETBALL_LEAGUE_TITLE_SLOT.page, "styles.css": "" }, activeFile: "index.html", slotLine: BASKETBALL_LEAGUE_TITLE_SLOT.slotLine, blocks: ["<h2></h2>", "<p></p>", "<h1></h1>", "<bdi></bdi>"], correctBlock: "<h2></h2>", tests: [{ id: "basketball-league-title-exists", kind: "exists", selector: "h2", label: "The page has a heading" }], hints: [{ level: 1, text: "Add a level-two heading in the blank line." }, { level: 2, text: "Use h2 for this smaller heading." }], xp: 40 }),
    s41({ id: "basketball-league-heading", task: "Name the heading Barangay Basketball League.", inputMode: "guided", files: solved(BASKETBALL_LEAGUE_TITLE_BODY), activeFile: "index.html", highlightToken: "<h2></h2>", tests: [{ id: "basketball-league-heading-text", kind: "text-equals", selector: "h2", value: "Barangay Basketball League", label: "The page has its name" }], hints: [{ level: 1, text: "Write the page name between the heading tags." }, { level: 2, text: "Use Barangay Basketball League exactly." }], xp: 40 }),
    s41({ id: "basketball-league-copy", task: "Add the opening sentence below the heading.", inputMode: "guided", files: solved(BASKETBALL_LEAGUE_HEADING_BODY), activeFile: "index.html", highlightToken: "</h2>", tests: [{ id: "basketball-league-copy-text", kind: "text-equals", selector: "p", value: "See how the bdi tag keeps names from mixing up.", label: "The opening sentence is on the page" }], hints: [{ level: 1, text: "Add one paragraph below the heading." }, { level: 2, text: "Write See how the bdi tag keeps names from mixing up." }], xp: 40 }),
    s41({ id: "basketball-league-bdi", task: "Add a place for the isolated name.", inputMode: "tap-to-build", files: { "index.html": BASKETBALL_LEAGUE_ELEMENT_SLOT.page, "styles.css": "" }, activeFile: "index.html", slotLine: BASKETBALL_LEAGUE_ELEMENT_SLOT.slotLine, blocks: ["<bdi></bdi>","<p>John Doe</p>","<div>John Doe</div>","<note>John Doe</note>"], correctBlock: "<bdi></bdi>", conceptIds: ["bdi-element"], tests: [{ id: "basketball-league-bdi-exists", kind: "exists", selector: "bdi", label: "The isolated name has a place" }], hints: [{ level: 1, text: "Add the element that marks a isolated name." }, { level: 2, text: "Use bdi for the isolated name." }], xp: 50 }),
    s41({ id: "basketball-league-bdi-text", task: "Write John Doe inside it.", inputMode: "guided", files: solved(BASKETBALL_LEAGUE_ELEMENT_BODY), activeFile: "index.html", highlightToken: "<bdi></bdi>", tests: [{ id: "basketball-league-bdi-text-set", kind: "text-equals", selector: "bdi", value: "John Doe", label: "The isolated name shows its words" }], hints: [{ level: 1, text: "Write the words inside the bdi tags." }, { level: 2, text: "Use John Doe exactly." }], xp: 40 }),
    s42({ id: "supply-list-root", task: "Start the notice card. Add the box that holds everything else.", inputMode: "tap-to-build", files: { "index.html": SUPPLY_LIST_ROOT_SLOT.page, "styles.css": "" }, activeFile: "index.html", slotLine: SUPPLY_LIST_ROOT_SLOT.slotLine, blocks: ["<section></section>","<div></div>","<p></p>","<span></span>"], correctBlock: "<section></section>", tests: [{ id: "supply-list-root-exists", kind: "exists", selector: "section", label: "The notice card has its outer box" }], hints: [{ level: 1, text: "Add the element that groups everything else in this notice card." }, { level: 2, text: "Use section tags for the outer box." }], xp: 40 }),
    s42({ id: "supply-list-h2-1", task: "Add the heading inside the section, and write Backpack Alert in it.", inputMode: "guided", files: solved(SUPPLY_LIST_B1), activeFile: "index.html", highlightToken: "<section>", tests: [{ id: "supply-list-h2-1-text", kind: "text-equals", selector: "section h2", value: "Backpack Alert", label: "The heading shows the card heading" }], hints: [{ level: 1, text: "Find the section you already added, and work inside the section." }, { level: 2, text: "Use h2 tags, and write Backpack Alert between them." }], xp: 45 }),
    s42({ id: "supply-list-p-2", task: "Add the paragraph inside the section, and write Organize your stuff for success! in it.", inputMode: "guided", files: solved(SUPPLY_LIST_B2), activeFile: "index.html", highlightToken: "<section>", tests: [{ id: "supply-list-p-2-text", kind: "text-equals", selector: "section p", value: "Organize your stuff for success!", label: "The paragraph shows one sentence of detail" }], hints: [{ level: 1, text: "Find the section you already added, and work inside the section." }, { level: 2, text: "Use p tags, and write Organize your stuff for success! between them." }], xp: 45 }),
  ],
};
