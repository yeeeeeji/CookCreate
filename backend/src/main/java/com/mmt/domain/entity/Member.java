package com.mmt.domain.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@Setter
public class Member extends BaseTimeEntity {

    @Id
    private String userId;
    private String userPw;
}
