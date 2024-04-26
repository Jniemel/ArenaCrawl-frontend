export async function SignUp(username, password) {
    const res = await fetch(
        "http://localhost:3000/sign-up", 
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password })
        }
    )
    const json = await res.json();
    if (!res.ok) {
        console.log("Failed");
    }
    console.log(json);  
}

export function logIn(username, password) {

}