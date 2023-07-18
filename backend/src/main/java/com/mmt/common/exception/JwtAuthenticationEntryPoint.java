package com.mmt.common.exception;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.mmt.domain.response.ResponseVo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

// 401 Unauthorized Exception 처리를 위한 클래스
@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {
    private final Logger LOGGER = LoggerFactory.getLogger(JwtAuthenticationEntryPoint.class);
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        PrintWriter writer = response.getWriter();
        ErrorCode errorCode = CommonErrorCode.UNAUTHORIZED;
        ResponseVo responseVo = ResponseVo.builder()
                .status(errorCode.getResultCode())
                .message(errorCode.getResultMessage()).build();
        try{
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
//            writer.write(CmmnVar.GSON.toJson(responseVo));
        }catch(NullPointerException e){
            LOGGER.error("응답 메시지 작성 에러", e);
        }finally{
            if(writer != null) {
                writer.flush();
                writer.close();
            }
        }
//        response.getWriter().write(CmmnVar.GSON.toJson(responseVo));
    }
}
