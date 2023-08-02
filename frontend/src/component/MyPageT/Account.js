import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
// import { useSelector, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
// import { updateUserS } from "../../store/mypageS/accountS";
import FoodList from "../../component/SignUp/FoodList";
import SideBar from "./SideBar";

function Account() {
  const accessToken = useSelector((state) => state.auth.token);
  // const dispatch = useDispatch();

  const [userData, setUserData] = useState({});
  // const selectedFood = useSelector((state) => state.accountS.food);
  // const [foodDef, setFood] = useState(userData.food);
  const [food, setFood] = useState([]);

  const [userIdDef, setUserId] = useState(userData.userId);
  const [nicknameDef, setNickName] = useState(userData.nickname);
  const [phoneNumberDef, setPhoneNumber] = useState(userData.phoneNumber);
  const [userEmailDef, setUserEmail] = useState(userData.userEmail);
  const [IntroduceDef, setIntroduce] = useState(userData.introduce);
  const [IntroUrlDef, setIntroUrl] = useState(userData.introUrl);
  const defaultProfileImgUrl = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  const [profileImgDef, setProfileImg] = useState(userData.profileImg || defaultProfileImgUrl);
  const fileInput = useRef(null);

  //오류 메세지 저장
  const [userIdMessage, setUserIdMessage] = useState("");
  const [userIdDupMessage, setUserIdDupMessage] = useState("");
  const [userNicknameMessage, setUserNicknameMessage] = useState("");
  const [userNNDupMessage, setUserNNDupMessage] = useState("");
  const [userPhoneNumberMessage, setUserPhoneNumberMessage] = useState("");
  const [userEmailMessage, setUserEmailMessage] = useState("");
  const [userIntroduceMessage, setIntroduceMessage] = useState("");

  //유효성 검사
  const [isUserId, setIsUserId] = useState(false);
  const [isIdDupli, setIsIddup] = useState(false);
  const [isNickname, setIsNickname] = useState(false);
  const [isNicknameDupli, setIsNNdup] = useState(false);
  const [isPhoneNumber, setIsPhoneNumber] = useState(false);
  const [isUserEmail, setIsUserEmail] = useState(true);
  const [isIntroduce, setIsIntroduce] = useState(true);

  //중복 체크 로직
  const idDupliCheck = () => {
    axios
      .get(`api/v1/auth/checkId/${userIdDef}`)
      .then((res) => {
        setUserIdDupMessage(res.data.message);
        setIsIddup(true);
      })
      .catch((err) => {
        setUserIdDupMessage(err.response.data.message);
        setIsIddup(false);
      });
  };
  const nicknameDupliCheck = () => {
    axios
      .get(`api/v1/auth/checkNick/${nicknameDef}`)
      .then((res) => {
        setUserNNDupMessage(res.data.message);
        setIsNNdup(true);
      })
      .catch((err) => {
        setUserNNDupMessage(err.response.data.message);
        setIsNNdup(false);
      });
  };

  //introUrl
  const onChangeintroUrl = async (e) => {
    const value = e.target.value;
    await setIntroUrl(value);
  };

  //유효성 검사 구현
  const onChangeIntroduce = async (e) => {
    const value = e.target.value;
    await setIntroduce(value);
    if (value.length > 100) {
      setIntroduceMessage("100자 이하로 입력해주세요");
      setIsIntroduce(false);
    } else {
      setIntroduceMessage("적합합니다! 🤗");
      setIsIntroduce(true);
    }
  };

  const onChangeUserId = async (e) => {
    const value = e.target.value;
    await setUserId(value);
    if (value.length < 4 || value.length > 10) {
      setUserIdMessage("4글자 이상 10글자 이하로 입력해주세요");
      setIsUserId(false);
    } else {
      setUserIdMessage("적합한 아이디 형식입니다! 🤗");
      setIsUserId(true);
    }
  };

  const onChangeUserNickName = async (e) => {
    const value = e.target.value;
    await setNickName(value);
    if (value.length < 2 || value.length > 8) {
      setUserNicknameMessage("2글자 이상 8글자 이하로 입력해주세요");
      setIsNickname(false);
    } else {
      setUserNicknameMessage("적합한 닉네임 형식입니다! 🤗");
      setIsNickname(true);
    }
  };
  const onChangeUserPhonenumber = async (e) => {
    const value = e.target.value;
    await setPhoneNumber(value);
    const phoneRegex = /^(01[016789]{1})[0-9]{3,4}[0-9]{4}$/;
    if (phoneRegex.test(value)) {
      setIsPhoneNumber(true);
      setUserPhoneNumberMessage("올바른 전화번호 형식입니다!");
    } else {
      setIsPhoneNumber(false);
      setUserPhoneNumberMessage("올바르지 않은 전화번호 형식입니다.");
    }
  };

  const onChangeUserEmail = async (e) => {
    const value = e.target.value;
    const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    await setUserEmail(value);
    if (value === "") {
      setIsUserEmail(true);
      setUserEmailMessage("");
    } else if (emailRegex.test(value)) {
      setIsUserEmail(true);
      setUserEmailMessage("올바른 이메일 형식입니다!");
    } else {
      setIsUserEmail(false);
      setUserEmailMessage("올바른 이메일 형식을 입력하세요");
    }
  };

  //회원정보조회
  useEffect(() => {
    axios
      .get(`api/v1/member`, {
        headers: {
          Access_Token: accessToken,
        },
      })
      .then((res) => {
        setUserData(res.data);
        console.log(res.data);
        // dispatch(updateUserS(res.data));
      })
      .catch((err) => {
        console.log("회원정보조회못함");
      });
  }, [accessToken]);

  useEffect(() => {
    if (userData.food) {
      setFood(userData.food.split(","));
      console.log("setFood", userData.food);
    }
  }, [userData]);

  // 회원정보 조회
  // axios
  //   .get(`api/v1/member`, {
  //     headers: {
  //       Access_Token: accessToken,
  //     },
  //   })
  //   .then((res) => {
  //     setUserData(res.data);
  //     console.log(userData);
  //     // setFood(res.data.food)
  //   })
  //   .catch((err) => {
  //     console.log("회원정보조회못함");
  //   });

  // axios
  //   .get(`api/v1/member`, {
  //     headers: {
  //       Access_Token: accessToken,
  //     },
  //   })
  //   .then((res) => {
  //     setUserData(res.data);
  //     console.log(userData);
  //     dispatch(updateUserS(res.data.food));
  //   })
  //   .catch((err) => {
  //     console.log('회원정보조회못함');
  //   });

  //프로필 이미지 변경
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  //기본 프로필로 변경
  const handleProfile = (e) => {
    setProfileImg("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
  };

  // 음식선택
  // const handleSelectedFood = (selectedFood) => {
  //   if (foodDef === undefined) {

  //     setFood([selectedFood]);
  //   } else {

  //     if (foodDef.includes(selectedFood)) {
  //       setFood(foodDef.filter((item) => item !== selectedFood));
  //     } else {
  //       setFood([...foodDef, selectedFood]);
  //     }
  //   }
  // };

  //음식추가 제거
  const handleSelectedFood = (selectedFood) => {
    if (food) {
      if (food.includes(selectedFood)) {
        console.log("선택 전", food, selectedFood);
        const newFoodList = food.filter((item) => item !== selectedFood);
        console.log(newFoodList);
        setFood(newFoodList);
        // food.filter((item) => {
        //   console.log(item);
        //   return item !== selectedFood;
        // });
      } else {
        console.log("선택한 음식", [...food, selectedFood]);
        console.log([...food], food);
        setFood([...food, selectedFood]);
      }
      console.log(food);
      // dispatch(updateUserS({ food: selectedFood }));
    } else {
      console.log("food 없음");
    }
  };

  // const handleSelectedFood = (selectedFood) => {
  //   setFood((prevFood) => {
  //     if (prevFood.includes(selectedFood)) {
  //       return prevFood.filter((item) => item !== selectedFood);
  //     } else {
  //       return [...prevFood, selectedFood];
  //     }
  //   });
  // };

  //회원정보 수정
  const handleUpdate = (e) => {
    e.preventDefault();
    const data = {
      userId: userIdDef,
      nickname: nicknameDef,
      phoneNumber: phoneNumberDef,
      userEmail: userEmailDef,
      food: food.join(','),
      introduce: IntroduceDef,
      profileImg: profileImgDef,
      introUrl: IntroUrlDef
    };

    axios
      .post(`api/v1/member`, data, {
        headers: {
          Access_Token: accessToken,
        },
      })
      .then((res) => {
        console.log(res);
        alert("회원정보수정이 완료됐습니다.");
      })
      .catch((err) => {
        console.log(data);
      });
  };

  return (
    <div className="mypage">
      <SideBar />
      <div className="mytitle">정보수정</div>
      <div>가입일:{userData.createdDate}</div>
      <div className="myrole">{userData.role}</div>
      <div className="mysubtitle">프로필 변경</div>
      <img
        src={profileImgDef}
        alt="Profile"
        style={{ margin: "20px", width: "200px", height: "200px", objectFit: "cover" }}
        onClick={() => {
          fileInput.current.click();
        }}
      />

      <input type="file" style={{ display: "none" }} accept="image/jpg,image/png,image/jpeg" name="profile_img" onChange={handleFileChange} ref={fileInput} />
      <button onClick={handleProfile}>기본 프로필로 변경</button>
      {/* <button onClick={handleFileChange}>프로필 변경</button> */}

      <div className="myinputTitle">닉네임</div>
      <div className="inputWrap">
        <input placeholder={nicknameDef} type="text" value={nicknameDef} onChange={onChangeUserNickName} />
        <button onClick={nicknameDupliCheck}>중복확인</button>
        <div>
          {userNicknameMessage}
          {userNNDupMessage}
        </div>
      </div>

      <div className="myinputTitle">아이디</div>
      <div className="inputWrap">
        <input placeholder={userIdDef} type="text" value={userIdDef} onChange={onChangeUserId} />
        <button onClick={idDupliCheck}>중복확인</button>
        <div>
          {userIdMessage}
          {userIdDupMessage}
        </div>
      </div>

      <div className="myinputTitle">자기소개</div>
      <div>
        <textarea placeholder={IntroduceDef} value={IntroduceDef} onChange={onChangeIntroduce}></textarea>
        <div>{userIntroduceMessage}</div>
      </div>
      <div>
        <p>소개영상url</p>
        <input placeholder={IntroUrlDef} type="text" value={IntroUrlDef} onChange={onChangeintroUrl} />
      </div>

      <div className="myinputTitle">휴대폰번호</div>
      <div>
        <input type="text" placeholder={phoneNumberDef} value={phoneNumberDef} onChange={onChangeUserPhonenumber} />
        <div>{userPhoneNumberMessage}</div>
      </div>

      <div className="myinputTitle">이메일</div>
      <div>
        <input placeholder={userEmailDef} type="text" value={userEmailDef} onChange={onChangeUserEmail} />
        <div>{userEmailMessage}</div>
      </div>

      <div className="food">
        {/* <div>관심있는 요리</div>
        <div>{userData.food}</div> */}

        <FoodList selectedFood={food} toggleFood={handleSelectedFood} />
        {/* <FoodList selectedFood={foodDef} toggleFood={handleSelectedFood} /> */}
      </div>

      <div>
        <button
          onClick={handleUpdate}
          className="bottomBtn"
          disabled={!(isUserId && isIdDupli && isNickname && isNicknameDupli && isPhoneNumber && isUserEmail && isIntroduce)}
        >
          정보수정
        </button>
      </div>
    </div>
  );
}

export default Account;
