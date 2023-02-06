package com.bitc.dream_com.security;

import com.bitc.dream_com.dto.UserDto;
import com.bitc.dream_com.dto.UserRole;
import com.bitc.dream_com.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SecurityDetailService implements UserDetailsService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserDto> result = userMapper.findId(username);

        if(result.isEmpty()) {
            throw new UsernameNotFoundException("이메일 및 비밀번호를 확인하세요");
        }
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        UserDto user = result.get();
        user.setUserPw(encoder.encode(user.getUserPw()));
        user.addRole(UserRole.USER);

        UserSecurityDto securityDto = new UserSecurityDto(
                user.getUserId(),
                user.getUserPw(),
                user.getRoleset().stream().map(role -> new SimpleGrantedAuthority("ROLE_" + role.name())).collect(Collectors.toSet())
        );

        securityDto.setUserName(user.getUserName());

        return securityDto;
    }
}
