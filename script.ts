//element listing
document.getElementById('resumeForm')?.addEventListener('submit',function(event){
    event.preventDefault();


    //type assertion

    const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement
    const nameElement = document.getElementById('name') as HTMLInputElement
    const fnameElement = document.getElementById('fname') as HTMLInputElement
    const emailElement = document.getElementById('email') as HTMLInputElement
    const phoneElement = document.getElementById('phone') as HTMLInputElement
    const educationElement = document.getElementById('education') as HTMLInputElement 
    const experienceElement = document.getElementById('experience') as HTMLInputElement
    const skillsElement = document.getElementById('skills') as HTMLInputElement

    //>>
    const usernameElement = document.getElementById(
        "username"
    ) as HTMLInputElement;

    if (profilePictureInput && nameElement && fnameElement && emailElement && phoneElement && educationElement && experienceElement && skillsElement && usernameElement){

//>>
    


        const profilePictureFile = profilePictureInput.files?.[0];
        const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : "";
        const name = nameElement.value;
        const fname = fnameElement.value;
        const email = emailElement.value;
        const phone = phoneElement.value;
        const education = educationElement.value;
        const experience = experienceElement.value;
        const skills = skillsElement.value;

//>>
       const username = usernameElement.value;
       const uniquePath = `resumes/${username.replace(/\s+/g, ' ')}_resume.html`
    

    //create resume output
    const resumeOutput = `
    <h2>Resume</h2> 
    ${profilePictureURL ? `<img src="${profilePictureURL} alt="Profile Picture class="profilePicture">` : ""}
    <p><strong>Full Name:</strong> <span id="edit-name" class="editable"> ${name} </span></p>
    <p><strong>Father Name:</strong> <span id="edit-fname" class="editable"> ${fname} </span></p>
    <p><strong>Email Address:</strong> <span id="edit-email" class="editable"> ${email} </span> </p>
    <p><strong>Phone Number:</strong> <span id="edit-phone" class="editable"> </span> ${phone} </p>

    <h3>Education:</h3>
    <p id="edit-education" class="editable">${education}</p>

     <h3>Experience:</h3>
    <p id="edit-experience" class="editable">${experience}</p>

     <h3>Skills:</h3>
    <p id="edit-skills" class="editable">${skills}</p>
    `;


//resume output
    const resumeOutputElement = document.getElementById(`resumeOutput`)
    if (resumeOutputElement){
        resumeOutputElement.innerHTML = resumeOutput;
        resumeOutputElement.classList.remove("hidden");
        
//create container fir button
        const buttonsContainer = document.createElement("div");
        buttonsContainer.id = "buttonsContainer";
        resumeOutputElement.appendChild(buttonsContainer);

 //add Download PDF button  
        const downloadButton = document.createElement("button");
        downloadButton.textContent = "Download as PDF";
        downloadButton.addEventListener("click", () => {
            window.print();
        });
        buttonsContainer.appendChild(downloadButton);
        
//add shareable link button
        const shareLinkButton = document.createElement("button");
        shareLinkButton.textContent = "Copy Shareable Link";
        shareLinkButton.addEventListener("click", async () => {
            try{
                //create unique shareable link
                const shareableLink = `https://yourdomain.com/resumes/${name.replace(/\s+/g,"_")}_resume.html`;

                //use clipboard API to copy the shareable link
                await navigator.clipboard.writeText(shareableLink);
                alert("shareable link copied to clipboard!");
            }catch(err){
                console.error("Failed to copy link: ",err);
                alert("Failed to copy link to clipboard. Please try again.");
            }
        });
        buttonsContainer.appendChild(shareLinkButton);
     } else{
        console.error("Resume output container not found");
     }
    }else {
        console.error("Form elements are missing");
    }
});

