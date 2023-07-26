package com.mmt.domain.response;

import com.mmt.domain.entity.Role;
import lombok.Data;

@Data
public class UserLoginRes extends ResponseDto{
    private String nickname;
    private Role role;
}
