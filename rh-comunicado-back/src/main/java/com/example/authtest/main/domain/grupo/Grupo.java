package com.example.authtest.main.domain.grupo;

import com.example.authtest.auth.domain.user.UserAuth;
import com.example.authtest.main.domain.mensagem.Mensagem;
import com.example.authtest.main.domain.user.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.persistence.Entity;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity(name = "grupo")
@Table(name = "grupo")
@Data
@NoArgsConstructor
@Getter
@Setter
public class Grupo {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String nome;

    @ManyToMany(mappedBy = "grupos")
    @Fetch(FetchMode.JOIN)
    private Set<User> usuarios = new HashSet<>();

    @OneToMany(mappedBy = "grupo", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Mensagem> mensagens = new HashSet<>();

    private LocalDateTime createdAt = LocalDateTime.now();

    public Grupo(String nome){
        this.nome = nome;
    }
}
