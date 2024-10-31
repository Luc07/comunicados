package com.example.authtest.auth.domain.user;

public record UserAuthResponseDTO(String user_id, String name, String user, int department_id) {
    public UserAuthResponseDTO(UserAuth user){
        this(user.getUser_id(), user.getName(), user.getUser(), user.getDepartment_id());
    }
}
