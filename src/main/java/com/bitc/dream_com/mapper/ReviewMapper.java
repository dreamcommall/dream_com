package com.bitc.dream_com.mapper;

import com.bitc.dream_com.dto.ReviewDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ReviewMapper {
    List<ReviewDto> review() throws Exception;
}
