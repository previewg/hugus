import React, {useEffect} from "react";
import KakaoLogin from "react-kakao-login";
import {kakao_SignIn, kakaosignInRequest} from "../../actions/auth";
import {useDispatch, useSelector} from "react-redux";

const KakaoLo = () => {
    const dispatch = useDispatch();
    const loginStatus = useSelector((state) => state.authentication.login.status);

    const responseKakao = async (res) => {
        console.log(res)
        await dispatch(kakaosignInRequest({res}));
    }
    const responseFail = (err) => {
        alert(err)
    }

    useEffect(() => {
        dispatch(kakao_SignIn())
    }, [loginStatus])

    return (
        <>
            <KakaoLogin
                jsKey={'aa70349a6dc59493a45fc12e6ca3a220'}
                buttonText={"KAKAO"}
                onSuccess={responseKakao}
                onFailure={responseFail}
                getProfile={true}
            />


        </>

    )
}
export default KakaoLo;