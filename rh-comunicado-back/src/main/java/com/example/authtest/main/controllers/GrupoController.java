package com.example.authtest.main.controllers;

import com.example.authtest.main.domain.grupo.Grupo;
import com.example.authtest.main.domain.grupo.GrupoComUltimaMensagemDTO;
import com.example.authtest.main.domain.grupo.GrupoRequestDTO;
import com.example.authtest.main.domain.grupo.GrupoResponseDTO;
import com.example.authtest.main.domain.mensagem.MensagemResponseDTO;
import com.example.authtest.main.domain.user.UserResponseDTO;
import com.example.authtest.main.services.GrupoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/grupo")
public class GrupoController {
    private final GrupoService grupoService;

    public GrupoController(GrupoService grupoService) {
        this.grupoService = grupoService;
    }

    @GetMapping
    public ResponseEntity listAll(){
        List<GrupoResponseDTO> grupos = grupoService.getAll();
        return ResponseEntity.ok(grupos);
    }

    @PostMapping
    public ResponseEntity createGrupo(@RequestBody GrupoRequestDTO request) {
        Grupo grupo = grupoService.createGrupo(request);
        return ResponseEntity.ok(grupo);
    }

    @PostMapping("/{grupoId}/addUser/{userId}")
    public ResponseEntity<GrupoResponseDTO> addUserToGrupo(@PathVariable String grupoId, @PathVariable String userId) {
        GrupoResponseDTO grupo = grupoService.addUserToGrupo(grupoId, userId);
        return ResponseEntity.ok(grupo);
    }

    @DeleteMapping("/{grupoId}/removeUser/{userId}")
    public ResponseEntity<GrupoResponseDTO> removeUserFromGrupo(@PathVariable String grupoId, @PathVariable String userId) {
        GrupoResponseDTO grupo = grupoService.removeUserFromGrupo(grupoId, userId);
        return ResponseEntity.ok(grupo);
    }

    @DeleteMapping("/{grupoId}")
    public ResponseEntity<Void> removeGrupo(@PathVariable String grupoId) {
        grupoService.removeGrupo(grupoId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{idgrupo}/usuarios")
    public ResponseEntity getGrupoUsuarios(@PathVariable String idgrupo){
        List<UserResponseDTO> usuarios = grupoService.getGrupoUsuarios(idgrupo);
        return ResponseEntity.ok(usuarios);
    }

    @GetMapping("/{idgrupo}/mensagens")
    public ResponseEntity getGrupoMensagens(@PathVariable String idgrupo){
        List<MensagemResponseDTO> mensagens = grupoService.getGrupoMensagens(idgrupo);
        return ResponseEntity.ok(mensagens);
    }

    @GetMapping("/ultimas-mensagens/{idUser}")
    public ResponseEntity<List<GrupoComUltimaMensagemDTO>> getGruposComUltimaMensagem(@PathVariable String idUser) {
        List<GrupoComUltimaMensagemDTO> grupos = grupoService.getGruposComUltimaMensagem(idUser);
        return ResponseEntity.ok(grupos);
    }
}
