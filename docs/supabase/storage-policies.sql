-- Run in Supabase SQL editor after creating the `saju-images` bucket.

create policy "Users can upload their own saju images"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'saju-images'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "Users can view their own saju images"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'saju-images'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "Users can update their own saju images"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'saju-images'
  and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id = 'saju-images'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "Users can delete their own saju images"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'saju-images'
  and (storage.foldername(name))[1] = auth.uid()::text
);
