package com.mmt.domain.entity;

import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Entity
public class Member extends BaseTimeEntity {

    @Id
    private String userId;
    private String userPw;
}
