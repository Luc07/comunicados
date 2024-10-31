package com.example.authtest.main.domain.mensagem;

import com.example.authtest.main.domain.grupo.Grupo;
import com.example.authtest.main.domain.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "mensagem")
@Getter
@Setter
@NoArgsConstructor
public class Mensagem {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    @JoinColumn(name = "grupo_id")
    private Grupo grupo;

    @ManyToOne
    @JoinColumn(name = "autor_id")
    private User autor;

    @Column(nullable = false)
    private String conteudo;

    @Column(name = "localArquivo", nullable = true) // Permite valores nulos
    private String localArquivo;

    private LocalDateTime dataEnvio = LocalDateTime.now();

    @ManyToMany
    @JoinTable(
            name = "usuario_mensagem_visu",
            joinColumns = @JoinColumn(name = "mensagem_id"),
            inverseJoinColumns = @JoinColumn(name = "usuario_id")
    )
    @Fetch(FetchMode.JOIN)
    private Set<User> usuariosVisualizadores = new HashSet<>();
}
