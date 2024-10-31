package com.example.authtest.main.controllers;

import com.example.authtest.main.domain.mensagem.MensagemRequestDTO;
import com.example.authtest.main.domain.mensagem.MensagemResponseDTO;
import com.example.authtest.main.domain.user.UserResponseDTO;
import com.example.authtest.main.services.MensagemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/mensagem")
public class MensagemController {
    private final MensagemService mensagemService;

    public MensagemController(MensagemService mensagemService) {
        this.mensagemService = mensagemService;
    }

    @PostMapping
    public ResponseEntity criarMensagem(@RequestBody MensagemRequestDTO mensagemData) {
        MensagemResponseDTO mensagem = mensagemService.criarMensagem(mensagemData.grupoId(), mensagemData.autorId(), mensagemData.mensagem(), mensagemData.localArquivo());
        return ResponseEntity.ok(mensagem);
    }

    @PostMapping("/{idMsg}/{userId}")
    public ResponseEntity marcarMensagemComoVisualizada(@PathVariable String idMsg, @PathVariable String userId){
        mensagemService.marcarMensagemComoVisualizada(idMsg, userId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{idMsg}/usuarios")
    public ResponseEntity getMensagemUsuarios(@PathVariable String idMsg){
        List<UserResponseDTO> usuarios = mensagemService.getMensagemUsuarios(idMsg);
        return ResponseEntity.ok(usuarios);
    }
}
