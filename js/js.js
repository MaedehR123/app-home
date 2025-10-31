// تعریف یک متغیر سراسری برای نگهداری شناسه (id) تب فعلی یا صفحه فعال
// در ابتدا مقدار آن "landing" است (یعنی تب یا صفحه‌ی اولیه)
var prev_id = 'landing';


// تعریف تابع timeout برای ایجاد تأخیر (delay) در اجرای کد
// این تابع با استفاده از Promise بعد از گذشت مدت زمان مشخص (بر حسب میلی‌ثانیه) resolve می‌شود
const timeout = async (delay) => {
    return new Promise(res => setTimeout(res, delay));
}


// تابع تغییر فیلتر (برای زمانی که کاربر روی دکمه‌های فیلتر کلیک می‌کند)
const handelChangeFilter = (index) => {
    // انتخاب تمام دکمه‌های فیلتر با کلاس "filter-head-btn"
    let elems = document.querySelectorAll(".filter-head-btn");
    
    // حذف کلاس فعال از تمام دکمه‌ها (تا فقط یکی فعال بماند)
    [].forEach.call(elems, function (el) {
        el.classList.remove("filter-head-btn-active");
    });
    
    // اضافه کردن کلاس فعال به دکمه‌ای که کاربر انتخاب کرده (بر اساس index)
    elems[index].classList.add("filter-head-btn-active")
}



// تابع تغییر تب (جابجایی بین صفحات یا بخش‌های مختلف)
// از نوع async است چون درون آن از await استفاده شده
const handelChangeTab = async (id) => {
    // فقط زمانی اجرا می‌شود که تب جدید با تب قبلی متفاوت باشد
    if (prev_id != id) {

        // انتخاب تمام عناصر دارای کلاس "tab"
        let elems = document.querySelectorAll(".tab");
        
        // برای همه‌ی تب‌ها، کلاس فعال را حذف و کلاس "tab-hide" را اضافه می‌کند (پنهان شدن تب‌ها)
        [].forEach.call(elems, function (el) {
            el.classList.remove("tab-active");
            el.classList.add("tab-hide");
        });

        // نمایش تب جدید با حذف کلاس "tab-hide"
        document.getElementById(`${id}`).classList.remove("tab-hide")

        // مکث کوتاه (۳۰ میلی‌ثانیه) برای اجرای نرم‌تر انیمیشن فعال شدن
        await timeout(30);

        // اضافه کردن کلاس فعال برای نمایش کامل تب جدید
        document.getElementById(`${id}`).classList.add("tab-active")

        // اسکرول صفحه به بالا (برای شروع از بالای صفحه جدید)
        window.scrollTo(0, 0);

        // به‌روزرسانی مقدار prev_id تا تب فعلی ذخیره شود
        prev_id = id ;

        // بستن منوی ناوبری در صورت باز بودن (برای حالت موبایل)
        handelOpenNav('close')
    }
}



// تابع باز و بسته کردن منوی ناوبری (Navigation Menu)
const handelOpenNav = (type) => {
    // انتخاب تگ body برای کنترل اسکرول و لمس
    const body = document.getElementsByTagName("body")[0];

    // اگر نوع ورودی "open" باشد، منو باز می‌شود
    if (type == 'open') {
        // اضافه کردن کلاس فعال به منو و پس‌زمینه تیره
        document.getElementById('nav').classList.add("nav-active")
        document.getElementById('nav-bg').classList.add("nav-bg-active")

        // جلوگیری از اسکرول و لمس در پس‌زمینه هنگام باز بودن منو
        body.style.touchAction = "none";
        body.style.width = "100%";
        body.style.overflow = "hidden";
    }
    // در غیر این صورت (type = 'close') منو بسته می‌شود
    else {
        // حذف کلاس فعال از منو و پس‌زمینه تیره
        document.getElementById('nav').classList.remove("nav-active")
        document.getElementById('nav-bg').classList.remove("nav-bg-active")

        // فعال‌سازی مجدد اسکرول و لمس صفحه
        body.style.touchAction = "unset";
        body.style.width = "unset";
        body.style.overflow = "auto";
    }
}



// تابع تغییر تصویر اصلی در صفحه جزئیات
const handelChangeImage = (newUrl) => {
    // انتخاب تصویر اصلی (با id مشخص)
    let img = document.getElementById('detail-slider-cover')
    
    // تغییر مسیر (src) تصویر به آدرس جدید
    img.src = newUrl
}
