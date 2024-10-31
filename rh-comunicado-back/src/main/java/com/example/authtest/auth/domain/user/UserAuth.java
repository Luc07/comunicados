package com.example.authtest.auth.domain.user;

import com.example.authtest.auth.domain.auth.UserRole;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import com.example.authtest.auth.domain.auth.UserRoleConverter;

import java.util.Collection;
import java.util.List;
import java.util.Set;

@Entity(name = "user")
@Table(name = "users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserAuth implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String user_id;
    private String name;
    private String user;
    private String password;
    private int department_id;
    private String privilege;
    private String user_photo;
    private String office;
    private String email;
    private String biography;
    private int internal_code;
    private String user_cpf;
    @Convert(converter = UserRoleConverter.class)
    @Enumerated(EnumType.STRING)
    private UserRole role;

    public UserAuth(UserAuthRequestDTO data){
        this.name = data.name();
        this.user = data.user();
        this.password = data.password();
        this.department_id = data.department_id();
        this.role = data.role();
    }

    public UserAuth(String name, String user, String password, int department_id, UserRole role) {
        this.name = name;
        this.user = user;
        this.password = password;
        this.department_id = department_id;
        this.role = role;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if(this.role == UserRole.ADMIN) return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"), new SimpleGrantedAuthority("ROLE_USER"));
        else if(this.role == UserRole.MANAGER) return List.of(new SimpleGrantedAuthority("ROLE_MANAGER"),new SimpleGrantedAuthority("ROLE_USER"));
        else return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getUsername() {
        return user;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
