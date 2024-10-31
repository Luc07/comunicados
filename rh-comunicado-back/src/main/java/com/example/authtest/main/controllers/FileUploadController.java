package com.example.authtest.main.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Value;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/api")
public class FileUploadController {

    @Value("${upload.dir}")
    private String uploadDir;

    @GetMapping("/test")
    public String teste(){
        return "Aloo";
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Nenhum arquivo enviado.");
        }

        try {
            String uploadDir = "C:\\uploads";

            String filePath = uploadDir + File.separator + file.getOriginalFilename();

            File destDir = new File(uploadDir);
            if (!destDir.exists()) {
                destDir.mkdirs();
            }

            File dest = new File(filePath);
            file.transferTo(dest);

            return ResponseEntity.ok("Arquivo salvo com sucesso em: " + filePath);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Erro ao salvar o arquivo.");
        }
    }
}
