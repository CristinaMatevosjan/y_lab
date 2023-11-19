import React, {useState} from "react";
import {useForm} from 'react-hook-form';
import style from './loginPage.module.scss'
import {ReactComponent as EyeOpen} from '../../assets/img/eye_open.svg'
import {ReactComponent as EyeClosed} from '../../assets/img/eye_closed.svg'
import {validIsEmail} from '../../utils/regEx'
import { useNavigate } from "react-router-dom";
import makeMockRequest from "../../api/apiAuth";
// import makeMockRequestGet from "../../api/api";

const LoginPage = (props) => {

const { setIsLogged}=props;
const [eyeOpen, setEyeOpen] = useState(true);
const [errorsForm, setErrorsForm] = useState(false);
const navigate = useNavigate();

const {register, handleSubmit, formState:{errors},reset,watch}=useForm({
    mode: 'onChange',
})

const hasEmail=watch('email', '');
const hasPass=watch('pass', '');

function getTocken(data) {
    makeMockRequest('https://example.com/api', data, (response) => {
      if (response.status === 'success') {
        setErrorsForm(false);
        localStorage.setItem("access_token", response.data.access_token);
        // getOrganizationId();
        setIsLogged(true);
        reset()
        navigate("/");
      } else {
        setErrorsForm(true);
      }
    });
  }
         
async function onSubmit(data) {
    getTocken(data)
}


    return (
          <form className={style.form}
            onSubmit={handleSubmit(onSubmit)}
            >
            <div className={style.form_container}>
            
                <div >
                    <h3 className={ style.title}>Логин (электронная почта)</h3>

                    <input className={hasEmail==='' || errors.email ? `${style.error_border} ${style.input}` : style.input}
                        type="text"
                        name='email'
                        autoComplete='off'
                        placeholder='Введите вашу почту'
                        {...register('email', {
                            required: true,
                            validate : {
                                validIsEmail: (value) => validIsEmail.test(value) ? true : false,
                                
                            }
                        })}
                    />
                    { errors.email && errors.email.type === "validIsEmail" ?
                        <p className={style.red_text}>Необходимо ввести корректный адрес электронной почты</p>
                        :
                        <></>
                    }
                </div>
                <div >
                    <h3 className={style.title}>Пароль</h3>

                    <input className={hasPass==='' ? `${style.error_border} ${style.input}` : style.input}
                        type={eyeOpen? 'password':'text'}
                        name='pass'
                        autoComplete='off'
                        placeholder='Введите ваш пароль'
                        {...register('pass', {
                            required: true,
                           
                        })}
                    />
                    {eyeOpen? 
                            <EyeOpen className={style.eye} onClick={()=>setEyeOpen(false)}/>
                        :
                            <EyeClosed className={style.eye} onClick={()=>setEyeOpen(true)}/>
                        }                   
                    
                </div>
                {hasEmail==='' || hasPass==='' ?
                <p className={style.red_text}>Необходимо заполнить все поля</p>
                :
                errorsForm ? <p className={style.red_text}>Неверный логин или пароль</p>
                :
                <></>
                }
                <button className={style.button} type="submit">Войти</button>
            </div>
            </form>
    )
    
}
export default LoginPage;