/**
 * Hamburger Icon and Mobile Menu Overlay Logic
 */
// capture references to the header logo icon, hamburger icon, and mobile menu overlay elements
const logo = document.getElementById('logo');
const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');

// when opening mobile menu, add .open class to hamburger icon (transition to cross symbol),
// change logo image so it contrasts better with background color, and make the mobile menu appear
const openMobileMenu = () => {
  menuBtn.classList.add('open');
  logo.setAttribute('src', './images/logo-bookmark-footer.svg');
  menu.classList.add('flex');
  menu.classList.remove('hidden');
};

// when closing the mobile menu, remove .open class to hamburger icon (transition to hamburger symbol),
// change logo image so it contrasts better with background color, and hide the mobile menu
const closeMobileMenu = () => {
  menuBtn.classList.remove('open');
  logo.setAttribute('src', './images/logo-bookmark.svg');
  menu.classList.remove('flex');
  menu.classList.add('hidden');
};

// when hamburger icon is clicked, check, through the .open class presence,
// if the mobile menu is open or not to determine course of action
const onMenuBtnClick = () => {
  const isMenuOpen = menuBtn.classList.contains('open');
  if (isMenuOpen) closeMobileMenu();
  else openMobileMenu();
};

// close mobile menu if width exceeds screen(md) threshold
const resizeObserver = new ResizeObserver((entries) => {
  const [bodyEntry] = entries;
  if (bodyEntry.target.clientWidth >= 768) closeMobileMenu();
});

resizeObserver.observe(document.body);
menuBtn.addEventListener('click', onMenuBtnClick);

/**
 * Tabs and Panels Logic
 */

// grab all tabs (all of them implement the .tab class)
const tabs = document.querySelectorAll('.tab');
// grab three panels (all of them implement the .panel class)
const panels = document.querySelectorAll('.panel');
// create shallow copy of panels list
const panelsCopy = Array.from(panels);
// keys: feature ids (panel-1, panel-2, panel-3)
// values: objects
//   tab: tab element related to the feature id (has .tab class with data-target=<feature-id>)
//   panel: panel element related to the feature id (has .panel class and a .<feature-id> class)
const features = {};
// currently selected panel
// object:
//   tab: currently selected tab element
//   panel: currently selected panel element
let selectedPanel = {};

// runs once: for each tab element...
for (const tab of tabs.values()) {
  // ...grab the feature id
  const id = tab.dataset.target;
  // in the panels list, search for a panel that implements a class with
  // the same name as the feature id
  const panelIndex = panelsCopy.findIndex((panel) =>
    panel.classList.contains(id)
  );
  const panel = panelsCopy[panelIndex];
  // if this is the initially-selected panel (has a .flex class on it)
  // then populated the selectedPanel object with the selected tab and panel elements
  // and decorate the <span> inside the selected tab with a red highlight
  if (panel.classList.contains('flex')) {
    selectedPanel.tab = tab;
    selectedPanel.panel = panel;
    tab.querySelector('span').classList.add('border-b-4', 'border-soft-red');
  }
  // link the tab and found panel to the related feature id
  features[id] = {
    tab,
    panel,
  };
  // remove found panel from shallow copy to accelerate linking process
  panelsCopy.splice(panelIndex, 1);
}

// when a user clicks on a tab...
const onTabClick = (e) => {
  // ...get the currently-selected feature id...
  const oldId = selectedPanel.tab.dataset.target;
  // ...and the newly-selected feature id
  // e.target can be either the <span> text or the wrapping flex item <div>;
  // in case e.target is the <span>, which does NOT have the data-target=<feature-id>
  // attribute, then look it up in the wrapper <div> element
  const newId =
    e.target.dataset.target || e.target.parentElement.dataset.target;
  // if the user clicked on the same tab, do nothing
  if (oldId === newId) return;
  // get the <span> and panel elements from the currently-selected feature
  const oldSpan = selectedPanel.tab.querySelector('span');
  const oldPanel = selectedPanel.panel;
  // get the <span> and panel elements from the newly-selected feature
  const newSpan = features[newId].tab.querySelector('span');
  const newPanel = features[newId].panel;
  // for the currently-selected feature, remove CSS from the <span> text
  // that highlights it with red, and also hide the related panel element
  oldSpan.classList.remove('border-b-4', 'border-soft-red');
  oldPanel.classList.remove('flex');
  oldPanel.classList.add('hidden');
  // for the currently-selected feature, add CSS from the <span> text
  // that highlights it with red, and also display the related panel element
  newSpan.classList.add('border-b-4', 'border-soft-red');
  newPanel.classList.add('flex');
  newPanel.classList.remove('hidden');
  // store a reference to the newly-selected feature
  selectedPanel = features[newId];
};

// add click listener to all tabs
for (const tab of tabs.values()) {
  tab.addEventListener('click', onTabClick);
}
