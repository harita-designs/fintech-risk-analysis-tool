const ic = svg => `data:image/svg+xml,${encodeURIComponent(svg)}`;

// ── Navbar ─────────────────────────────────────────────────────────────────────
export const imgLogo = ic(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"/>`);

export const imgSearch = ic(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#081732" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`);

export const imgBarChart = ic(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#081732" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="18" y="3" width="4" height="18" rx="1"/><rect x="10" y="8" width="4" height="13" rx="1"/><rect x="2" y="13" width="4" height="8" rx="1"/></svg>`);

export const imgComments = ic(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#081732" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`);

export const imgSettings = ic(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#081732" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`);

export const imgNavIconBg = ic(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><circle cx="25" cy="25" r="24" fill="#f8f7ff" stroke="#14397d" stroke-width="0.5"/></svg>`);

export const imgNotification = ic(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#081732" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`);

export const imgNotifyBg = ic(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 50"><rect width="100" height="50" rx="25" fill="#f1f1ff"/></svg>`);

export const imgProfile = ic(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><linearGradient id="pg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#2871fa"/><stop offset="100%" stop-color="#6717cd"/></linearGradient></defs><rect width="40" height="40" fill="url(#pg)"/><circle cx="20" cy="15" r="7" fill="rgba(255,255,255,0.92)"/><ellipse cx="20" cy="35" rx="13" ry="9" fill="rgba(255,255,255,0.92)"/></svg>`);

// ── Portfolio stats ────────────────────────────────────────────────────────────
export const imgTransaction = ic(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#081732" stroke-width="2" stroke-linecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`);

export const imgRating = ic(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#081732" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`);

export const imgWarningShield = ic(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#081732" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`);

export const imgSurvey = ic(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#081732" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><line x1="8" y1="11" x2="16" y2="11"/><line x1="8" y1="15" x2="16" y2="15"/></svg>`);

export const imgActivity = ic(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#081732" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`);

// ── Portfolio row ──────────────────────────────────────────────────────────────
export const imgAlertTriangle = ic(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#d69200" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`);

export const imgArrowForward = ic(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#081732" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`);

export const imgArrowForwardGradient = ic(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><defs><linearGradient id="arrowGrad" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#2871fa"/><stop offset="100%" stop-color="#6717cd"/></linearGradient></defs><line x1="5" y1="12" x2="19" y2="12" stroke="url(#arrowGrad)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><polyline points="12 5 19 12 12 19" stroke="url(#arrowGrad)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`);

export const imgTrendingDown = ic(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#e9000b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>`);

export const imgTrendingUp = ic(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#05c04b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`);

export const imgExpandArrow = ic(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#081732" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`);

// ── Pagination ─────────────────────────────────────────────────────────────────
export const imgArrowLeft = ic(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#081732" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`);

export const imgArrowLeftHover = ic(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#081732" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`);

export const imgArrowCircle = ic(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" fill="none"><circle cx="25" cy="25" r="24" fill="#fefdff" stroke="#14397d" stroke-width="0.5"/></svg>`);

export const imgArrowCircleBlue = ic(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><circle cx="25" cy="25" r="25" fill="#2871fa"/></svg>`);

// ── Borrower header back button ────────────────────────────────────────────────
export const imgBackBtnBg = ic(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" fill="none"><circle cx="25" cy="25" r="24" fill="#fefdff" stroke="#14397d" stroke-width="0.5"/></svg>`);

export const imgBackBtnBgHover = ic(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><circle cx="25" cy="25" r="25" fill="#2871fa"/></svg>`);

export const imgBackArrow = ic(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#081732" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`);

export const imgBackArrowHover = ic(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`);

// ── Metric card icons ──────────────────────────────────────────────────────────
export const imgRevenueIcon = ic(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#081732" stroke-width="2" stroke-linecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`);

export const imgCashFlowIcon = ic(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#081732" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`);

export const imgDebtIcon = ic(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#081732" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>`);

export const imgLiquidityIcon = ic(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#081732" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`);

// ── Risk signal icons ──────────────────────────────────────────────────────────
export const imgXCircle = ic(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#e9000b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`);

export const imgAlertCircle = ic(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#d69200" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`);

// ── Covenant Tracking ──────────────────────────────────────────────────────────
export const imgCovenantXCircle = ic(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#e9000b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`);

export const imgLine17 = ic(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 2"><line x1="0" y1="1" x2="100" y2="1" stroke="rgba(20,57,125,0.15)" stroke-width="0.3"/></svg>`);

// ── Financial Performance tab ──────────────────────────────────────────────────
export const imgCheckCircle = ic(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#05c04b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`);

export const imgAlertCircleYellow = ic(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#d69200" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`);

// ── Financial Performance tab ratio icons ──────────────────────────────────────
export const imgFPCheckCircle = ic(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#05c04b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`);

export const imgFPAlertCircle = ic(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#e7000b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`);

// ── Financial Trends chart legend / line dots ──────────────────────────────────
export const imgDotRevenue  = ic(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><circle cx="5" cy="5" r="5" fill="#1a2a4a"/></svg>`);
export const imgDotCashFlow = ic(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><circle cx="5" cy="5" r="5" fill="#6717cd"/></svg>`);
export const imgDotDebt     = ic(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><circle cx="5" cy="5" r="5" fill="#b38be6"/></svg>`);
export const imgDotDark     = ic(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"><circle cx="5" cy="5" r="5" fill="#1a2a4a"/></svg>`);

// ── Risk Signals tab ───────────────────────────────────────────────────────────
export const imgXCircleRed = ic(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#e9000b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`);

export const imgExtLinkUp = ic(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#081732" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>`);

export const imgExtLinkUpGradient = ic(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><defs><linearGradient id="elg" gradientUnits="userSpaceOnUse" x1="5" y1="19" x2="19" y2="5"><stop offset="0%" stop-color="#2871fa"/><stop offset="100%" stop-color="#6717cd"/></linearGradient></defs><line x1="12" y1="19" x2="12" y2="5" stroke="url(#elg)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><polyline points="5 12 12 5 19 12" stroke="url(#elg)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`);

// ── Contextual Insights tab ────────────────────────────────────────────────────
export const imgCIAvatar1 = ic(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" fill="#0d9488"/><circle cx="20" cy="15" r="6" fill="rgba(255,255,255,0.9)"/><ellipse cx="20" cy="33" rx="11" ry="8" fill="rgba(255,255,255,0.9)"/></svg>`);

export const imgCIAvatar2 = ic(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" fill="#d97706"/><circle cx="20" cy="15" r="6" fill="rgba(255,255,255,0.9)"/><ellipse cx="20" cy="33" rx="11" ry="8" fill="rgba(255,255,255,0.9)"/></svg>`);

export const imgCIDocPdf = ic(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 36" fill="none"><path d="M4 2h16l8 8v24a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" stroke="#081732" stroke-width="1.5" stroke-linejoin="round"/><path d="M20 2v8h8" stroke="#081732" stroke-width="1.5" stroke-linejoin="round"/><rect x="2" y="20" width="16" height="9" rx="1.5" fill="#e9000b"/><text x="10" y="27" text-anchor="middle" font-family="Arial,sans-serif" font-size="5.5" font-weight="700" fill="white">PDF</text></svg>`);

export const imgCIDocBank = ic(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 36" fill="none"><path d="M4 2h16l8 8v24a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" stroke="#081732" stroke-width="1.5" stroke-linejoin="round"/><path d="M20 2v8h8" stroke="#081732" stroke-width="1.5" stroke-linejoin="round"/><rect x="2" y="20" width="16" height="9" rx="1.5" fill="#2871fa"/><text x="10" y="27" text-anchor="middle" font-family="Arial,sans-serif" font-size="5" font-weight="700" fill="white">BANK</text></svg>`);

export const imgCIDocLoan = ic(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 36" fill="none"><path d="M4 2h16l8 8v24a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" stroke="#081732" stroke-width="1.5" stroke-linejoin="round"/><path d="M20 2v8h8" stroke="#081732" stroke-width="1.5" stroke-linejoin="round"/><rect x="2" y="20" width="16" height="9" rx="1.5" fill="#6717cd"/><text x="10" y="27" text-anchor="middle" font-family="Arial,sans-serif" font-size="5" font-weight="700" fill="white">LOAN</text></svg>`);

export const imgCIDownload = ic(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#081732" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`);

export const imgCIDownloadGradient = ic(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><defs><linearGradient id="dlg" gradientUnits="userSpaceOnUse" x1="3" y1="21" x2="21" y2="3"><stop offset="0%" stop-color="#2871fa"/><stop offset="100%" stop-color="#6717cd"/></linearGradient></defs><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="url(#dlg)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><polyline points="7 10 12 15 17 10" stroke="url(#dlg)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="15" x2="12" y2="3" stroke="url(#dlg)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`);
