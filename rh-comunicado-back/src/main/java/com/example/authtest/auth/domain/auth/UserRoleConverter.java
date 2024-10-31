package com.example.authtest.auth.domain.auth;

import com.example.authtest.auth.domain.auth.UserRole;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

public class UserRoleConverter implements AttributeConverter<UserRole, String> {

    @Override
    public String convertToDatabaseColumn(UserRole userRole) {
        if (userRole == null) {
            return null;
        }
        return userRole.getRole();
    }

    @Override
    public UserRole convertToEntityAttribute(String role) {
        if (role == null) {
            return null;
        }
        return UserRole.fromString(role);
    }
}