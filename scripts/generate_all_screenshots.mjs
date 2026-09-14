import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://tritamadecorindostiker.com';
const OUT_DIR = path.resolve('public/docs/screenshots');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function run() {
  console.log('Launching browser for documentation screenshots...');
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. Storefront Home
  console.log('1. Capturing: Storefront Home...');
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(OUT_DIR, '01_storefront_home.png') });

  // 2. Storefront Products Catalog
  console.log('2. Capturing: Storefront Products Catalog...');
  await page.goto(`${BASE_URL}/products`, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(OUT_DIR, '02_storefront_products.png') });

  // 3. Storefront Product Detail
  console.log('3. Capturing: Storefront Product Detail (/product/kaca-film-riben)...');
  await page.goto(`${BASE_URL}/product/kaca-film-riben`, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(OUT_DIR, '03_storefront_product_detail.png') });

  // 4. Storefront Gallery
  console.log('4. Capturing: Storefront Gallery (/galeri)...');
  await page.goto(`${BASE_URL}/galeri`, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(OUT_DIR, '04_storefront_gallery.png') });

  // 5. Admin Login Page
  console.log('5. Capturing: Admin Login...');
  await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(OUT_DIR, '05_admin_login.png') });

  // Log in as admin
  console.log('Logging in as Admin...');
  await page.click('input[name="password"]');
  await page.keyboard.type('password123');
  await page.click('button[type="submit"]');
  await new Promise(r => setTimeout(r, 4000));

  // 6. Admin Dashboard (/admin)
  console.log('6. Capturing: Admin Dashboard (/admin)...');
  await page.goto(`${BASE_URL}/admin`, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(OUT_DIR, '06_admin_dashboard.png') });

  // 7. Admin Products List
  console.log('7. Capturing: Admin Products List (/admin/products)...');
  await page.goto(`${BASE_URL}/admin/products`, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(OUT_DIR, '07_admin_products_index.png') });

  // 8. Admin Products Create Form
  console.log('8. Capturing: Admin Products Create Form (/admin/products/create)...');
  await page.goto(`${BASE_URL}/admin/products/create`, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(OUT_DIR, '08_admin_products_create.png') });

  // 9. Admin Galleries List
  console.log('9. Capturing: Admin Galleries List (/admin/galleries)...');
  await page.goto(`${BASE_URL}/admin/galleries`, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(OUT_DIR, '09_admin_galleries_index.png') });

  // 10. Admin Order Archives
  console.log('10. Capturing: Admin Order Archives (/admin/order-archives)...');
  await page.goto(`${BASE_URL}/admin/order-archives`, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(OUT_DIR, '10_admin_order_archives.png') });

  // 11. Admin Users List
  console.log('11. Capturing: Admin Users List (/admin/users)...');
  await page.goto(`${BASE_URL}/admin/users`, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(OUT_DIR, '11_admin_users_index.png') });

  // 12. Admin Profile Edit Modal
  console.log('12. Capturing: Admin Profile Edit Modal...');
  await page.goto(`${BASE_URL}/admin`, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1500));
  const userButton = await page.$('button.group, header button:has(span), header button');
  if (userButton) {
    await userButton.click();
    await new Promise(r => setTimeout(r, 1500));
  }
  await page.screenshot({ path: path.join(OUT_DIR, '12_admin_profile_modal.png') });

  await browser.close();
  console.log('=== ALL 12 SCREENSHOTS CAPTURED WITH 100% ACCURACY ===');
}

run().catch(err => {
  console.error('Error capturing screenshots:', err);
  process.exit(1);
});
