-- ========================================
-- FACTEUR DE PROXIMITÉ - Schema Supabase
-- ========================================

-- Table principale des demandes
create table requests (
  id bigint primary key generated always as identity,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  module text not null,
  nom text not null,
  prenom text not null,
  adresse text not null,
  email text not null,
  telephone text,
  module_data jsonb,
  status text default 'Nouveau',
  notes text
);

-- Index pour performances
create index idx_requests_status on requests(status);
create index idx_requests_created_at on requests(created_at desc);
create index idx_requests_email on requests(email);
create index idx_requests_module on requests(module);

-- Enable RLS (Row Level Security)
alter table requests enable row level security;

-- Policy: Lecture publique (tous peuvent voir les demandes)
create policy "Lecture publique des demandes"
  on requests for select
  using (true);

-- Policy: Création publique (tous peuvent créer des demandes)
create policy "Création publique de demandes"
  on requests for insert
  with check (true);

-- Policy: Mise à jour publique (pour changement de statut)
create policy "Mise à jour publique"
  on requests for update
  using (true)
  with check (true);

-- Policy: Suppression publique (pour admin)
create policy "Suppression publique"
  on requests for delete
  using (true);

-- ========================================
-- Optional: Ajouter une table d'audit
-- ========================================

create table requests_audit (
  id bigint primary key generated always as identity,
  created_at timestamp with time zone default now(),
  request_id bigint references requests(id),
  action text not null,
  old_status text,
  new_status text,
  changed_by text
);

create index idx_audit_request_id on requests_audit(request_id);

-- ========================================
-- Fonction pour auto-update updated_at
-- ========================================

create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_requests_updated_at before update on requests
  for each row execute function update_updated_at_column();

-- ========================================
-- View pour statistiques
-- ========================================

create or replace view requests_stats as
select
  module,
  status,
  count(*) as total,
  date_trunc('day', created_at) as day
from requests
group by module, status, date_trunc('day', created_at)
order by day desc;

-- ========================================
-- Insert données de test (optionnel)
-- ========================================

-- Décommentez pour tester :
/*
insert into requests (module, nom, prenom, adresse, email, status, module_data)
values
  ('code_livraison', 'Dupont', 'Jean', '123 Rue de la Paix, 75000 Paris', 'jean@example.com', 'Nouveau', '{"code": "123456"}'),
  ('recommande', 'Martin', 'Marie', '456 Avenue de Lyon, 75002 Paris', 'marie@example.com', 'À traiter', '{"tiers_nom": "Durand", "tiers_prenom": "Pierre"}'),
  ('timbres_fournitures', 'Bernard', 'Claude', '789 Boulevard Saint-Germain, 75005 Paris', 'claude@example.com', 'Accepté', '{"item": "Timbres - Lettre 20g", "quantite": 10}');
*/
