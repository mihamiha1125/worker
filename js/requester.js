let currentStep = 0;
const steps = document.querySelectorAll('.step');

function showStep(index) {
  steps.forEach((step, i) => {
    step.classList.remove('active');
    if (i === index) {
      gsap.fromTo(step, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5 });
      step.classList.add('active');
    }
  });
}

window.nextStep = function () {
  if (currentStep < steps.length - 1) {
    currentStep++;
    showStep(currentStep);
  }
};

window.prevStep = function () {
  if (currentStep > 0) {
    currentStep--;
    showStep(currentStep);
  }
};

window.showConfirm = function () {
  const form = document.getElementById('helpForm');
  const formData = new FormData(form);
  const result = [];

  for (let [key, value] of formData.entries()) {
    result.push(`<p><strong>${key}:</strong> ${value}</p>`);
  }

  document.getElementById('confirmArea').innerHTML = result.join('');
  currentStep++;
  showStep(currentStep);
};

document.getElementById('helpForm').addEventListener('submit', function (e) {
  e.preventDefault();

  // ここに送信処理を書く（例：fetchでGoogleフォーム、LINEなどへ送信）
  alert("依頼が送信されました。ご連絡をお待ちください！");
  // location.reload(); // 初期化したい場合
  document.getElementById('helpForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const form = e.target;
    const data = Object.fromEntries(new FormData(form).entries());
  
    fetch("https://script.google.com/macros/s/AKfycbwUmhQpYpLBxhWBMGbMlZMcx6Zok3Of3WVU9oEQWY172a4x-vV3mviF_ybR0H6pb27Uag/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(res => res.text())
      .then(txt => {
        console.log("送信成功:", txt);
        currentStep++;
        showStep(currentStep); // サンクス画面へ
      })
      .catch(err => {
        alert("送信に失敗しました：" + err);
      });
  });
  
});
