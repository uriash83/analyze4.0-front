// handling input errors for SignUP , CreateFactor, EditFactor

export const handleErrorForm = (name,value,errors,password1,password2) => {
    console.log(name,value)
    const validEmailRegex = 
      RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/);
    const validDigitRegex = RegExp(/^\d{1,3}$/)
      switch (name) {
      case 'userName': 
        errors.userName = 
          value.length < 5
            ? 'Username must be 5 characters long!'
            : null;
        break;
      case 'email': 
        errors.email = 
          validEmailRegex.test(value)
            ? null
            : 'Email is not valid!';
        break;
      case 'password1': 
        if(password2 && password2 !== value){
          errors.password1 = 'Both passwords must be the same'
        }else{
          errors.password1 = 
          value.length < 8
            ? 'Password must be 8 characters long!'
            : null;
        }
        break;
      case 'password2': 
        if(password1 && password1 !== value){
          errors.password2 = 'Both passwords must be the same'
        }else{
          errors.password2 = 
          value.length < 8
            ? 'Password must be 8 characters long!' // w sumie tej wartości nei używamy
            : null;
        }
        break;
      case 'tss' || 'atl' || 'ctl' || 'tbs':
        errors.tss = 
          validDigitRegex.test(value)
            ? null
            : 'Field must be number 0-999!';
        break;
      default:
        break;
    }
}