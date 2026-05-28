import { initSidebar } from './modules/sidebar.js';
import { initTheme } from './modules/theme.js';
import { initJournal } from './modules/journal.js';
import { initAnimations } from './modules/animations.js';
import { initClipboard } from './modules/clipboard.js';
import { updateYear } from './modules/utils.js';

// Initialize all modules
initSidebar();
initTheme();
initJournal();
initAnimations();
initClipboard();
updateYear();
