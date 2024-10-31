package com.example.authtest.main.domain.user;

import com.example.authtest.auth.domain.user.UserAuth;
import com.example.authtest.main.domain.grupo.Grupo;
import com.example.authtest.main.domain.mensagem.Mensagem;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity(name = "user")
@Table(name = "users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User implements UserDetails {

    @Id
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
    @Enumerated(EnumType.STRING)
    private com.example.authtest.auth.domain.auth.UserRole role;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "user_grupo",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "id_grupo")
    )
    @BatchSize(size = 20)
    private Set<Grupo> grupos = new HashSet<>();

    @OneToMany(mappedBy = "autor", fetch = FetchType.LAZY)
    @BatchSize(size = 20)
    private Set<Mensagem> mensagens = new HashSet<>();

    @ManyToMany(mappedBy = "usuariosVisualizadores", fetch = FetchType.LAZY)
    @BatchSize(size = 20)
    private Set<Mensagem> mensagensVisualizadas = new HashSet<>();

    public User(UserRequestDTO data){
        this.name = data.name();
        this.user = data.user();
        this.password = data.password();
        this.department_id = data.department_id();
        this.role = data.role();
    }
    public User(UserAuth userAuth){
        this.user_id = userAuth.getUser_id();
        this.name = userAuth.getName();
        this.user = userAuth.getUser();
        this.password = userAuth.getPassword();
        this.department_id = userAuth.getDepartment_id();
        this.role = userAuth.getRole();
    }
    public User(String name, String user, String password, int department_id, com.example.authtest.auth.domain.auth.UserRole role) {
        this.name = name;
        this.user = user;
        this.password = password;
        this.department_id = department_id;
        this.role = role;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if(this.role == com.example.authtest.auth.domain.auth.UserRole.ADMIN) return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"), new SimpleGrantedAuthority("ROLE_USER"));
        else if(this.role == com.example.authtest.auth.domain.auth.UserRole.MANAGER) return List.of(new SimpleGrantedAuthority("ROLE_MANAGER"),new SimpleGrantedAuthority("ROLE_USER"));
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
        return false;
    }

}
