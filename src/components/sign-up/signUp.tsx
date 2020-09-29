

export const loginUtil = ( displayName:string, email:string, password:string, confirmPassword:string, emailMatch?:boolean ,passwordMatch?:boolean) => {
  switch (true) {
  case (displayName.length <= 2):
    alert('passwords too short')  
    break;
  case (password !== confirmPassword):
    alert('passwords do not match')  
    break; 
  default:
    return ;
  
  }

}