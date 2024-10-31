package com.example.authtest.infra.file;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Serve static resources from public and classpath
        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/public/", "classpath:/static/");

        registry.addResourceHandler("/files/**")
                .addResourceLocations("file:/src/main/resources/uploads/");

        registry.addResourceHandler("/files/**")
                .addResourceLocations("file:/C:/uploads/");
    }
}
