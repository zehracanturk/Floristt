document.addEventListener("DOMContentLoaded", function () {
	ShowRegistrationForm(); // Sayfa aç?ld???nda login formunu göster
});

function ShowLoginForm() {
	document.getElementById("LoginFrom").style.display = "block";
	document.getElementById("ForgotPasswordForm").style.display = "none";
	document.getElementById("RegistrationFrom").style.display = "none";
	document.getElementById("formTitle").innerText = "Login";
}

function ShowRegistrationForm() {
	document.getElementById("LoginFrom").style.display = "none";
	document.getElementById("ForgotPasswordForm").style.display = "none";
	document.getElementById("RegistrationFrom").style.display = "block";
	document.getElementById("formTitle").innerText = "Registration";
}


function ShowForgotPasswordForm() {
	hideAllForms();
	let forgotPasswordForm = document.getElementById("ForgotPasswordForm");
	forgotPasswordForm.style.display = "block";
	setTimeout(() => forgotPasswordForm.classList.add("active"), 10);
}



function SetTitle(Title) {
	var formTitle = document.getElementById('formTitle');
	formTitle.innerHTML = Title;
}

function ShowHideForm(FormID, ShowOrHide) {
	var Form = document.getElementById(FormID);

	if (ShowOrHide == "Show") {
		Form.style.display = 'block';
	} else {
		Form.style.display = 'none';
	}
}

function ActiveInactiveBtn(ButtonID, ActiveORInactive) {

	var Button = document.getElementById(ButtonID);



	if (ActiveORInactive == "Active") {
		Button.classList.add('active');
	} else {
		Button.classList.remove('active');
	}


}

function ShowHideFromSwitchBtn(ShowOrHide) {
	var formSwitchBtn = document.getElementById('formSwitchBtn');
	if (ShowOrHide == 'Show') {
		formSwitchBtn.style.display = '';
	} else {
		formSwitchBtn.style.display = 'none';
	}
}

document.addEventListener("DOMContentLoaded", function () {
	ShowLoginForm(); // Sayfa yüklendi?inde giri? formunu göster
});