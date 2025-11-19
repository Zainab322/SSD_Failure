const calculateBtn = document.getElementById("calculateBtn");
const result = document.getElementById("result");
const errorBanner = document.getElementById("errorBanner");
const failureToggle = document.getElementById("failureToggle");

calculateBtn.addEventListener("click", () => {
    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value);

    result.classList.add("hidden");
    errorBanner.classList.add("hidden");

    if (isNaN(weight) || isNaN(height) || height <= 0) {
        errorBanner.textContent = "Invalid input — please enter valid numbers.";
        errorBanner.classList.remove("hidden");
        return;
    }

    let bmi;
    let isBugInjected = failureToggle.checked;

    const correctBMI = weight / (height * height);

    if (isBugInjected) {
        bmi = weight / height;

        errorBanner.textContent =
            "Calculation anomaly detected (BUG: wrong BMI formula)";
        errorBanner.classList.remove("hidden");

        console.log(JSON.stringify({
            timestamp: new Date().toISOString(),
            function: "calculateBMI",
            input: { weight, height },
            result: bmi,
            expected: correctBMI,
            delta: Math.abs(correctBMI - bmi),
            error_code: "BUG_WRONG_FORMULA"
        }, null, 2));
    } else {
        bmi = correctBMI;
    }

    result.innerHTML = `
        <h2>Your BMI</h2>
        <p><b>${bmi.toFixed(2)}</b></p>
    `;
    result.classList.remove("hidden");
});
