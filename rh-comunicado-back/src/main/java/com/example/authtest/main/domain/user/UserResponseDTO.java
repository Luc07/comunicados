package com.example.authtest.main.domain.user;

public record UserResponseDTO(String user_id, String name, String user, int department_id) {
    public UserResponseDTO(User user){
        this(user.getUser_id(), user.getName(), user.getUser(), user.getDepartment_id());
    }
}
