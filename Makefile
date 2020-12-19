postgres:
	docker-compose -f docker-compose.postgres.yaml up
postgres-start-pg0:
	docker-compose -f docker-compose.postgres.yaml start pg-0
postgres-start-pg1:
	docker-compose -f docker-compose.postgres.yaml start pg-1
postgres-down:
	docker-compose -f docker-compose.postgres.yaml down -v

postgres-patroni:
	docker-compose -f docker-compose.patroni.yaml up
postgres-patroni-down:
	docker-compose -f docker-compose.patroni.yaml down --remove-orphans -v

log-pg0:
	docker exec postgres-replication_pg-0_1 sh -c 'tail -f /bitnami/postgresql/data/pg_log/postgresql.log'
log-pg1:
	docker exec postgres-replication_pg-1_1 sh -c 'tail -f /bitnami/postgresql/data/pg_log/postgresql.log'
log-pg2:
	docker exec postgres-replication_pg-2_1 sh -c 'tail -f /bitnami/postgresql/data/pg_log/postgresql.log'
stop-pg0:
	docker stop postgres-replication_pg-0_1
stop-pg1:
	docker stop postgres-replication_pg-1_1
stop-pg2:
	docker stop postgres-replication_pg-2_1
