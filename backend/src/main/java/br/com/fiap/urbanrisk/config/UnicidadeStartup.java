package br.com.fiap.urbanrisk.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.support.TransactionTemplate;

/**
 * Adapta o padrao UnicidadeStartup das aulas ao identificador unico dos sensores.
 * Ocorrencias nao sao deduplicadas: registros semelhantes podem ser legitimos.
 */
@Component
@Order(1)
public class UnicidadeStartup implements CommandLineRunner {
 private final JdbcTemplate jdbcTemplate;
 private final PlatformTransactionManager transactionManager;
 public UnicidadeStartup(JdbcTemplate jdbcTemplate,PlatformTransactionManager transactionManager){
  this.jdbcTemplate=jdbcTemplate;
  this.transactionManager=transactionManager;
 }
 @Override public void run(String... args){
  TransactionTemplate tx=new TransactionTemplate(transactionManager);
  tx.executeWithoutResult(status ->
   jdbcTemplate.execute("CREATE UNIQUE INDEX IF NOT EXISTS idx_sensor_codigo ON sensor(codigo)"));
 }
}
