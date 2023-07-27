package com.mmt.domain.response.review;

import com.mmt.domain.response.ResponseDto;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ReviewAvgRes extends ResponseDto {
    private float avg;
}
