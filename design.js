const citiesByGovernorate = {
  القاهرة: ["المعادي", "مدينة نصر", "الزمالك"],
  الجيزة: ["الدقي", "إمبابة", "الهرم"],
  الإسكندرية: ["سموحة", "ميامي", "المنتزه"],
  الدقهلية: ["المنصورة", "ميت غمر", "بلقاس"],
  // أضف باقي المحافظات والمدن حسب الحاجة
};
document.addEventListener("DOMContentLoaded", function () {
  const merchantCard = document.getElementById("merchantCard");
  const shippingCard = document.getElementById("shippingCard");

  if (merchantCard) {
    merchantCard.addEventListener("click", () => handleRoleSelection("تاجر"));
  }
  if (shippingCard) {
    shippingCard.addEventListener("click", () =>
      handleRoleSelection("مكتب شحن")
    );
  }
  let shipping = document.getElementById("shipping");
  let seller = document.getElementById("seller");
  const role = localStorage.getItem("userRole");
  if (role === "تاجر") {
    seller.classList.add("active");
    shipping.classList.remove("active");
  } else if (role === "مكتب شحن") {
    shipping.classList.add("active");
    seller.classList.remove("active");
  }
});

function handleRoleSelection(role) {
  // إظهار الـ span الخاص بالـ role المختار
  const loadingSpanMerchant = document.getElementById("loadingSpanMerchant");
  const loadingSpanShipping = document.getElementById("loadingSpanShipping");

  if (role === "تاجر") {
    loadingSpanMerchant.style.display = "block";
    loadingSpanShipping.style.display = "none";
  } else {
    loadingSpanShipping.style.display = "block";
    loadingSpanMerchant.style.display = "none";
  }

  // تعطيل الضغط على الـ role-card التانية
  document.querySelectorAll(".role-card").forEach((card) => {
    card.style.pointerEvents = "none";
  });

  // تحديث كلاس active بناءً على الدور المختار
  let shipping = document.getElementById("shipping");
  let seller = document.getElementById("seller");
  if (role === "تاجر") {
    seller.classList.add("active");
    shipping.classList.remove("active");
  } else {
    shipping.classList.add("active");
    seller.classList.remove("active");
  }

  // الانتظار 3 ثواني ثم الانتقال للفورم
  setTimeout(() => {
    showSignupForm(role);
  }, 3000);
}

function showSignupForm(role) {
  document.getElementById("roleSelection").style.display = "none";
  document.getElementById("signupForm").style.display = "block";
  document.getElementById("formTitle").textContent =
    role === "تاجر" ? "تسجيل تاجر" : "تسجيل مكتب شحن";
  localStorage.setItem("userRole", role);
  // اضافة علي الكلمة
  let shipping = document.getElementById("shipping");
  let seller = document.getElementById("seller");
  if (role === "تاجر") {
    seller.classList.add("active");
    shipping.classList.remove("active");
  } else if (role === "مكتب شحن'") {
    shipping.classList.add("active");
    seller.classList.remove("active");
  }

  // إظهار حقل نوع المنتجات للتاجر فقط
  const productTypeGroup = document.getElementById("productTypeGroup");
  productTypeGroup.style.display = role === "تاجر" ? "block" : "none";
  if (role === "تاجر") {
    document.getElementById("productType").required = true;
  } else {
    document.getElementById("productType").required = false;
  }
}

function goBack() {
  document.getElementById("roleSelection").style.display = "flex";
  document.getElementById("signupForm").style.display = "none";
  document.querySelectorAll(".role-card").forEach((card) => {
    card.style.pointerEvents = "auto";
  });
  document.getElementById("loadingSpanMerchant").style.display = "none";
  document.getElementById("loadingSpanShipping").style.display = "none";

  // الحفاظ على كلاس active بناءً على الدور المخزن
  let shipping = document.getElementById("shipping");
  let seller = document.getElementById("seller");
  const role = localStorage.getItem("userRole");
  if (role === "تاجر") {
    seller.classList.add("active");
    shipping.classList.remove("active");
  } else if (role === "مكتب شحن") {
    shipping.classList.add("active");
    seller.classList.remove("active");
  }
}

// تحديث المدن بناءً على المحافظة
document.getElementById("governorate").addEventListener("change", function () {
  const governorate = this.value;
  const citySelect = document.getElementById("city");
  citySelect.innerHTML = '<option value="">اختر المدينة أو القرية</option>';

  if (governorate && citiesByGovernorate[governorate]) {
    citiesByGovernorate[governorate].forEach((city) => {
      const option = document.createElement("option");
      option.value = city;
      option.textContent = city;
      citySelect.appendChild(option);
    });
  }
});

document
  .getElementById("signupForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // منع إعادة تحميل الصفحة

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const phone = document.getElementById("phone").value;
    const governorate = document.getElementById("governorate").value;
    const city = document.getElementById("city").value;
    const address = document.getElementById("address").value;
    const productType = document.getElementById("productType").value;
    const role = localStorage.getItem("userRole");
    const errorMessage = document.getElementById("errorMessage");
    const successMessage = document.getElementById("successMessage");

    // إخفاء الرسائل السابقة
    errorMessage.style.display = "none";
    successMessage.style.display = "none";

    // التحقق من الحقول
    if (!name) {
      errorMessage.textContent = "يرجى إدخال الاسم";
      errorMessage.style.display = "block";
      return;
    }
    if (!email || !email.includes("@") || !email.includes(".")) {
      errorMessage.textContent = "يرجى إدخال بريد إلكتروني صالح";
      errorMessage.style.display = "block";
      return;
    }
    if (!password || password.length < 8) {
      errorMessage.textContent = "كلمة المرور يجب أن تكون 8 حروف على الأقل";
      errorMessage.style.display = "block";
      return;
    }
    if (password !== confirmPassword) {
      errorMessage.textContent = "كلمة المرور وتأكيدها غير متطابقتين";
      errorMessage.style.display = "block";
      return;
    }
    if (!phone || !phone.match(/^01[0-2,5]\d{8}$/)) {
      errorMessage.textContent = "يرجى إدخال رقم هاتف صالح (مثال: 01234567890)";
      errorMessage.style.display = "block";
      return;
    }
    if (!governorate) {
      errorMessage.textContent = "يرجى اختيار المحافظة";
      errorMessage.style.display = "block";
      return;
    }
    if (!city) {
      errorMessage.textContent = "يرجى اختيار المدينة أو القرية";
      errorMessage.style.display = "block";
      return;
    }
    if (!address) {
      errorMessage.textContent = "يرجى إدخال العنوان";
      errorMessage.style.display = "block";
      return;
    }
    if (role === "تاجر" && !productType) {
      errorMessage.textContent = "يرجى اختيار نوع المنتجات";
      errorMessage.style.display = "block";
      return;
    }

    successMessage.style.display = "block";
    console.log(
      "Role:",
      role,
      "Name:",
      name,
      "Email:",
      email,
      "Password:",
      password,
      "Phone:",
      phone,
      "Governorate:",
      governorate,
      "City:",
      city,
      "Address:",
      address,
      "Product Type:",
      productType || "N/A"
    );
    // هنا ممكن تضيف لوجيك لربط الـ Backend لاحقًا
  });
